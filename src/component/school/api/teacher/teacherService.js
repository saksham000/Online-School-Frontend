import { apiClient } from "../ApiClient";

export const findTeacherById = (teacherId) => {
  return apiClient.get(`/teachers/${teacherId}`);
};
