import {logout, DeleteUser, loadProfileData, processProfileChange, discardProfileChanges, saveProfileChanges, searchUsers, searchUsersMobile} from "./user.js";
import { removeConversation, removeConversationMessages, knownMessages, sendTextMessage } from "./chat.js";
import { openChat, openNewChat, fetchConversationsLongPolling } from "./conversation.js";
import { clearFoundedUsers } from "./dom/user.js";
import { clearMessages } from "./dom/chat.js";

const openProfileBtn = document.getElementById("OpenProfileBtn");
const settingsModalEl = document.getElementById('SettingsModal');
const avatarInput = document.getElementById('edit-avatar-input');
const avatarPreview = document.getElementById('edit-avatar-preview');

const searchInput = document.getElementById('search-input');
const clearBtn = document.getElementById('clear-search-btn');
const foundedUsersContainer = document.getElementById('founded-users-container');

const searchInputMobile = document.getElementById('search-input-mobile');
const clearBtnMobile = document.getElementById('clear-search-mobile-btn');
const foundedUsersContainerMobile = document.getElementById('founded-users-container-mobile');

const conversations_conteiner = document.getElementById('conversations-container');
const conversations_conteiner_mobile = document.getElementById('conversations-container-mobile');

const chat_container = document.getElementById('chat-container');
const messages_container = document.getElementById('messages-container');


export const scrollState = {
  loadCount: 1
};


// Desktop search
searchInput.addEventListener('input', () => {
  if (searchInput.value.length >= 3) {
    searchUsers(searchInput.value);
  }
  else if (searchInput.value.length > 0) {
    clearBtn.classList.remove('d-none');
    foundedUsersContainer.classList.remove('d-none');
    clearFoundedUsers('desktop');
  }
  else {
    clearBtn.classList.add('d-none');
    foundedUsersContainer.classList.add('d-none');
  }
});

clearBtn.addEventListener('click', () => {
  searchInput.value = '';
  clearBtn.classList.add('d-none');
  foundedUsersContainer.classList.add('d-none');
  clearFoundedUsers('desktop');
});

foundedUsersContainer.addEventListener('click', (event) => {
  const target = event.target.closest('div[id^="conversation-user-"]');
  if (target) {
    let id = target.id.replace('conversation-user-', '');
    if (id.endsWith('-mobile')) {
      id = id.replace('-mobile', '');
    }
    openNewChat(id);
    chat_container.classList.remove("invisible");
  }
});


// Mobile search
searchInputMobile.addEventListener('input', () => {
  if (searchInputMobile.value.length >= 3) {
    searchUsersMobile(searchInputMobile.value);
  }
  else if (searchInputMobile.value.length > 0) {
    clearBtnMobile.classList.remove('d-none');
    foundedUsersContainerMobile.classList.remove('d-none');
    clearFoundedUsers('mobile');
  }
  else {
    clearBtnMobile.classList.add('d-none');
    foundedUsersContainerMobile.classList.add('d-none');
  }
});

clearBtnMobile.addEventListener('click', () => {
  searchInputMobile.value = '';
  clearBtnMobile.classList.add('d-none');
  foundedUsersContainerMobile.classList.add('d-none');
  clearFoundedUsers('mobile');
});

foundedUsersContainerMobile.addEventListener('click', (event) => {
  const target = event.target.closest('div[id^="conversation-user-"]');
  if (target) {
    let id = target.id.replace('conversation-user-', '');
    if (id.endsWith('-mobile')) {
      id = id.replace('-mobile', '');
    }
    openNewChat(id);
    chat_container.classList.remove("invisible")
  }
});

// Conversations

conversations_conteiner.addEventListener('click', (event) => {
  const target = event.target.closest('div[id^="conversation-"]');
  if (target) {
    let id = target.id.replace('conversation-', '');
    if (id.endsWith('-mobile')) {
      id = id.replace('-mobile', '');
    }
    openChat(id);
    chat_container.classList.remove("invisible")
  }
});


conversations_conteiner_mobile.addEventListener('click', (event) => {
  const target = event.target.closest('div[id^="conversation-"]');
  if (target) {
    let id = target.id.replace('conversation-', '');
    if (id.endsWith('-mobile')) {
      id = id.replace('-mobile', '');
    }
    openChat(id);
    chat_container.classList.remove("invisible")
  }
});


document.getElementById("logoutBtn").addEventListener("click", function () {
    logout();
  });

document.getElementById("deleteAccountBtn").addEventListener("click", function () {
    DeleteUser();
  });

document.getElementById('MyProfileModal').addEventListener('show.bs.modal', loadProfileData);

document.getElementById('EditMyProfileBtn').addEventListener('click', function () {
  processProfileChange();
});

document.getElementById('SaveEditProfileBtn').addEventListener('click', function () {
  saveProfileChanges();
});

document.getElementById('CancelEditProfileBtn').addEventListener('click', function () {
  discardProfileChanges();
});

document.getElementById('chat-send-message-btn').addEventListener('click', function () {
    sendTextMessage();
});

document.getElementById('DeleteConversationBtn').addEventListener('click', function () {
  removeConversation();
});

document.getElementById('ClearConversationBtn').addEventListener('click', function () {
    removeConversationMessages();
});

document.addEventListener('DOMContentLoaded', () => {
  fetchConversationsLongPolling();
});

avatarInput.addEventListener('change', () => {
  if (avatarInput.files && avatarInput.files[0]) {
      const file = avatarInput.files[0];
      const imageUrl = URL.createObjectURL(file);
      avatarPreview.src = imageUrl;
  }
});

document.addEventListener('DOMContentLoaded', function() {
  const messageInput = document.getElementById('chat-message-input');
  const sendButton = document.getElementById('chat-send-message-btn');

  messageInput.addEventListener('keydown', function(event) {
      if (event.key === 'Enter' && !event.shiftKey) { 
          event.preventDefault(); // предотвращаем перенос строки
          sendButton.click(); // кликаем по кнопке отправки
      }
  });
});

messages_container.addEventListener('scroll', () => {
  const hasVerticalScroll = messages_container.scrollHeight > messages_container.clientHeight;
  if (hasVerticalScroll && messages_container.scrollTop === 0) {
    clearMessages();
    knownMessages.clear();
    scrollState.loadCount += 1;
  }
});

openProfileBtn.addEventListener("click", () => {
  settingsModalEl.addEventListener('hidden.bs.modal', () => {
    const profileModal = new bootstrap.Modal(document.getElementById('MyProfileModal'));
    profileModal.show();
  }, { once: true });
});




// todo: delete after dev
document.addEventListener('keydown', (e) => {
  if (e.ctrlKey && e.key.toLowerCase() === 'z') {
    const offcanvasEl = document.getElementById('settingsOffcanvas');
    const offcanvas = bootstrap.Offcanvas.getOrCreateInstance(offcanvasEl);

    if (offcanvasEl.classList.contains('show')) {
      offcanvas.hide();
    } else {
      offcanvas.show();
    }
  }
});

document.addEventListener('keydown', (e) => {
  if (e.ctrlKey && e.key.toLowerCase() === 'x') {
    const offcanvasEl = document.getElementById('dialogsOffcanvas');
    const offcanvas = bootstrap.Offcanvas.getOrCreateInstance(offcanvasEl);

    if (offcanvasEl.classList.contains('show')) {
      offcanvas.hide();
    } else {
      offcanvas.show();
    }
  }
});
