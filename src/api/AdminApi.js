import { apiClient } from "../security/ApiClient";

export const getAllAdmin = () => {
  return apiClient.get(`/admin/all-admin`);
};

export const deleteAdminById = (id) => {
  return apiClient.delete(`/admin/delete-admin-id/${id}`);
};

export const createAdmin = (adminName, adminPassword) => {
  return apiClient.post(`/admin/create-admin`, { adminName, adminPassword });
};

export const getAdminDetails = () => {
  return apiClient.get(`/admin/get-admin-details`);
};

export const updateAdmin = (adminName, adminPassword) => {
  return apiClient.put(`/admin/update-admin`, { adminName, adminPassword });
};

export const deleteAdmin = () => {
  return apiClient.delete(`/admin/delete-admin`);
};
