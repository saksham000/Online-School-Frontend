import { apiClient } from "./ApiClient";

export const findStudenById = (studentId) => {
  return apiClient.get(`/students/${studentId}`);
};
