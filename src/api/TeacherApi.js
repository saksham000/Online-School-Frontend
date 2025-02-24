import { apiClient } from "../security/ApiClient";

export const createTeacher = (teacherName, teacherPassword) => {
  return apiClient.post(`/teacher/create-teacher`, {
    teacherName,
    teacherPassword,
  });
};

export const fetchTeacherDeatils = () => {
  return apiClient.get(`/teacher/get-teacher-details`);
};

export const deleteTeacher = () => {
  return apiClient.delete(`/teacher/delete-teacher`);
};

export const updateTeacher = (teacherName, teacherPassword) => {
  return apiClient.put(`/teacher/update-teacher`, {
    teacherName,
    teacherPassword,
  });
};
