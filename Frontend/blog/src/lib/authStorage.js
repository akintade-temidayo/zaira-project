// authstorage.js
const TOKEN_KEY = "token";
const PENDING_EMAIL_KEY = "pendingEmail";
const PENDING_OTP_KEY = "pendingOtp";
const ADMIN_KEY = "zaira_isAdmin";
const USER_KEY = "zaira_user";

const hasStorage = () => typeof window !== "undefined";

// --- Token Management (Session Storage) ---
export const saveToken = (token) => {
    if (hasStorage() && token) sessionStorage.setItem(TOKEN_KEY, token);
};

export const getToken = () => {
    if (!hasStorage()) return null;
    return sessionStorage.getItem(TOKEN_KEY);
};

export const removeToken = () => {
    if (hasStorage()) sessionStorage.removeItem(TOKEN_KEY);
};

// --- OTP / Auth Flow Management (Session Storage) ---
export const savePendingEmail = (email) => {
    if (hasStorage() && email) sessionStorage.setItem(PENDING_EMAIL_KEY, email);
};

export const getPendingEmail = () => {
    if (!hasStorage()) return null;
    return sessionStorage.getItem(PENDING_EMAIL_KEY);
};

export const clearPendingEmail = () => {
    if (hasStorage()) sessionStorage.removeItem(PENDING_EMAIL_KEY);
};

export const savePendingOtp = (otpCode) => {
    if (hasStorage() && otpCode) sessionStorage.setItem(PENDING_OTP_KEY, otpCode);
};

export const getPendingOtp = () => {
    if (!hasStorage()) return null;
    return sessionStorage.getItem(PENDING_OTP_KEY);
};

export const clearPendingOtp = () => {
    if (hasStorage()) sessionStorage.removeItem(PENDING_OTP_KEY);
};

// --- Active User Account Management (Local Storage) ---
export const saveUser = (user) => {
    if (hasStorage() && user) {
        localStorage.setItem(USER_KEY, JSON.stringify(user));
    }
};

export const getUser = () => {
    if (!hasStorage()) return null;
    const stored = localStorage.getItem(USER_KEY);
    return stored ? JSON.parse(stored) : null;
};

export const removeUser = () => {
    if (hasStorage()) localStorage.removeItem(USER_KEY);
};

/**
 * Helper to update specific fields on the logged-in user (e.g., updating their bio or picture)
 */
export const updateUserFields = (updatedFields) => {
    if (!hasStorage()) return;
    const currentUser = getUser();
    if (currentUser) {
        const newUserData = { ...currentUser, ...updatedFields };
        saveUser(newUserData);
    }
};

// --- Admin Authorization Flags ---
export const saveIsAdmin = (val) => {
    if (hasStorage()) localStorage.setItem(ADMIN_KEY, String(val));
};

export const getIsAdmin = () => {
    if (!hasStorage()) return false;
    return localStorage.getItem(ADMIN_KEY) === 'true';
};

export const removeIsAdmin = () => {
    if (hasStorage()) localStorage.removeItem(ADMIN_KEY);
};

/**
 * Destroys all session traces on logout
 */
export const clearAllSession = () => {
    if (!hasStorage()) return;
    sessionStorage.clear();
    localStorage.removeItem(USER_KEY);
    localStorage.removeItem(ADMIN_KEY);
};