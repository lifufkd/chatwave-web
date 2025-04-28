import {API_BASE_URL} from "../../config.js";
import { getCookie } from "../utils.js";
import {showSuccsessToast, showErrorToast} from "../../toasts.js";
import { logout } from "../user.js";

export async function getProfileData() {
    try {
        const response = await axios.get(`${API_BASE_URL}/users/me`, 
            {
                headers: {
                  Authorization: `Bearer ${getCookie("access_token")}`
                }
            });
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

export async function deleteUserProfile () {
    try {
        await axios.delete(`${API_BASE_URL}/users/me`, 
            {
                headers: {
                  Authorization: `Bearer ${getCookie("access_token")}`
                }
            }
            )
        window.location.href = '/authorization/signin.html';
    } catch (error) {
        if (error.response?.status === 401) {
            logout();
        } else {
            showErrorToast(error);
        }
    }
}

export async function updateUserProfile (updated_user_data) {
    try {
        await axios.patch(`${API_BASE_URL}/users/me`, updated_user_data, 
            {
                headers: {
                    Authorization: `Bearer ${getCookie("access_token")}`,
                    'Content-Type': 'application/json'
                }
            });
        showSuccsessToast('Profile updated successfully');
    } catch (error) {
        if (error.response?.status === 401) {
            logout();
        } else {
            showErrorToast(error);
        }
    }
}

export async function updateUserAvatar (form_data) {
    try {
        await axios.put(`${API_BASE_URL}/users/me/avatar`, form_data, 
            {
                headers: {
                    Authorization: `Bearer ${getCookie("access_token")}`
                }
            });
        showSuccsessToast('Avatar updated successfully');
    } catch (error) {
        if (error.response?.status === 401) {
            logout();
        } else {
            showErrorToast(error);
        }
    }
}

export async function getUsersByQuery (search_query, limit=10) {
    try {
        const response = await axios.get(`${API_BASE_URL}/users/search?search_query=${search_query}&limit=${limit}`);
        const data = response.data;
        return data;
    } catch (error) {
        showErrorToast(error);
    }
}

export async function getUserById(user_id) {
    try {
        const response = await axios.get(`${API_BASE_URL}/users?users_ids=${user_id}`);
        const data = response.data;
        return data;
    } catch (error) {
        showErrorToast(error);
    }
}

export async function getUsersByIds(userIds) {
    try {
        const params = userIds.map(id => `users_ids=${id}`).join('&');
        const response = await axios.get(`${API_BASE_URL}/users?${params}`);
        const data = response.data;
        return data;
    } catch (error) {
        showErrorToast(error);
    }
}
