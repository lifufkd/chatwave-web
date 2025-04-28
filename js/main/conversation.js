import { insertTextMessage, insertPrivateConversation, selectUserUnreadMessages, selectUserConversations, selectLastConversationMessage } from "./api/conversation.js";
import { extractUserIds } from "./utils.js";
import { getUsersByIds } from "./api/user.js";
import { clearUserConversations, renderUserConversations} from "./dom/conversation.js";


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
            await insertTextMessage(chat_message_input.value, new_conversation.id);
        }
        else {
            return;
        }
    }
    else {
        let conversation_id = chat_container.getAttribute("conversation_id");
        await insertTextMessage(chat_message_input.value, conversation_id);
    }
}

export async function fetchConversationsLongPolling() {
    while (true) {
        let container = document.getElementById("conversations-container");
        let container_mobile = document.getElementById("conversations-container-mobile");
        clearUserConversations(container);
        clearUserConversations(container_mobile);
            
        let conversations_last_messages = [];
        let user_conversations = await selectUserConversations();
        let recipients = await getUsersByIds(extractUserIds(user_conversations))
        let user_unread_messages = await selectUserUnreadMessages();
        for (const conversation of user_conversations) {
            const last_conversation_message = await selectLastConversationMessage(conversation.id)
            conversations_last_messages.push(last_conversation_message);
        }
        renderUserConversations(user_conversations, user_unread_messages, conversations_last_messages, recipients);
        await new Promise(resolve => setTimeout(resolve, 1000));
    }
}
