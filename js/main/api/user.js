import {API_BASE_URL} from "../../config.js";
import { getCookie } from "../utils.js";
import {showSuccsessToast, showErrorToast} from "../../toasts.js";

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
        showErrorToast(error);
    }
}