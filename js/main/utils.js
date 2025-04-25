import {API_TOKEN_LIFESPAN, API_BASE_URL} from "../config.js";

export function getCookie(name) {
    const cookies = Object.fromEntries(
      document.cookie.split('; ').map(c => c.split('='))
    );
    return cookies[name] || null;
  }

export function formatDate(isoString) {
    if (!isoString) return '—';
    const date = new Date(isoString);
    return date.toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' });
}

export function formatDateTime(isoString) {
    if (!isoString) return '—';
    const date = new Date(isoString);
    return date.toLocaleString(undefined, {
        year: 'numeric', month: 'long', day: 'numeric',
        hour: '2-digit', minute: '2-digit'
    });
}

export function validateFields(data) {
    let isValid = true;

    // Никнейм: минимум 3 символа
    if (data.nickname && data.nickname.length < 3) {
      nicknameError.style.display = 'block';
      isValid = false;
    } else {
      nicknameError.style.display = 'none';
    }

    // Логин: минимум 3 символа
    if (data.login && data.login.length < 3) {
      loginError.style.display = 'block';
      isValid = false;
    } else {
      loginError.style.display = 'none';
    }

    // Пароль: минимум 8 символов, 1 большая, 1 маленькая, 1 цифра
    if (data.password) {
      const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
      if (!passwordRegex.test(data.password)) {
        passwordError.style.display = 'block';
        isValid = false;
      } else {
        passwordError.style.display = 'none';
      }
    } else {
      passwordError.style.display = 'none';
    }

    return isValid;
  }
  

export function getTextAfterColon(id) {
    const el = document.getElementById(id);
    if (!el) return '';
    const parts = el.textContent.split(':');
    return parts.length > 1 ? parts[1].trim() : '';
}

export function formatDateInput(str) {
    if (!str || str === '—') return '';
    const d = new Date(str);
    return d.toISOString().split('T')[0];
}

export function toggleElements(ids, show = false) {
    ids.forEach(id => {
        const el = document.getElementById(id);
        if (el) {
            el.style.display = show ? '' : 'none';
        }
    });
}
