const TOKEN_KEY = "token";
const PENDING_EMAIL_KEY = "pendingEmail";
const PENDING_OTP_KEY = "pendingOtp";

const hasStorage = () => typeof window !== "undefined";

const USER_KEY = "zaira_user";

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
