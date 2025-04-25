const openProfileBtn = document.getElementById("OpenProfileBtn");
  openProfileBtn.addEventListener("click", () => {
    // Подождать, пока settingsModal закроется
    const settingsModalEl = document.getElementById('SettingsModal');
    settingsModalEl.addEventListener('hidden.bs.modal', () => {
      const profileModal = new bootstrap.Modal(document.getElementById('MyProfileModal'));
      profileModal.show();
    }, { once: true });
  });