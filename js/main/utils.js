import {API_TOKEN_LIFESPAN, API_BASE_URL} from "../config.js";
import {showSuccsessToast, showErrorToast} from "../toasts.js";

export function logout () {
    document.cookie = `access_token=; path=/; max-age=${API_TOKEN_LIFESPAN}; SameSite=Lax`;
    window.location.href = '/authorization/signin.html';
}


export function DeleteUser () {
    axios.post(`${API_BASE_URL}/users/me`
        )
        .then(response => {
            showSuccsessToast("Ваш аккаунт успешно удален!");
            window.location.href = '/authorization/signin.html';
        })
        .catch(error => {
            showErrorToast(error);
        })
}