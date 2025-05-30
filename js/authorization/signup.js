import {API_BASE_URL} from "../config.js";
import {showSuccsessToast, showErrorToast, showExistsToast} from "../toasts.js";

export function process_signup(nickname, username, password) {
    axios.post(`${API_BASE_URL}/auth/signup`, 
        {
            "nickname": nickname,
            "username": username,
            "password": password
        },
            { 
                headers: { 'Content-Type': 'application/json' } 
            }
        )
        .then(response => {
            showSuccsessToast("Регистрация прошла успешно!");
            setTimeout(() => {
                window.location.href = '/authorization/signin.html';
            }, 3000);
        })
        .catch(error => {
            if (error.response?.status === 409) {
                showExistsToast("Аккаунт с такими данными уже существует.");
            } else {
                showErrorToast(error);
            }
        })
}
  