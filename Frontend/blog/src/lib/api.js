import { getToken } from "./authStorage";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

export async function apiRequest(path, options = {}) {
  const { method = "GET", body, auth = false, headers = {} } = options;
  const requestHeaders = {
    ...headers,
  };

  if (body !== undefined) {
    requestHeaders["Content-Type"] = "application/json";
  }

  if (auth) {
    const token = getToken();
    if (token) {
      requestHeaders.Authorization = token;
    }
  }

  const response = await fetch(`${API_BASE_URL}${path}`, {
    method,
    headers: requestHeaders,
    body: body !== undefined ? JSON.stringify(body) : undefined,
  });

  const contentType = response.headers.get("content-type");
  const data = contentType && contentType.includes("application/json")
    ? await response.json()
    : null;

  if (!response.ok) {
    throw new Error(data?.message || "Something went wrong");
  }

  return data;
}

export async function forgotPassword(email) {
    return apiRequest('/auth/forgot-password', {
        method: 'POST',
        body: { email }
    })
}

export async function resetPassword({ email, otpCode, newPassword }) {
    return apiRequest('/auth/reset-password', {
        method: 'POST',
        body: { email, otpCode, newPassword }
    })
}

export async function signup(body) {
    return apiRequest('/auth/signup', { method: 'POST', body })
}

export async function login(body) {
    return apiRequest('/auth/login', { method: 'POST', body })
}

export async function verifyOtp(body) {
    return apiRequest('/auth/verify-otp', { method: 'POST', body })
}

export async function toggleLike(postId) {
    return apiRequest(`/posts/${postId}/like`, {
        method: 'POST',
        auth: true,
    })
}

export async function getLikedPosts() {
    return apiRequest('/posts/liked', {
        method: 'GET',
        auth: true,
    })
}
