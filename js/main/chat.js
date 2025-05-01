import { renderMessage, makeChatInvisible, clearInputField, clearMessages, scrollChatDown } from "./dom/chat.js";
import { DEFAULT_MESSAGES_QUANTITY, LONG_POLLING_DELAY } from "../config.js";
import { getUserById, getProfileData } from "./api/user.js";
import { insertPrivateConversation } from "./api/conversation.js";
import { fetchMessages, insertTextMessage, insertUnreadMessage, deleteConversationMessages, deleteConversation } from "./api/chat.js";
import { scrollState } from "./events.js";


let currentMessagesWatcherAbort = null;
let LOAD_MESSAGES_QUANTITY = DEFAULT_MESSAGES_QUANTITY;
export const knownMessages = new Map();


export function stopFetchMessagesLongPolling() {
    if (currentMessagesWatcherAbort) {
        currentMessagesWatcherAbort.abort();
        currentMessagesWatcherAbort = null;
    }
}


export function fetchMessagesLongPolling(conversation_id, recipient_id) {
    if (currentMessagesWatcherAbort) currentMessagesWatcherAbort.abort();
    const abortController = new AbortController();
    let firstItteration = true;
    currentMessagesWatcherAbort = abortController;

    knownMessages.clear();

    (async function loop() {
        while (!abortController.signal.aborted) {
            const newIds = new Set();

            const messages = await fetchMessages(conversation_id, LOAD_MESSAGES_QUANTITY * scrollState.loadCount, 0);
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

            if (firstItteration) {
                firstItteration = false;
                scrollChatDown();
            }

            await new Promise(res => setTimeout(res, LONG_POLLING_DELAY * 1000));
        }
    })();
}

export async function sendTextMessage () {
    let chat_container = document.getElementById('chat-container');
    let chat_message_input = document.getElementById('chat-message-input');

    let chat_status = chat_container.getAttribute("new");
    let recipient_id = chat_container.getAttribute("recipient_id");

    if (chat_message_input.value.length === 0) {
        return;
    }

    if (chat_status === "true") {
        let new_conversation = await insertPrivateConversation(recipient_id);
        if (new_conversation) {
            fetchMessagesLongPolling(new_conversation.id, recipient_id);
            chat_container.setAttribute('conversation_id', new_conversation.id);
            chat_container.setAttribute('new', false);
            let message = await insertTextMessage(chat_message_input.value, new_conversation.id);
            await insertUnreadMessage(new_conversation.id, message.id, "message", recipient_id);
            clearInputField();
            scrollChatDown();

            let recipient_dektop = document.getElementById(`conversation-user-${chat_container.getAttribute("recipient_id")}`);
            let recipient_mobile = document.getElementById(`conversation-user-${chat_container.getAttribute("recipient_id")}-mobile`);

            if (recipient_dektop) {
                recipient_dektop.remove();
            }
            if (recipient_mobile) {
                recipient_mobile.remove();
            }
        }
        else {
            return;
        }
    }
    else {
        let conversation_id = chat_container.getAttribute("conversation_id");
        let message = await insertTextMessage(chat_message_input.value, conversation_id);
        await insertUnreadMessage(conversation_id, message.id, "message", recipient_id);
        clearInputField();
        scrollChatDown();
    }
}

export async function removeConversation () {
    const chat_container = document.getElementById('chat-container');
    const conversation_id = chat_container.getAttribute("conversation_id");
    makeChatInvisible();
    clearInputField();
    clearMessages();
    await deleteConversation(conversation_id);
}

export async function removeConversationMessages () {
    const chat_container = document.getElementById('chat-container');
    const conversation_id = chat_container.getAttribute("conversation_id");
    clearInputField();
    clearMessages();
    await deleteConversationMessages(conversation_id);
}

