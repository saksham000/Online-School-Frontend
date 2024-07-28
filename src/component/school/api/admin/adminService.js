import { apiClient } from "../ApiClient";

export const loginAdmin = (adminId, adminName, adminPassword) => {
  return apiClient.post(`admin/login`, { adminId, adminName, adminPassword });
};
