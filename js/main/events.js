import {logout, DeleteUser, loadProfileData, processProfileChange, discardProfileChanges, saveProfileChanges} from "./user.js";


const avatarInput = document.getElementById('edit-avatar-input');
const avatarPreview = document.getElementById('edit-avatar-preview');
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

avatarInput.addEventListener('change', () => {
  if (avatarInput.files && avatarInput.files[0]) {
      const file = avatarInput.files[0];
      const imageUrl = URL.createObjectURL(file);
      avatarPreview.src = imageUrl;
  }
});