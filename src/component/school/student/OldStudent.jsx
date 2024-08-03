import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { findStudenById } from "../api/studentService";

export default function OldStudent() {
  const [studentId, setStudentId] = useState(null);
  const [studentName, setStudentName] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handelStudentCheck = async (e) => {
    e.preventDefault();
    await findStudenById(studentId)
      .then((response) => {
        if (response.status === 200) {
          const {
            studentId: responseStudentId,
            studentName: responseStudentName,
          } = response.data;
          if (
            responseStudentId === parseInt(studentId) &&
            responseStudentName === studentName
          ) {
            navigate(`/studentclass/${responseStudentId}`);
            setErrorMessage("");
          } else {
            setErrorMessage("User ID and Username does not matched");
          }
        } else {
          alert("Invalid Server Error");
        }
      })
      .catch(() => {
        setErrorMessage("Invalid Student Id or Name !");
      });
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-r from-fuchsia-500 to-lime-600">
      <h1 className="text-2xl font-bold mb-4">Verify Existing Student</h1>
      <form onSubmit={handelStudentCheck} className="w-full max-w-sm">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Student ID
          </label>
          <input
            id="studentId"
            type="text"
            placeholder="Student Id"
            value={studentId || ""}
            required
            onChange={(e) => setStudentId(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Student Name
          </label>
          <input
            id="studentName"
            type="text"
            placeholder="Student Name"
            required
            value={studentName || ""}
            onChange={(e) => setStudentName(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded shadow"
        >
          Verify Student
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
