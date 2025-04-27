export function showSuccsessToast(message) {
    const toastEl = document.getElementById('successToast');
    document.getElementById('successToastMessage').textContent = message;
    const toast = new bootstrap.Toast(toastEl);
    toast.show();
  }

export function showExistsToast(message) {
  const toastEl = document.getElementById('toastExists');
  document.getElementById('existsToastMessage').textContent = message;
  const toast = new bootstrap.Toast(toastEl);
  toast.show();
}

export function showNotFoundToast(message) {
  const toastEl = document.getElementById('toastExists');
  document.getElementById('existsToastMessage').textContent = message;
  const toast = new bootstrap.Toast(toastEl);
  toast.show();
}

export function showErrorToast(technicalMessage = "Неизвестная ошибка") {
    const toastEl = document.getElementById('errorToast');
    const errorMessageEl = document.getElementById('errorMessage');

    errorMessageEl.textContent = technicalMessage;

    const toast = new bootstrap.Toast(toastEl);
    toast.show();
}
