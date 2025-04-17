const openProfileBtn = document.getElementById("openProfileBtn");
  openProfileBtn.addEventListener("click", () => {
    // Подождать, пока settingsModal закроется
    const settingsModalEl = document.getElementById('settingsModal');
    const settingsModal = bootstrap.Modal.getInstance(settingsModalEl);
    settingsModalEl.addEventListener('hidden.bs.modal', () => {
      const profileModal = new bootstrap.Modal(document.getElementById('profileModal'));
      profileModal.show();
    }, { once: true });
  });