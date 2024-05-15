import { baseUrl } from "../config";

export const TOKEN_KEY = "supreme/authentication/token";
export const SET_TOKEN = "supreme/authentication/SET_TOKEN";
export const REMOVE_TOKEN = "supreme/authentication/REMOVE_TOKEN";

const removeToken = () => ({ type: REMOVE_TOKEN });
const setToken = (payload) => {
    return { type: SET_TOKEN, payload };
};

export const loadToken = () => (dispatch) => {
    const token = window.localStorage.getItem(TOKEN_KEY);
    const user = window.localStorage.getItem("supreme/authentication/USER_ID");
    const firstName = window.localStorage.getItem("supreme/authentication/firstName");
    const lastName = window.localStorage.getItem("supreme/authentication/lastName");
    if (token) {
        dispatch(setToken({ token, user, firstName, lastName }));
    }
};

export const createUser = (firstName, lastName, email, password) => async dispatch => {
    try {
        const response = await fetch(`${baseUrl}/api/users`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ firstName, lastName, email, password }),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const payload = await response.json();
        window.localStorage.setItem(TOKEN_KEY, payload.access_token);
        window.localStorage.setItem("supreme/authentication/USER_ID", payload.user.id);
        window.localStorage.setItem("supreme/authentication/firstName", payload.user.firstName);
        window.localStorage.setItem("supreme/authentication/lastName", payload.user.lastName);
        dispatch(setToken(payload));
    } catch (error) {
        console.error('Failed to create user:', error);
    }
};

export const login = (email, password) => async dispatch => {
    try {
        const response = await fetch(`${baseUrl}/api/users/session`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const payload = await response.json();
        window.localStorage.setItem(TOKEN_KEY, payload.access_token);
        window.localStorage.setItem("supreme/authentication/USER_ID", payload.user.id);
        window.localStorage.setItem("supreme/authentication/firstName", payload.user.firstName);
        window.localStorage.setItem("supreme/authentication/lastName", payload.user.lastName);
    } catch (error) {
        console.error('Failed to log in:', error);
    }
};

export const logout = () => (dispatch) => {
    window.localStorage.removeItem(TOKEN_KEY);
    window.localStorage.removeItem("supreme/authentication/USER_ID");
    window.localStorage.removeItem("supreme/authentication/firstName");
    window.localStorage.removeItem("supreme/authentication/lastName");
    window.localStorage.removeItem("supreme/cart");
    dispatch(removeToken());
    window.location.href = "/";
};
