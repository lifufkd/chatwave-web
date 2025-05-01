import { formatDate, formatDateTime } from "../utils.js";
import {API_BASE_URL} from "../../config.js";
import { formatChatDateTime } from "../utils.js";

export function renderConversatorProfile(user_data) {
    const avatarUrl = user_data.avatar_name
        ? `${API_BASE_URL}/users/avatar/${user_data.avatar_name}`
        : 'https://via.placeholder.com/100';

    const avatarEl = document.getElementById('user-profile-avatar');
    if (avatarEl && avatarEl.src !== avatarUrl) {
        avatarEl.src = avatarUrl;
    }

    const nicknameEl = document.getElementById('user-profile-nickname');
    if (nicknameEl.textContent !== (user_data.nickname || 'No nickname')) {
        nicknameEl.textContent = user_data.nickname || 'No nickname';
    }

    const bioEl = document.getElementById('user-profile-bio');
    const newBio = `<strong>Bio:</strong> ${user_data.bio || '—'}`;
    if (bioEl.innerHTML !== newBio) {
        bioEl.innerHTML = newBio;
    }

    const birthdayEl = document.getElementById('user-profile-birthday');
    const newBirthday = `<strong>Birthday:</strong> ${formatDate(user_data.birthday)}`;
    if (birthdayEl.innerHTML !== newBirthday) {
        birthdayEl.innerHTML = newBirthday;
    }

    const lastOnlineEl = document.getElementById('user-profile-last-online');
    const newLastOnline = `<strong>Last online:</strong> ${formatDateTime(user_data.last_online)}`;
    if (lastOnlineEl.innerHTML !== newLastOnline) {
        lastOnlineEl.innerHTML = newLastOnline;
    }

    const createdAtEl = document.getElementById('user-profile-created-at');
    const newCreatedAt = `<strong>Created at:</strong> ${formatDateTime(user_data.created_at)}`;
    if (createdAtEl.innerHTML !== newCreatedAt) {
        createdAtEl.innerHTML = newCreatedAt;
    }
}

export function renderChatHeader(user_data) {
    const avatarUrl = user_data.avatar_name
        ? `${API_BASE_URL}/users/avatar/${user_data.avatar_name}`
        : 'https://via.placeholder.com/100';

    const avatarEl = document.getElementById('chat-avatar');
    if (avatarEl && avatarEl.src !== avatarUrl) {
        avatarEl.src = avatarUrl;
    }

    const nicknameEl = document.getElementById('chat-nickname');
    if (nicknameEl.textContent !== (user_data.nickname || 'No nickname')) {
        nicknameEl.textContent = user_data.nickname || 'No nickname';
    }

    const lastOnlineEl = document.getElementById('chat-last-online');
    const newLastOnline = `${formatChatDateTime(user_data.last_online)}`;
    if (lastOnlineEl.innerHTML !== newLastOnline) {
        lastOnlineEl.innerHTML = newLastOnline;
    }
}

export function clearMessages() {
    const container = document.getElementById('messages-container');
    container.innerHTML = "";
}

export function clearInputField() {
    const field = document.getElementById('chat-message-input');
    field.value = "";
}

export function makeChatInvisible() {
    const chat_container = document.getElementById('chat-container');
    chat_container.classList.add("invisible");
}

export function makeChatVisible() {
    const chat_container = document.getElementById('chat-container');
    chat_container.classList.remove("invisible");
}

export function renderMessage(msg, user, recipient) {
    let avatarUrl;
    const container = document.getElementById('messages-container');
    const existing = document.getElementById(`msg-${msg.id}`);

    const contentText = msg.content;
    const time = formatChatDateTime(msg.updated_at || msg.created_at);
    const isMine = msg.sender_id === user.id;

    const alignment = isMine ? 'justify-content-end' : '';
    const statusClass = isMine
        ? `sent${msg.status === 'delivered' ? ' border border-2 delivered' : msg.status === 'read' ? ' border border-2 read' : ''}`
        : 'recieved read';

    if (isMine) {
        avatarUrl = user?.avatar_name
            ? `${API_BASE_URL}/users/avatar/${user.avatar_name}`
            : 'https://via.placeholder.com/100';
    }
    else {
        avatarUrl = recipient?.avatar_name
            ? `${API_BASE_URL}/users/avatar/${recipient.avatar_name}`
            : 'https://via.placeholder.com/100';
    }

    const messageHtml = `
        <div id="msg-${msg.id}" class="d-flex align-items-start m-2 ${alignment}">
          <div class="avatar-container me-2">
            <img src="${avatarUrl}" class="avatar border border-2" alt="User avatar">
          </div>
          <div class="rounded-4 px-3 py-2 d-flex flex-column message-container ${statusClass}">
            <span class="text-start w-100">${contentText}</span>
            <small class="secondary-text-style ms-2 text-end w-100">${time}</small>
          </div>
        </div>`;

    if (existing) {
        existing.outerHTML = messageHtml;
    } else {
        container.insertAdjacentHTML('beforeend', messageHtml);
    }
}
