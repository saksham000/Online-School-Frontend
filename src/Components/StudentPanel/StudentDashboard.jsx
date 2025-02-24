import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Video, Users, Clock, Book } from "lucide-react";
import { getStudentDetails } from "../../api/StudentApi";
import 'aos/dist/aos.css';
import Aos from "aos";
const StudentDashboard = () => {
  const [roomid, setRoomid] = useState("");
  const [subjects, setSubjects] = useState([]); // ✅ Initialize as an empty array
  const navigate = useNavigate();
  const { username } = useParams(); // ✅ Get student name from URL params

  // ✅ Fetch subjects when component mounts
  useEffect(() => {
    getStudentDetail();
        Aos.init({ duration: 1000 });
  }, []); // ✅ Run only once when the component loads

  // ✅ Function to fetch subjects from API
  const getStudentDetail = async () => {
    try {
      const response = await getStudentDetails(); // ✅ Await API response
      setSubjects(response.data.data.subjects); // ✅ Update state with subjects
    } catch (error) {
      console.error("Error fetching subjects:", error);
    }
  };

  // ✅ Handle join meeting button click
  const handleJoinMeeting = () => {
    if (!roomid) {
      alert("Please enter a valid Room ID!");
      return;
    }
    navigate(`/joinroom/${roomid}/${username}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 text-white">
      {/* Welcome Message */}
      <div className="text-center py-8">
        <h1 className="text-3xl font-bold" data-aos="fade-up">
          Welcome, <span className="text-purple-400">{username}</span> 🎉
        </h1>
        <p data-aos="fade-up" className="text-gray-400 mt-2">Let's get started with your classes!</p>
      </div>

      <div className="max-w-7xl mx-auto p-6">
        {/* Join Meeting Section */}
        <div className="flex flex-col items-center mb-10">
          <div className="flex items-center gap-4 bg-slate-700 p-4 rounded-lg shadow-lg">
            <input data-aos="fade-up"
              type="number"
              value={roomid}
              onChange={(e) => setRoomid(e.target.value)}
              placeholder="Enter Room ID"
              className="px-4 py-3 w-64 text-black border-2 border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <button data-aos="fade-up"
              onClick={handleJoinMeeting}
              className="px-6 py-3 bg-purple-600 text-white rounded-lg font-semibold text-lg shadow-lg hover:bg-purple-700 transition-all flex items-center gap-2"
            >
              <Video size={24} data-aos="fade-up" />
              Join Meeting
            </button>
          </div>
        </div>

        {/* Subjects Section */}
        <div>
          <h2 data-aos="fade-up" className="text-2xl font-bold text-white mb-6">Your Subjects</h2>
          <div data-aos="fade-up" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
            {subjects.length > 0 ? (
              subjects.map((subject) => (
                <div
                  key={subject.subjectId}
                  className="bg-gradient-to-br from-slate-700 to-slate-600 rounded-xl p-6 hover:from-slate-600 hover:to-slate-500 transition-all duration-300"
                >
                  <h3 className="text-xl font-semibold text-purple-400">
                    {subject.subjectName} {/* ✅ Display subject name */}
                  </h3>
                  <div className="space-y-3 mt-3 text-gray-300">
                    <div className="flex items-center gap-2">
                      <Users size={18} />
                      <span>Subject ID: {subject.subjectId}</span> {/* ✅ Show subject ID */}
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock size={18} />
                      <span>11:00 AM</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Book size={18} />
                      <span>Subject Name - {subject.subjectName} </span>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p data-aos="fade-up" className="text-gray-400 text-center">No subjects found.</p>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};

export default StudentDashboard;
