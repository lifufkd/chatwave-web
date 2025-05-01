import {API_BASE_URL} from "../../config.js";
import { getCookie } from "../utils.js";
import { showErrorToast } from "../../toasts.js";
import { logout } from "../user.js";

export async function insertPrivateConversation(recipient_id) {
    try {
        const response = await axios.post(
            `${API_BASE_URL}/conversations/chat?recipient_id=${recipient_id}`,
            {},
            {
                headers: {
                    Authorization: `Bearer ${getCookie("access_token")}`
                }
            }
        );
        const data = response.data;
        return data;
    } catch (error) {
        if (error.response?.status === 401) {
            logout();
        } else {
            showErrorToast(error);
        }
    }
}

export async function selectUserConversations() {
    try {
        let response = await axios.get(`${API_BASE_URL}/users/conversations`,
            {
                headers: {
                    Authorization: `Bearer ${getCookie("access_token")}`
                }
            });
        return response.data;
    } catch (error) {
        if (error.response?.status === 401) {
            logout();
        } else {
            showErrorToast(error);
        }
    }
}