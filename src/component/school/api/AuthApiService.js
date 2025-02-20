import { apiClient } from "./ApiClient";

export const executeJwtAuthService = (username, password) =>
  apiClient.post(`/login-admin`, { username, password });
