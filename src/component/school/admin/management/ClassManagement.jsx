import { useEffect, useState } from "react";
import {
  createNewClassService,
  deleteClassByIdService,
  fetchAllClasses,
} from "../../api/classService";

export default function ClassManagement() {
  const [classes, setClasses] = useState([]);
  const [className, setClassName] = useState("");
  const [shouldListClasses, setShouldListClasses] = useState(false);

  const listAllClasses = async () => {
    await fetchAllClasses().then((response) => {
      if (response.status === 200) {
        setClasses(response.data);
      }
    });
  };

  const createClass = async (e) => {
    e.preventDefault();
    await createNewClassService(className).then((response) => {
      if (response.status === 200) {
        alert("Class Created !");
        setShouldListClasses(true);
      }
    });
  };

  useEffect(() => {
    if (shouldListClasses) {
      listAllClasses();
      setShouldListClasses(false);
    }
  }, [shouldListClasses]);

  const deleteClass = async (classId) => {
    await deleteClassByIdService(classId).then((response) => {
      if (response.status === 200) {
        alert("Class is Deleted !");
        listAllClasses();
      }
    }).catch(()=>{
      alert("Inavlid ClassID")
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-fuchsia-500 to-lime-600">
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Classes Management</h1>
        <div>
          <div className="mb-4">
            <form onSubmit={createClass} className="flex flex-col space-y-2">
              <input
                type="text"
                value={className || ""}
                onChange={(e) => setClassName(e.target.value)}
                placeholder="Class Name"
                className="border p-2"
                required
              />
              <button
                type="submit"
                className="bg-blue-500 text-white p-2 rounded"
              >
                Create Class
              </button>
            </form>
          </div>
          <h1 className="text-2xl font-bold mb-4">List All Classes</h1>
          <button
            className="text-xl font-bold border border-black rounded hover:outline-none hover:ring-2 hover:ring-purple-500 p-4 m-5 mb-10 bg-green-400"
            onClick={listAllClasses}
            type="submit"
          >
            Click Here to List Classes
          </button>
          {classes.length === 0 ? (
            <p>No Classes available</p>
          ) : (
            <div>
              <table className="w-full">
                <thead className="bg-gradient-to-r from-orange-500 to-fuchsia-600 border-b-2 border-gray-200 w-full">
                  <tr>
                    <th className="w-20 p-3 font-semibold tracking-wide text-center text-2xl">
                      Class ID
                    </th>
                    <th className="w-20 p-3 font-semibold tracking-wide text-center text-2xl">
                      Class Name
                    </th>
                    <th className="w-20 p-3 font-semibold tracking-wide text-center text-2xl">
                      Teacher
                    </th>
                    {/* <th className="w-20 p-3 font-semibold tracking-wide text-center text-2xl">
                      Students
                    </th> */}
                    <th className="w-20 p-3 text-2xl font-semibold tracking-wide text-center">
                      Delete Class
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {classes.map((classs) => (
                    <tr
                      key={classs.classId}
                      className="bg-gradient-to-r from-orange-500 to-fuchsia-600"
                    >
                      <td className="p-3 text-black font-semibold text-xl whitespace-nowrap">
                        {classs.classId}
                      </td>
                      <td className="p-3 text-black font-semibold text-xl whitespace-nowrap">
                        {classs.className}
                      </td>
                      <td className="p-3 text-black font-semibold text-xl whitespace-nowrap">
                        {classs.teacher ? (
                          <div>
                            {classs.teacher.teacherName + " Emp Id: "}
                            {classs.teacher.assignedClassId}
                          </div>
                        ) : (
                          <span>No Teacher Allocated</span>
                        )}
                      </td>
                      {/* <td className="p-3 text-black font-semibold text-xl whitespace-nowrap">
                      {classs.students.length > 0 ? (
                          <ul>
                            {classs.students.map((classs) => (
                              <li key={classs.studentId}>
                                {classs.studentName + " " + "St Id "}
                                {classs.rollNumber}
                              </li>
                            ))}
                          </ul>
                        ) : (
                          <span>No Student Allocated</span>
                        )}
                      </td> */}
                      <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                        <button
                          className="p-3 bg-red-500 rounded-full font-semibold text-black border border-black hover:outline-none hover:ring-2 hover:ring-purple-500"
                          onClick={() => deleteClass(classs.classId)}
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
