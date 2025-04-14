import {API_BASE_URL} from "../config.js";
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
            document.cookie = `access_token=${response.data.access_token}; path=/; max-age=1209500; SameSite=Lax`;
            showSuccsessToast();
            setTimeout(() => {
                window.location.href = '/index.html';
            }, 3000);
        })
        .catch(error => {
            if (error.response?.status === 404) {
                showNotFoundToast();
            } else {
                showErrorToast(error);
            }
        });
}
  