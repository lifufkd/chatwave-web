import {API_TOKEN_LIFESPAN, API_BASE_URL} from "../config.js";
import {showSuccsessToast, showErrorToast} from "../toasts.js";
import { getCookie, formatDate, formatDateTime, getTextAfterColon, formatDateInput, toggleElements } from "./utils.js";
import { getProfileData } from "./api/user.js";

export function logout () {
    document.cookie = `access_token=; path=/; max-age=${API_TOKEN_LIFESPAN}; SameSite=Lax`;
    window.location.href = '/authorization/signin.html';
}


export async function DeleteUser () {
    axios.delete(`${API_BASE_URL}/users/me`, 
        {
            headers: {
              Authorization: `Bearer ${getCookie("access_token")}`
            }
        }
        )
        .then(response => {
            showSuccsessToast("Ваш аккаунт успешно удален!");
            window.location.href = '/authorization/signin.html';
        })
        .catch(error => {
            showErrorToast(error);
        })
}

function updateProfileView(user_data) {
    const avatarUrl = user_data.avatar_name
        ? `${API_BASE_URL}/media/${user_data.avatar_name}`
        : 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fmedia1.tenor.com%2Fm%2F9RCIDZjkhBsAAAAd%2Fhamster-meme.gif&f=1&nofb=1&ipt=d3bffaef3437e83b1ae505cae978858d8cfcbc2d493f35a20eeb609f0a5208ae';

    document.getElementById('conversation-avatar').src = avatarUrl;
    document.getElementById('my-profile-nickname').textContent = user_data.nickname || 'No nickname';
    document.getElementById('my-profile-login').innerHTML = `<strong>Login:</strong> ${user_data.username || '—'}`;
    document.getElementById('my-profile-bio').innerHTML = `<strong>Bio:</strong> ${user_data.bio || '—'}`;
    document.getElementById('my-profile-birthday').innerHTML = `<strong>Birthday:</strong> ${formatDate(user_data.birthday)}`;
    document.getElementById('my-profile-last-online').innerHTML = `<strong>Last online:</strong> ${formatDateTime(user_data.last_online)}`;
    document.getElementById('my-profile-created-at').innerHTML = `<strong>Created at:</strong> ${formatDateTime(user_data.created_at)}`;
    document.getElementById('my-profile-updated-at').innerHTML = `<strong>Updated at:</strong> ${formatDateTime(user_data.updated_at)}`;
}

export async function loadProfileData() {
    var user_data = await getProfileData();
    updateProfileView(user_data);
}

export async function processProfileChange () {
    const user = await getProfileData(); // async функция, которая подгружает с API

    // Подставляем данные в поля формы
    document.getElementById('edit-nickname').placeholder = user.nickname ?? '';
    document.getElementById('edit-bio').placeholder = user.bio ?? '';
    document.getElementById('edit-birthday').value = user.birthday ? formatDateForInput(user.birthday) : '';

    // Показываем форму, скрываем просмотр
    const profileModal = bootstrap.Modal.getOrCreateInstance(document.getElementById('profile-view-section'));
    const editProfileModal = bootstrap.Modal.getOrCreateInstance(document.getElementById('profile-edit-section'));
    profileModal.hide();
    editProfileModal.show();
}

function discardProfileChanges() {
    const form = document.getElementById('edit-profile-form');
    form.reset();
    form.classList.remove('was-validated');

    const profileModal = bootstrap.Modal.getOrCreateInstance(document.getElementById('profile-view-section'));
    const editProfileModal = bootstrap.Modal.getOrCreateInstance(document.getElementById('profile-edit-section'));
    profileModal.show();
    editProfileModal.hide();
}

async function saveProfileChanges() {
    const form = document.getElementById('edit-profile-form');

    const nicknameInput = document.getElementById('edit-nickname');
    const bioInput = document.getElementById('edit-bio');
    const birthdayInput = document.getElementById('edit-birthday');
    const passwordInput = document.getElementById('edit-password');
    const confirmPasswordInput = document.getElementById('edit-confirm-password');

    // Валидация совпадения паролей
    if (passwordInput.value !== confirmPasswordInput.value) {
        confirmPasswordInput.setCustomValidity("Passwords do not match");
    } else {
        confirmPasswordInput.setCustomValidity('');
    }

    // Если форма невалидна, не отправляем
    if (!form.checkValidity()) {
        form.classList.add('was-validated');
        return;
    }

    // Собираем только изменённые поля
    const payload = {};
    if (nicknameInput.value.trim()) payload.nickname = nicknameInput.value.trim();
    if (bioInput.value.trim()) payload.bio = bioInput.value.trim();
    if (birthdayInput.value) payload.birthday = birthdayInput.value;
    if (passwordInput.value) payload.password = passwordInput.value;

    try {
        await axios.patch(`${API_BASE_URL}/users/me`, payload, 
            {
                headers: {
                  Authorization: `Bearer ${getCookie("access_token")}`
                }
            });
        showSuccsessToast('Profile updated!');
        const updatedUser = await getProfileData();
        updateProfileView(updatedUser);
        discardProfileChanges();
    } catch (error) {
        showErrorToast('Failed to update profile');
    }
}