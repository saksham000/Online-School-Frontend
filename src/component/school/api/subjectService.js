import { apiClient } from "./ApiClient";

export const assigneSubjectToStudentService = (stId, subjectName) => {
  return apiClient.post(`students/assigne/subject/${stId}`, { subjectName });
};

export const deleteSubjectByIdService = (studentId, subjectId) => {
  return apiClient.delete(`students/assigned/subjects/${studentId}/${subjectId}`);
};
