import { apiClient } from "./ApiClient";

export const findClassById = (classId) => {
  return apiClient.get(`/classes/${classId}`);
};
