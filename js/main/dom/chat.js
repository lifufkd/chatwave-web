import { formatDate, formatDateTime } from "../utils.js";
import {API_BASE_URL} from "../../config.js";
import { removeExtension, reloadImage, formatChatDateTime } from "../utils.js";

export function renderConversatorProfile(user_data) {
    const avatarUrl = user_data.avatar_name
        ? `${API_BASE_URL}/users/${removeExtension(user_data.avatar_name)}/avatar`
        : 'https://via.placeholder.com/100';

    var profile_avatar_obj = document.getElementById('user-profile-avatar');
    profile_avatar_obj.src = avatarUrl;
    reloadImage(profile_avatar_obj);
    document.getElementById('user-profile-nickname').textContent = user_data.nickname || 'No nickname';
    document.getElementById('user-profile-bio').innerHTML = `<strong>Bio:</strong> ${user_data.bio || '—'}`;
    document.getElementById('user-profile-birthday').innerHTML = `<strong>Birthday:</strong> ${formatDate(user_data.birthday)}`;
    document.getElementById('user-profile-last-online').innerHTML = `<strong>Last online:</strong> ${formatDateTime(user_data.last_online)}`;
    document.getElementById('user-profile-created-at').innerHTML = `<strong>Created at:</strong> ${formatDateTime(user_data.created_at)}`;
}

export function renderChatHeader(user_data) {
    const avatarUrl = user_data.avatar_name
        ? `${API_BASE_URL}/users/${removeExtension(user_data.avatar_name)}/avatar`
        : 'https://via.placeholder.com/100';

    var profile_avatar_obj = document.getElementById('chat-avatar');
    profile_avatar_obj.src = avatarUrl;
    reloadImage(profile_avatar_obj);
    document.getElementById('chat-nickname').textContent = user_data.nickname || 'No nickname';
    document.getElementById('chat-last-online').innerHTML = `${formatChatDateTime(user_data.last_online)}`;
}