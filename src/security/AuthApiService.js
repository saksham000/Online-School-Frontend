import { apiClient } from "./ApiClient";

export const executeJwtAuthService = (username, password) =>
  apiClient.post(`/public/login-admin`, { username, password });
