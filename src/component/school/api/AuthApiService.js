import { apiClient } from "./ApiClient";

export const executeJwtAuthService = (username, password) =>
  apiClient.post(`/authenticate`, { username, password });
