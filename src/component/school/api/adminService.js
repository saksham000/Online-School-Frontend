import { apiClient } from "./ApiClient";

export const loginAdmin = (adminId, adminName, adminPassword) => {
  return apiClient.post(`/admin/login`, { adminId, adminName, adminPassword });
};

export const createNewAdmin = (adminName, adminPassword) => {
  return apiClient.post(`/admin`, { adminName, adminPassword });
};

export const fetchAllAdmins = () => {
  return apiClient.get(`/admin`);
};

export const deleteAdminById = (adminId)=>{
  return apiClient.delete(`/admin/${adminId}`)
}