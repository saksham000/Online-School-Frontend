import { useState } from "react";
import {
  createNewStudent,
  deleteStudentByIdService,
  fetchAllStudents,
} from "../../api/studentService";
import {
  assigneSubjectToStudentService,
  deleteSubjectByIdService,
} from "../../api/subjectService";
import { assigneClassToStudentService } from "../../api/classService";

export default function StudentManagement() {
  const [students, setStudents] = useState([]);
  const [studentName, setStudentName] = useState("");
  const [stId, setStId] = useState(null);
  const [studentId, setStudentId] = useState(null);
  const [classStudentId, setClassStudentId] = useState(null);
  const [subId, setSubId] = useState(null);
  const [subjectName, setSubjectName] = useState("");
  const [classId, setClassId] = useState(null);

  const listAllStudents = async () => {
    await fetchAllStudents().then((response) => {
      if (response.status === 200) {
        setStudents(response.data);
      }
    });
  };

  const createStudent = async (e) => {
    e.preventDefault();
    await createNewStudent(studentName).then((response) => {
      if (response.status === 200) {
        alert("Student is Created !");
        listAllStudents();
      }
    });
  };

  const deleteStudentById = async (studentId) => {
    await deleteStudentByIdService(studentId).then((response) => {
      if (response.status === 200) {
        alert("Student is Deleted !");
        listAllStudents();
      }
    }).catch(()=>{
      alert("Invalid Student Id !");
    });
  };

  const assigneSubjectToStudent = async (e) => {
    e.preventDefault();
    await assigneSubjectToStudentService(studentId, subjectName).then(
      (response) => {
        if (response.status === 200) {
          alert("Subject is Assigned !");
          listAllStudents();
        }
      }
    ).catch(()=>{
      alert("Inavlid Student Id");
    });
  };

  const assigenClassStudent = async (e) => {
    e.preventDefault();
    await assigneClassToStudentService(classId, classStudentId)
      .then((response) => {
        if (response.status === 200) {
          alert("Class is Assigned To Student !");
          listAllStudents();
        }
      }).catch(() => {
        alert("Invalid ClassId or StudentId");
      });
  };

  const deleteSubjectOfStudentById = async (e) => {
    e.preventDefault();
    await deleteSubjectByIdService(stId, subId).then((response) => {
      if (response.status === 200) {
        alert("Subject is Deleted !");
        listAllStudents();
      }
    }).catch(()=>{
      alert("Invalid SubjectId or StudentId")
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-fuchsia-500 to-lime-600">
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4 bg-green-500 p-3">
          Student Management
        </h1>
        <div className="mb-4">
          <h1 className="text-2xl font-bold mb-4">Create New Students</h1>

          <form onSubmit={createStudent} className="flex flex-col space-y-2">
            <input
              type="text"
              value={studentName}
              onChange={(e) => setStudentName(e.target.value)}
              placeholder="Student Name"
              className="border p-2"
              required
            />
            <button
              type="submit"
              className="bg-blue-500 text-white p-2 rounded"
            >
              Add Student
            </button>
          </form>
        </div>
        <div>
          <h1 className="text-2xl font-bold mb-4">
            Assigne Subject to Student
          </h1>
          <div className="mb-4">
            <form
              onSubmit={assigneSubjectToStudent}
              className="flex flex-col space-y-2"
            >
              <input
                type="text"
                value={studentId || ""}
                onChange={(e) => setStudentId(e.target.value)}
                placeholder="Student Id"
                className="border p-2"
                required
              />
              <input
                type="text"
                value={subjectName}
                onChange={(e) => setSubjectName(e.target.value)}
                placeholder="Subject Name"
                className="border p-2"
                required
              />
              <button
                type="submit"
                className="bg-blue-500 text-white p-2 rounded"
              >
                Assigne Subject
              </button>
            </form>
          </div>

          <h1 className="text-2xl font-bold mb-4">Assigne Class to Student</h1>
          <div className="mb-4">
            <form
              onSubmit={assigenClassStudent}
              className="flex flex-col space-y-2"
            >
              <input
                type="text"
                value={classId || ""}
                onChange={(e) => setClassId(e.target.value)}
                placeholder="Class Id"
                className="border p-2"
                required
              />
              <input
                type="text"
                value={classStudentId}
                onChange={(e) => setClassStudentId(e.target.value)}
                placeholder="Student Id"
                className="border p-2"
                required
              />
              <button
                type="submit"
                className="bg-blue-500 text-white p-2 rounded"
              >
                Assigne Subject
              </button>
            </form>
          </div>

          <h1 className="text-2xl font-bold mb-4">Delete Assigned Subject</h1>
          <div className="mb-4">
            <form
              onSubmit={deleteSubjectOfStudentById}
              className="flex flex-col space-y-2"
            >
              <input
                type="text"
                value={subId || ""}
                onChange={(e) => setSubId(e.target.value)}
                placeholder="Subject Id"
                className="border p-2"
                required
              />
              <input
                type="text"
                value={stId || ""}
                onChange={(e) => setStId(e.target.value)}
                placeholder="Student Id"
                className="border p-2"
                required
              />

              <button
                type="submit"
                className="bg-blue-500 text-white p-2 rounded"
              >
                Delete Subject
              </button>
            </form>
          </div>
          <button
            className="text-xl font-bold border border-black rounded hover:outline-none hover:ring-2 hover:ring-purple-500 p-4 m-5 mb-10 bg-green-400"
            onClick={listAllStudents}
            type="submit"
          >
            Click Here to List Students
          </button>
          {students.length === 0 ? (
            <p>No Student available</p>
          ) : (
            <div>
              <table className="w-full">
                <thead className="bg-gradient-to-r from-orange-500 to-fuchsia-600 border-b-2 border-gray-200 w-full">
                  <tr>
                    <th className="w-20 p-3 font-semibold tracking-wide text-center text-2xl">
                      Student ID
                    </th>
                    <th className="w-20 p-3 font-semibold tracking-wide text-center text-2xl">
                      Student Name
                    </th>
                    <th className="w-20 p-3 font-semibold tracking-wide text-center text-2xl">
                      Roll Number
                    </th>
                    <th className="w-20 p-3 font-semibold tracking-wide text-center text-2xl">
                      Assigned Class
                    </th>
                    <th className="w-20 p-3 font-semibold tracking-wide text-center text-2xl">
                      Subjects
                    </th>
                    <th className="w-20 p-3 text-2xl font-semibold tracking-wide text-center">
                      Delete Student
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {students.map((student) => (
                    <tr
                      key={student.studentId}
                      className="bg-gradient-to-r from-orange-500 to-fuchsia-600"
                    >
                      <td className="p-3 text-black font-semibold text-xl whitespace-nowrap">
                        {student.studentId}
                      </td>
                      <td className="p-3 text-black font-semibold text-xl whitespace-nowrap">
                        {student.studentName}
                      </td>
                      <td className="p-3 text-black font-semibold text-xl whitespace-nowrap">
                        {student.rollNumber}
                      </td>
                      <td className="p-3 text-black font-semibold text-xl whitespace-nowrap">
                        {student.assignedClassId}
                      </td>
                      <td className="p-3 text-black font-semibold text-xl whitespace-nowrap">
                        {student.subjects.length > 0 ? (
                          <ul>
                            {student.subjects.map((subject) => (
                              <li key={subject.subjectId}>
                                {subject.subjectId + " "}
                                {subject.subjectName}
                              </li>
                            ))}
                          </ul>
                        ) : (
                          <span>No subjects</span>
                        )}
                      </td>
                      <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                        <button
                          className="p-3 bg-red-500 rounded-full font-semibold text-black border border-black hover:outline-none hover:ring-2 hover:ring-purple-500"
                          onClick={() => deleteStudentById(student.studentId)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
