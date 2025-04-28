import {API_BASE_URL} from "../../config.js";
import { removeExtension, getLastMessageByConversationId, formatChatDateTime, getUserById } from "../utils.js";


export function clearUserConversations(obj) {
    const conversations = obj.querySelectorAll('[id^="conversation-container"]');

    conversations.forEach(conversation => {
        obj.removeChild(conversation);
    });
}

export function renderUserConversations(conversations, unread_messages, last_messages, recipients) {
    let container = document.getElementById("conversations-container");
    let container_mobile = document.getElementById("conversations-container-mobile");
  
    const unreadMap = new Map();
    for (const msg of unread_messages) {
        if (!unreadMap.has(msg.conversation_id)) {
            unreadMap.set(msg.conversation_id, 0);
        }
        unreadMap.set(msg.conversation_id, unreadMap.get(msg.conversation_id) + 1);
    }

    for (const convo of conversations) {
        const unreadCount = unreadMap.get(convo.id) || 0;

        const card = document.createElement('div');
        card.className = 'card conversation-card shadow border-0 mb-3 w-100 pointer-on-hover';
        card.id = `conversation-${convo.id}`;

        const lastMessage = getLastMessageByConversationId(convo.id, last_messages);
        const recipient = getUserById(convo.members[0].user_id, recipients);

        const avatarUrl = recipient.avatar_name
        ? `${API_BASE_URL}/users/${removeExtension(recipient.avatar_name)}/avatar`
        : 'https://via.placeholder.com/100';

        console.log(lastMessage);
        console.log(recipient);


        // собираем внутренности карточки
        let cardBodyHTML = `
            <div class="card-body py-3">
                <div class="d-flex flex-column flex-lg-row justify-content-between justify-content-lg-start align-items-center gap-3">
                    <div class="flex-shrink-0 avatar-container mw-100">
                        <img 
                            src="${avatarUrl}" 
                            class="avatar border border-2" 
                            alt="Conversation avatar"
                            id="conversation-avatar"
                        >
                    </div>
                    <div class="text-center text-lg-start overflow-hidden mw-100">
                        <h6 class="primary-text-style text-truncate mb-2" id="conversation-name">${recipient.nickname || ''}</h6>
                        <p class="small primary-text-style text-truncate mb-0" id="conversation-last-message-content">
                            ${lastMessage.content}
                        </p>
                    </div>
                    <div class="d-flex flex-column justify-content-start align-items-center align-items-lg-end">
                        <small class="primary-text-style mb-2" id="conversation-last-message-date">${formatChatDateTime(lastMessage.created_at)}</small>
                        ${unreadCount > 0 ? `
                        <span class="badge unread-badge primary-text-style" id="conversation-unread-quantity">
                            ${unreadCount}
                        </span>` : ''}
                    </div>
                </div>
            </div>
        `;
        
        card.innerHTML = cardBodyHTML;
        container.appendChild(card);
        // container_mobile.appendChild(card);
    }
  }