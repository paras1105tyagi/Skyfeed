import axios from "axios";

const API_BASE_URL = "http://localhost:3000/api/v1";

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
});

apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("skyfeed_token");
  if (token) {
    config.headers = config.headers || {};
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const setAuthToken = (token) => {
  if (token) {
    localStorage.setItem("skyfeed_token", token);
  } else {
    localStorage.removeItem("skyfeed_token");
  }
};

export const getAuthToken = () => localStorage.getItem("skyfeed_token");

export const decodeJwt = (token) => {
  try {
    const payload = token.split(".")[1];
    const decoded = JSON.parse(atob(payload.replace(/-/g, "+").replace(/_/g, "/")));
    return decoded;
  } catch (e) {
    return null;
  }
};


