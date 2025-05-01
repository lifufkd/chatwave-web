import { formatDate, formatDateTime } from "../utils.js";
import {API_BASE_URL} from "../../config.js";

export function renderProfileView(user_data) {
    const avatarUrl = user_data.avatar_name
        ? `${API_BASE_URL}/users/avatar/${user_data.avatar_name}`
        : 'https://via.placeholder.com/100';

    var profile_avatar_obj = document.getElementById('my-profile-avatar');
    profile_avatar_obj.src = avatarUrl;
    document.getElementById('my-profile-nickname').textContent = user_data.nickname || 'No nickname';
    document.getElementById('my-profile-login').innerHTML = `<strong>Login:</strong> ${user_data.username || '—'}`;
    document.getElementById('my-profile-bio').innerHTML = `<strong>Bio:</strong> ${user_data.bio || '—'}`;
    document.getElementById('my-profile-birthday').innerHTML = `<strong>Birthday:</strong> ${formatDate(user_data.birthday)}`;
    document.getElementById('my-profile-last-online').innerHTML = `<strong>Last online:</strong> ${formatDateTime(user_data.last_online)}`;
    document.getElementById('my-profile-created-at').innerHTML = `<strong>Created at:</strong> ${formatDateTime(user_data.created_at)}`;
    document.getElementById('my-profile-updated-at').innerHTML = `<strong>Updated at:</strong> ${formatDateTime(user_data.updated_at)}`;
}


export function renderProfileEdit(user_data) {
    const avatarUrl = user_data.avatar_name
        ? `${API_BASE_URL}/users/avatar/${user_data.avatar_name}`
        : 'https://via.placeholder.com/100';
    var edit_profile_avatar_obj = document.getElementById('edit-avatar-preview');
    edit_profile_avatar_obj.src = avatarUrl;
    document.getElementById('edit-nickname').placeholder = user_data.nickname || '';
    document.getElementById('edit-bio').placeholder = user_data.bio || '';
    document.getElementById('edit-birthday').placeholder = formatDate(user_data.birthday);
}
  

export function clearFoundedUsers (version) {
    let container;
    if (version === 'desktop') {
        container = document.getElementById("founded-users-container");
    }
    else if (version === 'mobile') {
        container = document.getElementById("founded-users-container-mobile");
    }
    container.innerHTML = '';
}

export function renderFoundedUsers(users, version) {
    let container;
    if (version === 'desktop') {
        container = document.getElementById("founded-users-container");
    }
    else if (version === 'mobile') {
        container = document.getElementById("founded-users-container-mobile");
    }

    var title = document.createElement('div');
    title.innerHTML = `<h2 class="text-start mb-3 primary-text-style">Founded users</h2>`
    container.appendChild(title);
  
    users.forEach(user => {
      const card = document.createElement('div');
      card.className = 'card conversation-card shadow border-0 mb-3 w-100 pointer-on-hover';
      if (version === 'desktop') {
        card.id = `conversation-user-${user.id}`;
      }
      else if (version === 'mobile') {
        card.id = `conversation-user-${user.id}-mobile`;
      }
      const avatarUrl = user.avatar_name
        ? `${API_BASE_URL}/users/avatar/${user.avatar_name}`
        : 'https://via.placeholder.com/100';
  
      card.innerHTML = `
        <div class="card-body py-3">
          <div class="d-flex flex-column flex-lg-row justify-content-start align-items-center gap-3">
            <!-- Аватар -->
            <div class="flex-shrink-0 avatar-container mw-100">
              <img 
                src="${avatarUrl}" 
                class="avatar border border-2" 
                alt="User avatar">
            </div>
            <!-- Контент -->
            <div class="text-center text-lg-start overflow-hidden mw-100">
              <h5 class="primary-text-style text-truncate mb-0">${user.nickname}</h5>
            </div>
          </div>
        </div>
      `;
  
      container.appendChild(card);
    });
  }