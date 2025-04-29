import {API_BASE_URL} from "../../config.js";
import { removeExtension, getLastMessageByConversationId, formatChatDateTime, getUserById, reloadImage } from "../utils.js";


export function renderUserConversations(conversations, unread_messages, last_messages, recipients) {
    const container = document.getElementById("conversations-container");
    const container_mobile = document.getElementById("conversations-container-mobile");

    const currentDesktopIds = Array.from(container.children)
        .filter(el => el.id.startsWith('conversation-') && !el.id.endsWith('-mobile'))
        .map(el => parseInt(el.id.replace('conversation-', '')));

    const currentMobileIds = Array.from(container_mobile.children)
        .filter(el => el.id.startsWith('conversation-') && el.id.endsWith('-mobile'))
        .map(el => parseInt(el.id.replace('conversation-', '').replace('-mobile', '')));

    const newConversationIds = conversations.map(c => c.id);

    // Удаляем лишние карточки
    for (const id of currentDesktopIds) {
        if (!newConversationIds.includes(id)) {
            const card = document.getElementById(`conversation-${id}`);
            if (card) card.remove();
        }
    }

    for (const id of currentMobileIds) {
        if (!newConversationIds.includes(id)) {
            const cardMobile = document.getElementById(`conversation-${id}-mobile`);
            if (cardMobile) cardMobile.remove();
        }
    }

    const unreadMap = new Map();
    for (const msg of unread_messages) {
        unreadMap.set(msg.conversation_id, (unreadMap.get(msg.conversation_id) || 0) + 1);
    }

    for (const convo of conversations) {
        const desktopCard = document.getElementById(`conversation-${convo.id}`);
        const mobileCard = document.getElementById(`conversation-${convo.id}-mobile`);

        const unreadCount = unreadMap.get(convo.id) || 0;
        const lastMessage = getLastMessageByConversationId(convo.id, last_messages);
        const recipient = getUserById(convo.members[0].user_id, recipients);
        const avatarUrl = recipient.avatar_name
            ? `${API_BASE_URL}/users/${removeExtension(recipient.avatar_name)}/avatar`
            : 'https://via.placeholder.com/100';

        if (desktopCard && mobileCard) {
            updateConversationCard(desktopCard, recipient, lastMessage, unreadCount, avatarUrl);
            updateConversationCard(mobileCard, recipient, lastMessage, unreadCount, avatarUrl);
            continue;
        }

        // Если карточки нет — создать
        const card = createConversationCard(convo.id, recipient, lastMessage, unreadCount, avatarUrl);
        const cardClone = card.cloneNode(true);
        cardClone.id = `conversation-${convo.id}-mobile`;

        container.appendChild(card);
        container_mobile.appendChild(cardClone);
    }
}

function createConversationCard(conversationId, recipient, lastMessage, unreadCount, avatarUrl) {
    const card = document.createElement('div');
    card.className = 'card conversation-card shadow border-0 mb-3 w-100 pointer-on-hover';
    card.id = `conversation-${conversationId}`;

    card.innerHTML = `
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
                    <h6 class="primary-text-style text-truncate mb-2" id="conversation-name">${recipient?.nickname || ''}</h6>
                    <p class="small primary-text-style text-truncate mb-0" id="conversation-last-message-content">
                        ${lastMessage?.content || ''}
                    </p>
                </div>
                <div class="d-flex flex-column justify-content-start align-items-center align-items-lg-end ms-lg-auto">
                    ${unreadCount > 0 ? `
                        <small class="primary-text-style mb-2" id="conversation-last-message-date">
                            ${formatChatDateTime(lastMessage?.created_at || '')}
                        </small>
                        <span class="badge unread-badge primary-text-style" id="conversation-unread-quantity">
                            ${unreadCount}
                        </span>` 
                    : 
                        `
                        <small class="primary-text-style mb-0" id="conversation-last-message-date">
                            ${formatChatDateTime(lastMessage?.created_at || '')}
                        </small>
                        `
                    }
                </div>
            </div>
        </div>
    `;
    return card;
}

function updateConversationCard(card, recipient, lastMessage, unreadCount, avatarUrl) {
    const nameEl = card.querySelector('#conversation-name');
    const lastMessageContentEl = card.querySelector('#conversation-last-message-content');
    const lastMessageDateEl = card.querySelector('#conversation-last-message-date');
    const unreadBadgeEl = card.querySelector('#conversation-unread-quantity');
    const avatarImgEl = card.querySelector('#conversation-avatar');

    if (nameEl && nameEl.textContent !== (recipient?.nickname || '')) {
        nameEl.textContent = recipient?.nickname || '';
    }

    if (lastMessageContentEl && lastMessageContentEl.textContent !== (lastMessage?.content || '')) {
        lastMessageContentEl.textContent = lastMessage?.content || '';
    }

    const formattedDate = formatChatDateTime(lastMessage?.created_at || '');
    if (lastMessageDateEl && lastMessageDateEl.textContent !== formattedDate) {
        lastMessageDateEl.textContent = formattedDate;
    }

    if (avatarImgEl && avatarImgEl.src === "https://via.placeholder.com/100" && avatarUrl !== "https://via.placeholder.com/100") {
        avatarImgEl.src = avatarUrl;
    }
    else if (avatarImgEl.src !== "https://via.placeholder.com/100") {
        reloadImage(avatarImgEl);
    }

    if (unreadCount > 0) {
        if (unreadBadgeEl) {
            unreadBadgeEl.textContent = unreadCount;
        } else {
            const badge = document.createElement('span');
            badge.className = 'badge unread-badge primary-text-style';
            badge.id = 'conversation-unread-quantity';
            badge.textContent = unreadCount;
            const flexColumn = card.querySelector('.d-flex.flex-column.justify-content-start');
            if (flexColumn) {
                flexColumn.appendChild(badge);
            }
        }
    } else if (unreadBadgeEl) {
        unreadBadgeEl.remove();
    }
}
