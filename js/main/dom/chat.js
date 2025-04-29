import { formatDate, formatDateTime } from "../utils.js";
import {API_BASE_URL} from "../../config.js";
import { removeExtension, reloadImage, formatChatDateTime } from "../utils.js";

export function renderConversatorProfile(user_data) {
    const avatarUrl = user_data.avatar_name
        ? `${API_BASE_URL}/users/${removeExtension(user_data.avatar_name)}/avatar`
        : 'https://via.placeholder.com/100';

    const avatarEl = document.getElementById('user-profile-avatar');
    if (avatarEl && avatarEl.src.split("?")[0] !== avatarUrl) {
        avatarEl.src = avatarUrl;
    }
    else if (avatarEl.src !== "https://via.placeholder.com/100") {
        reloadImage(avatarEl);
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
        ? `${API_BASE_URL}/users/${removeExtension(user_data.avatar_name)}/avatar`
        : 'https://via.placeholder.com/100';

    const avatarEl = document.getElementById('chat-avatar');
    if (avatarEl && avatarEl.src.split("?")[0] !== avatarUrl) {
        avatarEl.src = avatarUrl;
    }
    else if (avatarEl.src !== "https://via.placeholder.com/100") {
        reloadImage(avatarEl);
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
