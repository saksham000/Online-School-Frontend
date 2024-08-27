import { useEffect, useRef, useState } from "react";
import { findClassById } from "../api/classService";
import { useNavigate, useParams } from "react-router-dom";

export default function AssignedClass() {
  const [subjects, setSubjects] = useState([]);
  const [error, setError] = useState("");
  const [teachername, setTeacherName] = useState("");
  const [teacherid, setTeacherId] = useState(null);
  const { assignedClassId } = useParams();
  const navigate = useNavigate();
  const fetchCalledRef = useRef(false);

  const fetchClassData = async () => {
    try {
      await findClassById(assignedClassId).then((response) => {
        if (response.status === 200) {
          const responseData = response.data;
          const allSubjects = responseData.students.flatMap(
            (student) => student.subjects
          );
          const { teacherName: teachername, teacherId: teacherid } =
            responseData.teacher;
          setTeacherName(teachername);
          setTeacherId(teacherid);
          setSubjects(allSubjects);
          setError("");
        }
      });
    } catch (error) {
      setError("Invalid Class Id !");
    }
  };
  const handelNewMeetingButton = () => {
    navigate(`/hostmeeting/${teachername}/${teacherid}`);
  };

  useEffect(() => {
    if (!fetchCalledRef.current) {
      fetchClassData();
      fetchCalledRef.current = true;
    }
  },[]);

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
                      onClick={handelNewMeetingButton}
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
