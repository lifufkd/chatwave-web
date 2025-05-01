import {showSuccsessToast, showErrorToast} from "../../toasts.js";
import {API_BASE_URL} from "../../config.js";
import { getCookie } from "../utils.js";
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

export async function fetchMessages(conversation_id, limit, offset) {
    try {
        let response = await axios.get(`${API_BASE_URL}/conversations/${conversation_id}/messages?limit=${limit}&offset=${offset}`,
            {
                headers: {
                    Authorization: `Bearer ${getCookie("access_token")}`
                }
            });
        return response.data;
    } catch (error) {
        if (error.response?.status === 401) {
            logout();
        }
        else if (error.response?.status === 404) {
            return;
        }
        else {
            showErrorToast(error);
        }
    }
}

export async function insertTextMessage(content, conversation_id) {
    try {
        let message = await axios.post(`${API_BASE_URL}/conversations/${conversation_id}/text`,
            {
                "content": content
            },
            {
                headers: {
                    Authorization: `Bearer ${getCookie("access_token")}`
                }
            });
        return message.data;
    } catch (error) {
        if (error.response?.status === 401) {
            logout();
        } else {
            showErrorToast(error);
        }
    }
}

export async function insertUnreadMessage(conversation_id, message_id, type, recipient_id) {
    try {
        await axios.post(`${API_BASE_URL}/conversations/${conversation_id}/entities/${message_id}?entity_type=${type}&users_ids=${recipient_id}`,
            {},
            {
                headers: {
                    Authorization: `Bearer ${getCookie("access_token")}`
                }
            });
    } catch (error) {
        if (error.response?.status === 401) {
            logout();
        } else {
            showErrorToast(error);
        }
    }
}

export async function selectUserUnreadMessages() {
    try {
        let response = await axios.get(`${API_BASE_URL}/users/messages/unread`,
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

export async function selectLastConversationMessage(conversation_id) {
    try {
        let response = await axios.get(`${API_BASE_URL}/conversations/${conversation_id}/messages/last`,
            {
                headers: {
                    Authorization: `Bearer ${getCookie("access_token")}`
                }
            });
        return response.data;
    } catch (error) {
        if (error.response?.status === 401) {
            logout();
        } 
        else if (error.response?.status === 404) {
        }
        else {
            showErrorToast(error);
        }
    }
}
