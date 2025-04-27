import {API_TOKEN_LIFESPAN} from "../config.js";
import { getProfileData, deleteUserProfile, updateUserProfile, updateUserAvatar, getUsersByQuery, getUserById } from "./api/user.js";
import { renderProfileView, renderProfileEdit, clearFoundedUsers, renderFoundedUsers, renderConversatorProfile, renderChatHeader } from "./dom/user.js";

export function logout () {
    document.cookie = `access_token=; path=/; max-age=${API_TOKEN_LIFESPAN}; SameSite=Lax`;
    window.location.href = '/authorization/signin.html';
}


export async function DeleteUser () {
    await deleteUserProfile();
}

export async function loadProfileData() {
    var user_data = await getProfileData();
    if (user_data) {
        renderProfileView(user_data);
    }
}

export async function processProfileChange () {
    const user = await getProfileData(); // async функция, которая подгружает с API
    if (user) {
        renderProfileEdit(user);
    }

    const profile_view = document.getElementById('profile-view-section');
    const profile_edit = document.getElementById('profile-edit-section');
    const profile_header_view = document.getElementById('profile-view-header-section');
    const profile_header_edit = document.getElementById('profile-edit-header-section');
    profile_view.classList.remove("d-flex", "d-none");
    profile_edit.classList.remove("d-flex", "d-none");
    profile_header_view.classList.remove("d-none");
    profile_header_edit.classList.remove("d-none");

    profile_header_view.classList.add("d-none");
    profile_view.classList.add("d-none");
    profile_edit.classList.add("d-flex");
}

export function discardProfileChanges() {
    const form = document.getElementById('profile-edit-section');
    form.reset();
    form.classList.remove('was-validated');

    const profile_view = document.getElementById('profile-view-section');
    const profile_edit = document.getElementById('profile-edit-section');
    const profile_header_view = document.getElementById('profile-view-header-section');
    const profile_header_edit = document.getElementById('profile-edit-header-section');
    profile_view.classList.remove("d-flex", "d-none");
    profile_edit.classList.remove("d-flex", "d-none");
    profile_header_view.classList.remove("d-none");
    profile_header_edit.classList.remove("d-none");

    profile_header_edit.classList.add("d-none");
    profile_view.classList.add("d-flex");
    profile_edit.classList.add("d-none");
}

export async function saveProfileChanges() {
    const form = document.getElementById('profile-edit-section');

    const nicknameInput = document.getElementById('edit-nickname');
    const bioInput = document.getElementById('edit-bio');
    const birthdayInput = document.getElementById('edit-birthday');
    const passwordInput = document.getElementById('edit-password');
    const confirmPasswordInput = document.getElementById('edit-password-retype');
    const avatarInput = document.getElementById('edit-avatar-input');

    let valid = true;

    // Проверка никнейма: минимум 3 символа
    if (nicknameInput.value) {
        if (nicknameInput.value.trim().length < 3) {
            nicknameInput.setCustomValidity('Nickname must be at least 3 characters.');
            valid = false;
        } else {
            nicknameInput.setCustomValidity('');
        }
    } else {
        nicknameInput.setCustomValidity('');
    }

    // Проверка пароля, если он заполнен
    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    if (passwordInput.value) {
        if (!passwordPattern.test(passwordInput.value)) {
            passwordInput.setCustomValidity('Password must be at least 8 characters, with uppercase, lowercase letters, and a number.');
            valid = false;
        } else {
            passwordInput.setCustomValidity('');
        }
    } else {
        passwordInput.setCustomValidity('');
    }

    // Проверка совпадения паролей
    if (passwordInput.value !== confirmPasswordInput.value) {
        confirmPasswordInput.setCustomValidity("Passwords do not match");
        valid = false;
    } else {
        confirmPasswordInput.setCustomValidity('');
    }

    // Готовим FormData для отправки файла
    if (avatarInput.files[0]) {
        const file = avatarInput.files[0];
        const formData = new FormData();
        formData.append('avatar', file);
        await updateUserAvatar(formData);
    }

    // Отмечаем форму как проверенную для Bootstrap-валидации
    form.classList.add('was-validated');

    // Если форма невалидна — не отправляем запрос
    if (!valid || !form.checkValidity()) {
        return;
    }

    // Собираем только изменённые поля
    const payload = {};
    if (nicknameInput.value.trim()) payload.nickname = nicknameInput.value.trim();
    if (bioInput.value.trim()) payload.bio = bioInput.value.trim();
    if (birthdayInput.value) payload.birthday = birthdayInput.value;
    if (passwordInput.value) payload.password = passwordInput.value;

    await updateUserProfile(payload);
    const updatedUser = await getProfileData();
    if (updatedUser) {
        renderProfileView(updatedUser);
    }
    discardProfileChanges();
}


export async function searchUsers (search_query) {
    var founded_users = await getUsersByQuery(search_query, 10);
    clearFoundedUsers('desktop');
    renderFoundedUsers(founded_users, 'desktop');
}

export async function searchUsersMobile (search_query) {
    var founded_users = await getUsersByQuery(search_query, 10);
    clearFoundedUsers('mobile');
    renderFoundedUsers(founded_users, 'mobile');
}

export async function openNewChat(user_id) {
    var chat_obj = document.getElementById('chat-container');
    var user_data = await getUserById(user_id);
    renderConversatorProfile(user_data[0]);
    renderChatHeader(user_data[0]);
    chat_obj.setAttribute('new', true);

}