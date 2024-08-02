import { apiClient } from "./ApiClient";

export const findTeacherById = (teacherId) => {
  return apiClient.get(`/teachers/${teacherId}`);
};

export const fetchAllTeachers = () => {
  return apiClient.get(`/teachers`);
};

export const createNewTeacher = (teacherName) => {
  return apiClient.post(`/teachers`, { teacherName });
};

export const deleteTeacherByIdService = (tId) => {
  return apiClient.delete(`/teachers/${tId}`);
};

export const assigneClassToTeacherService = (classId, teacherId) => {
  return apiClient.get(
    `/teachers/assigneclass/${classId}/teacher/${teacherId}`
  );
};
