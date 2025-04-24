import {API_BASE_URL, API_TOKEN_LIFESPAN} from "../config.js";
import {showSuccsessToast, showErrorToast, showNotFoundToast} from "../toasts.js";

export function process_signin(username, password) {
    const formData = new URLSearchParams();
    formData.append("username", username);
    formData.append("password", password);

    axios.post(`${API_BASE_URL}/auth/login`, formData,
        {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }
        )
        .then(response => {
            document.cookie = `access_token=${response.data.access_token}; path=/; max-age=${API_TOKEN_LIFESPAN}; SameSite=Lax`;
            showSuccsessToast("Авторизация прошла успешно!");
            setTimeout(() => {
                window.location.href = '/index.html';
            }, 3000);
        })
        .catch(error => {
            if (error.response?.status === 404) {
                showNotFoundToast("Аккаунт с такими данными не существует.");
            } else {
                showErrorToast(error);
            }
        });
}
  