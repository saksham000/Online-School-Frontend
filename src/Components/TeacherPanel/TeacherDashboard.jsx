import { useNavigate } from 'react-router-dom';
import { Video, Users, BookOpen } from 'lucide-react';
import 'aos/dist/aos.css';
import Aos from 'aos';
import { useEffect } from 'react';
export default function TeacherDashboard() {
  const navigate = useNavigate();

  const startNewMeeting = () => {
    const teacherName = localStorage.getItem("loggedInUsername"); // Retrieve stored teacher name
    if (teacherName) {
      navigate(`/hostmeeting/${encodeURIComponent(teacherName)}`); // Pass name as param
    } else {
      alert("Teacher name not found! Please log in again.");
    }
  };

  const showClassDetails = () => {
    navigate('/myclass-teacher');
  };
  useEffect(() => {
    Aos.init({ duration: 1000 });
  }, []);
  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-100 via-white to-emerald-100 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-teal-600 to-emerald-600 bg-clip-text text-transparent" data-aos="fade-up">
            Teacher Dashboard
          </h1>
          <p data-aos="fade-up" className="text-gray-600 mt-2">Welcome back! Manage your classes and meetings</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Meeting Card */}
          <div data-aos="fade-up"
            className="bg-white rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
            onClick={startNewMeeting}
          >
            <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-r from-teal-500 to-emerald-500 rounded-full mb-6 mx-auto">
              <Video className="h-8 w-8 text-white" />
            </div>
            <h2 className="text-2xl font-semibold text-center text-gray-800 mb-4">
              Start New Meeting
            </h2>
            <p className="text-gray-600 text-center mb-6">
              Begin a new virtual class session with your students
            </p>
            <button
              className="w-full py-3 bg-gradient-to-r from-teal-500 to-emerald-500 text-white rounded-lg hover:opacity-90 transition-opacity flex items-center justify-center space-x-2"
            >
              <Video className="h-5 w-5" />
              <span>Start Meeting</span>
            </button>
          </div>

          {/* Class Details Card */}
          <div data-aos="fade-up"
            className="bg-white rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
            onClick={showClassDetails}
          >
            <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full mb-6 mx-auto">
              <Users className="h-8 w-8 text-white" />
            </div>
            <h2 className="text-2xl font-semibold text-center text-gray-800 mb-4">
              Class Details
            </h2>
            <p className="text-gray-600 text-center mb-6">
              View and manage your assigned classes and students
            </p>
            <button
              className="w-full py-3 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-lg hover:opacity-90 transition-opacity flex items-center justify-center space-x-2"
            >
              <BookOpen className="h-5 w-5" />
              <span>View Details</span>
            </button>
          </div>
        </div>

        {/* Quick Stats Section */}
        <div className="mt-12 bg-white rounded-2xl shadow-lg p-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-4" data-aos="fade-up">Quick Overview</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="p-4 rounded-lg bg-gradient-to-r from-teal-50 to-emerald-50">
              <div className="text-2xl font-bold text-teal-600" data-aos="fade-up">5</div>
              <div className="text-sm text-gray-600" data-aos="fade-up">Active Classes</div>
            </div>
            <div className="p-4 rounded-lg bg-gradient-to-r from-blue-50 to-indigo-50">
              <div className="text-2xl font-bold text-blue-600" data-aos="fade-up">150</div>
              <div className="text-sm text-gray-600" data-aos="fade-up">Total Students</div>
            </div>
            <div className="p-4 rounded-lg bg-gradient-to-r from-purple-50 to-pink-50">
              <div className="text-2xl font-bold text-purple-600" data-aos="fade-up">12</div>
              <div className="text-sm text-gray-600" data-aos="fade-up">Upcoming Sessions</div>
            </div>
            <div className="p-4 rounded-lg bg-gradient-to-r from-orange-50 to-rose-50">
              <div className="text-2xl font-bold text-orange-600" data-aos="fade-up">89%</div>
              <div className="text-sm text-gray-600" data-aos="fade-up">Attendance Rate</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
