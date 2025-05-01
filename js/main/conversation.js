import { selectUserConversations } from "./api/conversation.js";
import { selectLastConversationMessage, selectUserUnreadMessages } from "./api/chat.js";
import { fetchMessagesLongPolling, stopFetchMessagesLongPolling } from "./chat.js";
import { extractUserIds, getConversationById } from "./utils.js";
import { fetchRecipientDataLongPolling } from "./user.js";
import { getUsersByIds, getUserById } from "./api/user.js";
import { renderUserConversations } from "./dom/conversation.js";
import { clearMessages, clearInputField } from "./dom/chat.js";
import { LONG_POLLING_DELAY } from "../config.js";
import { scrollState } from "./events.js";


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

export async function openNewChat(user_id) {
    var chat_obj = document.getElementById('chat-container');
    var user_data = await getUserById(user_id);
    stopFetchMessagesLongPolling();
    scrollState.loadCount = 1;
    clearInputField();
    clearMessages();

    fetchRecipientDataLongPolling(user_id);
    chat_obj.setAttribute('new', true);
    chat_obj.setAttribute('recipient_id', user_data[0].id);
}

export async function openChat(conversation_id) {
    var chat_obj = document.getElementById('chat-container');
    var conversations = await selectUserConversations();
    var currentConversation = getConversationById(conversation_id, conversations);
    scrollState.loadCount = 1;
    clearInputField();
    clearMessages();

    fetchRecipientDataLongPolling(currentConversation.members[0].user_id);
    fetchMessagesLongPolling(conversation_id, currentConversation.members[0].user_id);
    chat_obj.setAttribute('new', false);
    chat_obj.setAttribute('recipient_id', currentConversation.members[0].user_id);
    chat_obj.setAttribute('conversation_id', conversation_id);
}

