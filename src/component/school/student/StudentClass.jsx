import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { findStudenById } from "../api/studentService";

export default function StudentClass() {
  const [subjects, setSubjects] = useState([]);
  const [error, setError] = useState();
  const [roomId, setRoomId] = useState({});
  const [studentname, setStudentName] = useState();
  const [studentRollNumber, setStudentRollNumber] = useState(null);
  const { studentId } = useParams();
  const navigate = useNavigate();

  const fetchCalledRef = useRef(false);

  const fetchStudentSubjects = async () => {
    try {
      await findStudenById(studentId).then((response) => {
        if (response.status === 200) {
          console.log(response.data);
          const { studentName: studentname, rollNumber: studentRollNumber } =
            response.data;
          setStudentRollNumber(studentRollNumber);
          setStudentName(studentname);
          const responseData = response.data;
          setSubjects(responseData.subjects);
          setError("");
        }
      });
    } catch (error) {
      setError("Invalid Class Id !");
    }
  };

  const joinRoomHandelar = (subjectId) => {
    const id = roomId[subjectId];
    if (!id) {
      alert("Please enter a room ID!");
      return;
    }
    navigate(
      `/studentjoinroom/${studentname}/${studentRollNumber}/${roomId[subjectId]}`
    );
  };

  const handleRoomIdChange = (subjectId, value) => {
    setRoomId((prevRoomIds) => ({
      ...prevRoomIds,
      [subjectId]: value,
    }));
  };

  useEffect(() => {
    if (!fetchCalledRef.current) {
      fetchStudentSubjects();
      fetchCalledRef.current = true;
    }
  });

  return (
    <div className="h-screen p-4 bg-gradient-to-r from-fuchsia-500 to-lime-600">
      <h1 className="text-2xl mb-4">Class Subjects</h1>

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
                  Join Metting ?
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
                    <input
                      id="roomId"
                      type="number"
                      placeholder="Room Id"
                      value={roomId[subject.subjectId] || ""}
                      required
                      onChange={(e) =>
                        handleRoomIdChange(subject.subjectId, e.target.value)
                      }
                      className="shadow appearance-none border rounded w-32 mr-2 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                    <button
                      className="p-3 bg-green-500 rounded-lg font-semibold text-black border border-purple-500 hover:outline-none hover:ring-2 hover:ring-purple-500"
                      onClick={() => joinRoomHandelar(subject.subjectId)}
                    >
                      Join
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
