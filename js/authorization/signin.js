import {API_BASE_URL} from "../config.js";
import {showSuccsessToast, showErrorToast} from "../toasts.js";

export function process_signin(username, password) {
    axios.post(`${API_BASE_URL}/auth/login`, 
        {
            "username": username,
            "password": password
        },
        {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }
        )
        .then(response => {
            showSuccsessToast();
            setTimeout(() => {
                window.location.href = '/index.html';
            }, 3000);
        })
        .catch(error => showErrorToast(error));
}
  