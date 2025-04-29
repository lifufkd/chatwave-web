import { insertTextMessage, insertUnreadMessage, insertPrivateConversation, selectUserUnreadMessages, selectUserConversations, selectLastConversationMessage } from "./api/conversation.js";
import { extractUserIds } from "./utils.js";
import { getUsersByIds } from "./api/user.js";
import { renderUserConversations} from "./dom/conversation.js";
import { LONG_POLLING_DELAY } from "../config.js";
import { deleteConversationMessages, deleteConversation } from "./api/chat.js";

export async function sendTextMessage () {
    let chat_container = document.getElementById('chat-container');
    let chat_message_input = document.getElementById('chat-message-input');

    let chat_status = chat_container.getAttribute("new");
    let recipient_id = chat_container.getAttribute("recipient_id");

    if (chat_status === "true") {
        let new_conversation = await insertPrivateConversation(recipient_id);
        if (new_conversation) {
            chat_container.setAttribute('conversation_id', new_conversation.id);
            chat_container.setAttribute('new', false);
            let message = await insertTextMessage(chat_message_input.value, new_conversation.id);
            await insertUnreadMessage(new_conversation.id, message.id, "message", recipient_id);

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
        await insertUnreadMessage(conversation_id, message.id, "message", recipient_id)
    }
}

export async function fetchConversationsLongPolling() {
    while (true) {
        try {
            let recipients;
            let user_unread_messages = await selectUserUnreadMessages();
            let user_conversations = await selectUserConversations();
            let recipients_ids = extractUserIds(user_conversations);
            if (recipients_ids.length > 0) {
                recipients = await getUsersByIds(recipients_ids);
            }
            else {
                recipients = [];
            }

            let conversations_last_messages = [];
            for (const conversation of user_conversations) {
                const last_conversation_message = await selectLastConversationMessage(conversation.id)
                if (last_conversation_message) {
                    conversations_last_messages.push(last_conversation_message);
                }
            }

            renderUserConversations(user_conversations, user_unread_messages, conversations_last_messages, recipients);
        } catch (error) {
        }

        await new Promise(resolve => setTimeout(resolve, LONG_POLLING_DELAY * 1000));
    }
}

export async function removeConversation () {
    const chat_container = document.getElementById('chat-container');
    const conversation_id = chat_container.getAttribute("conversation_id");
    await deleteConversation(conversation_id);
}

export async function removeConversationMessages () {
    const chat_container = document.getElementById('chat-container');
    const conversation_id = chat_container.getAttribute("conversation_id");
    await deleteConversationMessages(conversation_id);
}

