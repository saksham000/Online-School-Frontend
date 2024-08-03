import { useState } from "react";
import {
  assigneClassToTeacherService,
  createNewTeacher,
  deleteTeacherByIdService,
  fetchAllTeachers,
} from "../../api/teacherService";

export default function TeacherManagement() {
  const [teachers, setTeachers] = useState([]);
  const [teacherName, setTeacherName] = useState("");
  const [classId, setClassId] = useState(null);
  const [teacherId, setTeacherId] = useState(null);

  const listAllTeachers = async () => {
    await fetchAllTeachers().then((response) => {
      if (response.status === 200) {
        setTeachers(response.data);
      }
    });
  };

  const createTeacher = async (e) => {
    e.preventDefault();
    await createNewTeacher(teacherName).then((response) => {
      if (response.status === 200) {
        alert("Teacher is Created !");
        listAllTeachers();
      }
    });
  };

  const assigneClassToTeacher = async (e) => {
    e.preventDefault();
    await assigneClassToTeacherService(classId, teacherId).then((response) => {
      if (response.status === 200) {
        alert("Class Assigned to Teacher !");
        listAllTeachers();
      }
    }).catch(()=>{
      alert("Inavlid ClassId or TeacherId")
    });
  };

  const deleteTeacher = async (tId) => {
    await deleteTeacherByIdService(tId).then((response) => {
      if (response.status === 200) {
        alert("Teacher Deleted !");
        listAllTeachers();
      }
    }).catch(()=>{
      alert("Inavlid Teacher ID")
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-fuchsia-500 to-lime-600">
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4 bg-green-500 p-3">
          Teacher Management
        </h1>
        <div className="mb-4">
          <h1 className="text-2xl font-bold mb-4">Create New Teacher</h1>

          <form onSubmit={createTeacher} className="flex flex-col space-y-2">
            <input
              type="text"
              value={teacherName}
              onChange={(e) => setTeacherName(e.target.value)}
              placeholder="Teacher Name"
              className="border p-2"
              required
            />
            <button
              type="submit"
              className="bg-blue-500 text-white p-2 rounded"
            >
              Add Teacher
            </button>
          </form>
        </div>

        <div>
          <h1 className="text-2xl font-bold mb-4">Assigne Class to Teacher</h1>
          <div className="mb-4">
            <form
              onSubmit={assigneClassToTeacher}
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
                value={teacherId}
                onChange={(e) => setTeacherId(e.target.value)}
                placeholder="Teacher Id"
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
          <button
            className="text-xl font-bold border border-black rounded hover:outline-none hover:ring-2 hover:ring-purple-500 p-4 m-5 mb-10 bg-green-400"
            onClick={listAllTeachers}
            type="submit"
          >
            Click Here to List Teachers
          </button>
          {teachers.length === 0 ? (
            <p>No Teacher available</p>
          ) : (
            <div>
              <table className="w-full">
                <thead className="bg-gradient-to-r from-orange-500 to-fuchsia-600 border-b-2 border-gray-200 w-full">
                  <tr>
                    <th className="w-20 p-3 font-semibold tracking-wide text-center text-2xl">
                      Teacher ID
                    </th>
                    <th className="w-20 p-3 font-semibold tracking-wide text-center text-2xl">
                      Teacher Name
                    </th>
                    <th className="w-20 p-3 font-semibold tracking-wide text-center text-2xl">
                      Assigned Class
                    </th>
                    <th className="w-20 p-3 text-2xl font-semibold tracking-wide text-center">
                      Delete Teacher
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {teachers.map((teacher) => (
                    <tr
                      key={teacher.teacherId}
                      className="bg-gradient-to-r from-orange-500 to-fuchsia-600"
                    >
                      <td className="p-3 text-black font-semibold text-xl whitespace-nowrap">
                        {teacher.teacherId}
                      </td>
                      <td className="p-3 text-black font-semibold text-xl whitespace-nowrap">
                        {teacher.teacherName}
                      </td>
                      <td className="p-3 text-black font-semibold text-xl whitespace-nowrap">
                        {teacher.assignedClassId}
                      </td>
                      <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                        <button
                          className="p-3 bg-red-500 rounded-full font-semibold text-black border border-black hover:outline-none hover:ring-2 hover:ring-purple-500"
                          onClick={() => deleteTeacher(teacher.teacherId)}
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
