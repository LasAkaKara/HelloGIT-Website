import { jwtDecode } from "jwt-decode";
import apiClient from "./index.api.js";

export const login = async (email, password) => {
    try {
        const response = await apiClient.post('/auth/login', { email, password });
        localStorage.setItem('token', response.data.token);
        return jwtDecode(response.data.token);
    }catch (error) {
        console.error("Login failed:", error);
        throw error;
    }
}