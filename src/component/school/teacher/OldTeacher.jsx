import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { findTeacherById } from "../api/teacherService";

export default function OldTeacher() {
  const [teacherId, setTeacherId] = useState(null);
  const [teacherName, setTeacherName] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [assignedClassId, setAssignedClassId] = useState(null);
  const navigate = useNavigate();

  const handelTeacherCheck = async (e) => {
    e.preventDefault();
    await findTeacherById(teacherId)
      .then((response) => {
        if (response.status === 200) {
          const {
            teacherId: responseTeacherId,
            teacherName: responseTeacherName,
            assignedClassId: responseAssignedClassId,
          } = response.data;
          if (
            responseTeacherId === parseInt(teacherId) &&
            responseTeacherName === teacherName &&
            responseAssignedClassId === parseInt(assignedClassId)
          ) {
            navigate(`/assignedclass/${assignedClassId}`);
            setErrorMessage("");
          } else {
            setErrorMessage("User ID and Username does not matched");
          }
        }
      })
      .catch(() => {
        setErrorMessage("Invalid Teacher Id or Name !");
      });
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-r from-fuchsia-500 to-lime-600">
      <h1 className="text-2xl font-bold mb-4">Verify Existing Teacher</h1>
      <form onSubmit={handelTeacherCheck} className="w-full max-w-sm">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Teacher ID
          </label>
          <input
            id="teacherId"
            type="text"
            placeholder="Teacher Id"
            value={teacherId || ""}
            required
            onChange={(e) => setTeacherId(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Teacher Name
          </label>
          <input
            id="teacherName"
            type="text"
            placeholder="Teacher Name"
            required
            value={teacherName || ""}
            onChange={(e) => setTeacherName(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Assigned Class Id
          </label>
          <input
            id="assignedClassId"
            type="text"
            placeholder="Assigned Class Id"
            required
            value={assignedClassId || ""}
            onChange={(e) => setAssignedClassId(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded shadow"
        >
          Verify Teacher
        </button>
      </form>
      {errorMessage && (
        <div className="mt-4">
          <p className="text-red-800 bg-yellow-500 rounded-lg p-1">
            {errorMessage}
          </p>
        </div>
      )}
    </div>
  );
}
