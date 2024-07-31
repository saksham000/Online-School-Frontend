import { apiClient } from "./ApiClient";

export const findStudenById = (studentId) => {
  return apiClient.get(`/students/${studentId}`);
};

export const fetchAllStudents = () => {
  return apiClient.get(`/students`);
};

export const createNewStudent = (studentName) => {
  return apiClient.post(`students`, { studentName });
};

export const deleteStudentByIdService = (studentId) => {
  return apiClient.delete(`/students/${studentId}`);
};
