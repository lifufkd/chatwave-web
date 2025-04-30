import { insertTextMessage, insertUnreadMessage, insertPrivateConversation, selectUserUnreadMessages, selectUserConversations, selectLastConversationMessage } from "./api/conversation.js";
import { extractUserIds } from "./utils.js";
import { getUserById, getProfileData } from "./api/user.js";
import { renderMessage } from "./dom/chat.js";
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
            const messages = await fetchMessages(conversation_id, DEFAULT_MESSAGES_QUANTITY, 0);
                const user = await getProfileData();
                const recipient = await getUserById(recipient_id);
                for (const msg of messages) {
                    const existing = knownMessages.get(msg.id);
                    const contentChanged = existing && (existing.content !== msg.content || existing.status !== msg.status);
                    if (!existing || contentChanged) {
                        knownMessages.set(msg.id, msg);
                        renderMessage(msg, user, recipient[0]);
                    }
                }

            await new Promise(res => setTimeout(res, LONG_POLLING_DELAY * 1000));
        }
    })();
}