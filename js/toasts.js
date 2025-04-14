export function showSuccsessToast() {
    const toastEl = document.getElementById('successToast');
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
