import { formatDate, formatDateTime } from "../utils.js";
import {API_BASE_URL} from "../../config.js";
import { removeExtension, reloadImage } from "../utils.js";

export function updateProfileView(user_data) {
    const avatarUrl = user_data.avatar_name
        ? `${API_BASE_URL}/users/${removeExtension(user_data.avatar_name)}/avatar`
        : 'https://via.placeholder.com/100';

    var profile_avatar_obj = document.getElementById('my-profile-avatar');
    profile_avatar_obj.src = avatarUrl;
    reloadImage(profile_avatar_obj);
    document.getElementById('my-profile-nickname').textContent = user_data.nickname || 'No nickname';
    document.getElementById('my-profile-login').innerHTML = `<strong>Login:</strong> ${user_data.username || '—'}`;
    document.getElementById('my-profile-bio').innerHTML = `<strong>Bio:</strong> ${user_data.bio || '—'}`;
    document.getElementById('my-profile-birthday').innerHTML = `<strong>Birthday:</strong> ${formatDate(user_data.birthday)}`;
    document.getElementById('my-profile-last-online').innerHTML = `<strong>Last online:</strong> ${formatDateTime(user_data.last_online)}`;
    document.getElementById('my-profile-created-at').innerHTML = `<strong>Created at:</strong> ${formatDateTime(user_data.created_at)}`;
    document.getElementById('my-profile-updated-at').innerHTML = `<strong>Updated at:</strong> ${formatDateTime(user_data.updated_at)}`;
}


export function updateProfileEdit(user_data) {
    const avatarUrl = user_data.avatar_name
        ? `${API_BASE_URL}/users/${removeExtension(user_data.avatar_name)}/avatar`
        : 'https://via.placeholder.com/100';
    var edit_profile_avatar_obj = document.getElementById('edit-avatar-preview');
    edit_profile_avatar_obj.src = avatarUrl;
    reloadImage(edit_profile_avatar_obj);
    document.getElementById('edit-nickname').placeholder = user_data.nickname || '';
    document.getElementById('edit-bio').placeholder = user_data.bio || '';
    document.getElementById('edit-birthday').placeholder = formatDate(user_data.birthday);
}