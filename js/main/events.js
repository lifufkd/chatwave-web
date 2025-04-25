import {logout, DeleteUser, loadProfileData, processProfileChange} from "./user.js";

document.getElementById("logoutBtn").addEventListener("click", function () {
    logout();
  });

document.getElementById("deleteAccountBtn").addEventListener("click", function () {
    DeleteUser();
  });

document.getElementById('MyProfileModal').addEventListener('show.bs.modal', loadProfileData);

document.getElementById('OpenEditProfileBtn').addEventListener('click', function () {
  processProfileChange();
});