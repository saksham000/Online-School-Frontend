import { apiClient } from "../security/ApiClient";

export const createStudent = (studentName, studentPassword) => {
  return apiClient.post(`/student/create-student`, {
    studentName,
    studentPassword,
  });
};

export const getStudentDetails = () => {
  return apiClient.get(`/student/get-student-details`);
};

export const updateStudent = (studentName, studentPassword) => {
  return apiClient.put(`/student/update-student`, {
    studentName,
    studentPassword,
  });
};

export const deleteStudent = () => {
  return apiClient.delete(`/student/delete-student`);
};
