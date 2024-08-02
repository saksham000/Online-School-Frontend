import { apiClient } from "./ApiClient";

export const findClassById = (classId) => {
  return apiClient.get(`/classes/${classId}`);
};

export const fetchAllClasses = () => {
  return apiClient.get(`/classes`);
};

export const deleteClassByIdService = (classId) => {
  return apiClient.delete(`/classes/${classId}`);
};

export const createNewClassService = (className) => {
  return apiClient.post(`/classes`, { className });
};

export const assigneClassToStudentService = (classId, studentId) => {
  return apiClient.get(`/classes/assigne/${classId}/student/${studentId}`);
};
