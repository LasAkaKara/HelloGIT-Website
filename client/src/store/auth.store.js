import { reactive } from "vue";
import { jwtDecode } from "jwt-decode";

const state = reactive({user: null});

const initializeUser = () => {
    console.log("Initializing user...");
    const token = localStorage.getItem('token');
    console.log("Initializing user with token:", token);
    if (token) {
        try {
            const decoded = jwtDecode(token);
            state.user = {id: decoded.id, role: decoded.role};
            console.log("User initialized:", state.user);
        } catch (error) {
            console.error("Token decoding failed:", error);
            state.user = null;}
    } else {
        state.user = null;
    }
};

const logout = () => {
    localStorage.removeItem('token');
    state.user = null;
}

export const useAuthStore = () => {
    return { state, initializeUser, logout };
}
