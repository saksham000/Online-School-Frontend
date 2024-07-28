import { useState } from "react";
import { findClassById } from "../api/classService";

export default function AssignedClass() {
  const [classId, setClassId] = useState(null);
  const [subjects, setSubjects] = useState([]);
  const [error, setError] = useState("");

  const fetchClassData = async (e) => {
    e.preventDefault();
    try {
      await findClassById(classId).then((response) => {
        if (response.status === 200) {
          const responseData = response.data;
          const allSubjects = responseData.students.flatMap(
            (student) => student.subjects
          );
          setSubjects(allSubjects);
          setError("");
        }
      });
    } catch (error) {
      setError("Invalid Class Id !");
    }
  };

  return (
    <div className="h-screen p-4 bg-gradient-to-r from-fuchsia-500 to-lime-600">
      <h1 className="text-2xl mb-4">Class Subjects</h1>
      <input
        type="text"
        placeholder="Enter Class ID"
        value={classId || ""}
        onChange={(e) => setClassId(e.target.value)}
        className="border p-2 mb-4"
      />
      <button
        onClick={fetchClassData}
        className="bg-blue-500 text-white p-2 mb-4 ml-4 rounded-full"
      >
        Fetch Class Data
      </button>

      {error && (
        <div className="text-red-600 text-lg bg-yellow-500 rounded-lg p-2 font-semibold max-w-screen-sm m-1 mb-4 ml-96">
          {error}
        </div>
      )}
      {subjects.length === 0 ? (
        <p>No Subjects Found</p>
      ) : (
        <div>
          <table className="w-full ">
            <thead className="bg-gradient-to-r from-orange-500 to-fuchsia-600 border-b-2 border-gray-200 w-full">
              <tr>
                <th className="w-20 p-3 font-semibold tracking-wide text-center text-2xl">
                  Subject ID
                </th>
                <th className="w-20 p-3 text-2xl font-semibold tracking-wide text-center">
                  Subject Name
                </th>
                <th className="w-20 p-3 text-2xl font-semibold tracking-wide text-center">
                  Start Metting ?
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-red-400 ">
              {subjects.map((subject) => (
                <tr
                  key={subject.subjectId}
                  className="bg-gradient-to-r from-orange-500 to-fuchsia-600"
                >
                  <td className="p-3 text-black font-semibold text-xl whitespace-nowrap">
                    {subject.subjectId}
                  </td>
                  <td className="p-3 text-black font-semibold text-xl whitespace-nowrap">
                    {subject.subjectName}
                  </td>
                  <td className="p-3 text-lg text-black font-semibold whitespace-nowrap">
                    <button
                      className="p-3 bg-green-500 rounded-full font-semibold text-black border border-purple-500 hover:outline-none hover:ring-2 hover:ring-purple-500"
                      // onClick={() => deleteUser(user.userId)}
                    >
                      Start Metting
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
