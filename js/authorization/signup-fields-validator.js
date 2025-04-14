import { process_signup } from './signup.js';

document.querySelectorAll('.toggle-password').forEach(button => {
    button.addEventListener('click', () => {
      const inputId = button.getAttribute('data-target');
      const input = document.getElementById(inputId);
      const icon = button.querySelector('i');

      if (input.type === 'password') {
        input.type = 'text';
        icon.classList.remove('bi-eye-slash');
        icon.classList.add('bi-eye');
      } else {
        input.type = 'password';
        icon.classList.remove('bi-eye');
        icon.classList.add('bi-eye-slash');
      }
    });
  });

  (() => {
    const form = document.getElementById('signup-form');
    form.addEventListener('submit', (event) => {
      const nickname = document.getElementById('nickname');
      const login = document.getElementById('login');
      const password = document.getElementById('password');
      const confirm = document.getElementById('confirm-password');

      // Проверка совпадения паролей
      if (password.value !== confirm.value) {
        confirm.setCustomValidity("Passwords do not match");
      } else {
        confirm.setCustomValidity('');
      }

      // Если форма невалидна — отменяем отправку
      if (!form.checkValidity()) {
        event.preventDefault();
        event.stopPropagation();
      } else {
        event.preventDefault(); // не отправлять форму
        process_signup(nickname.value, login.value, password.value);
      }

      form.classList.add('was-validated');
    });
  })();