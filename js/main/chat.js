import { getUserById, getProfileData } from "./api/user.js";
import { renderMessage, makeChatInvisible, clearInputField, clearMessages } from "./dom/chat.js";
import { DEFAULT_MESSAGES_QUANTITY, LONG_POLLING_DELAY } from "../config.js";
import { fetchMessages } from "./api/chat.js";


let currentMessagesWatcherAbort = null;

export function fetchMessagesLongPolling(conversation_id, recipient_id) {
    if (currentMessagesWatcherAbort) currentMessagesWatcherAbort.abort();
    const abortController = new AbortController();
    currentMessagesWatcherAbort = abortController;

    const knownMessages = new Map();

    (async function loop() {
        while (!abortController.signal.aborted) {
            const newIds = new Set();

            const messages = await fetchMessages(conversation_id, DEFAULT_MESSAGES_QUANTITY, 0);
            if (!messages) {
                makeChatInvisible();
                clearInputField();
                clearMessages();
            }
            const user = await getProfileData();
            const recipient = await getUserById(recipient_id);
            for (const msg of messages.reverse()) {
                newIds.add(msg.id);
                const isMine = msg.sender_id === user.id;
                const msg_copy = Object.assign({}, msg);
                if (isMine) {
                    msg_copy.avatar_name = user.avatar_name;
                }
                else {
                    msg_copy.avatar_name = recipient[0].avatar_name;
                }

                const existing = knownMessages.get(msg_copy.id);
                const contentChanged = existing && (existing.content !== msg_copy.content || existing.status !== msg_copy.status || existing.avatar_name !== msg_copy.avatar_name);
                if (!existing || contentChanged) {
                    knownMessages.set(msg_copy.id, msg_copy);
                    renderMessage(msg_copy, user, recipient[0]);
                }
            }

            // Удаление сообщений, которые были ранее, но теперь отсутствуют
            for (const [id] of knownMessages) {
                if (!newIds.has(id)) {
                    knownMessages.delete(id);
                    const el = document.getElementById(`msg-${id}`);
                    if (el) el.remove();
                }
            }

            await new Promise(res => setTimeout(res, LONG_POLLING_DELAY * 1000));
        }
    })();
}
