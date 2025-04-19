const openProfileBtn = document.getElementById("OpenProfileBtn");
  openProfileBtn.addEventListener("click", () => {
    // Подождать, пока settingsModal закроется
    const settingsModalEl = document.getElementById('SettingsModal');
    const settingsModal = bootstrap.Modal.getInstance(settingsModalEl);
    settingsModalEl.addEventListener('hidden.bs.modal', () => {
      const profileModal = new bootstrap.Modal(document.getElementById('MyProfileModal'));
      profileModal.show();
    }, { once: true });
  });