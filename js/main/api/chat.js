import {API_BASE_URL} from "../../config.js";
import { getCookie } from "../utils.js";
import {showSuccsessToast, showErrorToast} from "../../toasts.js";
import { logout } from "../user.js";


export async function deleteConversationMessages(conversation_id) {
    try {
        await axios.delete(`${API_BASE_URL}/conversations/${conversation_id}/messages`,
            {
                headers: {
                    Authorization: `Bearer ${getCookie("access_token")}`
                }
            });
        showSuccsessToast("Chat successfully cleared")
    } catch (error) {
        if (error.response?.status === 401) {
            logout();
        } else {
            showErrorToast(error);
        }
    }
}

export async function deleteConversation(conversation_id) {
    try {
        await axios.delete(`${API_BASE_URL}/conversations/${conversation_id}`,
            {
                headers: {
                    Authorization: `Bearer ${getCookie("access_token")}`
                }
            });
        showSuccsessToast("Chat successfully deleted")
    } catch (error) {
        if (error.response?.status === 401) {
            logout();
        } else {
            showErrorToast(error);
        }
    }
}