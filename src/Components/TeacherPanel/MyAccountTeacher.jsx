import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  UserCircle,
  Lock,
  Key,
  AlertTriangle,
  Pencil,
  Check,
} from "lucide-react";
import {
  fetchTeacherDeatils,
  updateTeacher,
  deleteTeacher,
} from "../../api/TeacherApi"; // Assume these API functions are defined
import { useAuth } from "../../security/AuthContext";
import 'aos/dist/aos.css';
import Aos from "aos";
export default function MyAccountTeacher() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    teacherId: "",
    teacherName: "",
    password: "",
    assignedClassId: "",
  });
  const [editField, setEditField] = useState(null);
  const [isSaveEnabled, setIsSaveEnabled] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  useEffect(() => {
    handelGetDetails();
    Aos.init({ duration: 1000 });
  }, []); // Make sure useEffect runs only once

  const handelGetDetails = async () => {
    try {
      const response = await fetchTeacherDeatils();
      console.log(response);
      if (response?.data) {
        setFormData({
          teacherId: response.data.data.teacherId || "",
          teacherName: response.data.data.teacherName || "",
          password: response.data.data.teacherPassword || "",
          assignedClassId: response.data.data.assignedClassId || "", // Handle null or undefined assignedClassId
        });
      } else {
        console.error("No teacher data found");
      }
    } catch (error) {
      console.error("Error fetching teacher details:", error);
    }
  };

  const handleUpdate = async () => {
    if (!formData.teacherName.trim() || !formData.password.trim()) {
      alert("Teacher name and password cannot be empty.");
      return;
    }

    try {
      if (editField === "teacherName") {
        updateTeacher(formData.teacherName);
      } else if (editField === "teacherPassword") {
        updateTeacher(formData.password);
      } else await updateTeacher(formData.teacherName, formData.password);
      setEditField(null);
      setIsSaveEnabled(false);
      alert("Teacher details updated successfully!");

      if (editField === "teacherName") {
        alert("Your teacher name has changed. Please log in again.");
        logout();
        navigate("/login");
        window.location.reload();
      }
    } catch (error) {
      console.error("Error updating teacher details:", error);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteTeacher();
      alert("Account deleted successfully!");
      logout(); // ✅ Logout after deleting the account
      navigate("/login"); // ✅ Redirect to login page
      window.location.reload(); // ✅ Ensure navbar refreshes
    } catch (error) {
      console.error("Error deleting account:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-white to-blue-100 p-6">
      <div className="mx-auto max-w-2xl">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent" data-aos="fade-up">
            My Account
          </h1>
          <p className="text-gray-600 mt-2" data-aos="fade-up">
            Manage your teacher account details
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8 backdrop-blur-sm bg-opacity-80">
          <div className="space-y-6">
            {/* Teacher ID (Non-Editable) */}
            <div className="flex items-center space-x-4 p-4 rounded-lg bg-gray-50">
              <Key className="text-purple-600" data-aos="fade-up" />
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-600" data-aos="fade-up">
                  Teacher ID
                </label>
                <input
                  type="text" data-aos="fade-up"
                  value={formData.teacherId}
                  disabled
                  className="w-full bg-transparent border-none focus:outline-none text-gray-800"
                />
              </div>
            </div>

            {/* Teacher Name (Editable) */}
            <div className="flex items-center space-x-4 p-4 rounded-lg bg-gray-50">
              <UserCircle className="text-purple-600" data-aos="fade-up" />
              <div className="flex-1">
                <label data-aos="fade-up" className="block text-sm font-medium text-gray-600">
                  Teacher Name
                </label>
                <input
                  type="text" data-aos="fade-up"
                  value={formData.teacherName}
                  onChange={(e) => {
                    setFormData({ ...formData, teacherName: e.target.value });
                    setIsSaveEnabled(true);
                  }}
                  disabled={editField !== "teacherName"}
                  className="w-full bg-transparent border-none focus:outline-none text-gray-800"
                />
              </div>
              {editField === "teacherName" ? (
                <Check data-aos="fade-up"
                  className="text-green-600 cursor-pointer"
                  onClick={() => setEditField(null)}
                />
              ) : (
                <Pencil data-aos="fade-up"
                  className="text-gray-500 cursor-pointer"
                  onClick={() => setEditField("teacherName")}
                />
              )}
            </div>

            {/* Password (Editable) */}
            <div className="flex items-center space-x-4 p-4 rounded-lg bg-gray-50">
              <Lock data-aos="fade-up" className="text-purple-600" />
              <div className="flex-1">
                <label data-aos="fade-up" className="block text-sm font-medium text-gray-600">
                  Password
                </label>
                <input
                  type="password" data-aos="fade-up"
                  value={formData.password}
                  onChange={(e) => {
                    setFormData({ ...formData, password: e.target.value });
                    setIsSaveEnabled(true);
                  }}
                  disabled={editField !== "password"}
                  className="w-full bg-transparent border-none focus:outline-none text-gray-800"
                />
              </div>
              {editField === "password" ? (
                <Check data-aos="fade-up"
                  className="text-green-600 cursor-pointer"
                  onClick={() => setEditField(null)}
                />
              ) : (
                <Pencil data-aos="fade-up"
                  className="text-gray-500 cursor-pointer"
                  onClick={() => setEditField("password")}
                />
              )}
            </div>

            {/* Assigned Class ID (Non-Editable) */}
            <div className="flex items-center space-x-4 p-4 rounded-lg bg-gray-50">
              <Key className="text-purple-600" />
              <div className="flex-1">
                <label data-aos="fade-up" className="block text-sm font-medium text-gray-600">
                  Assigned Class ID
                </label>
                <input
                  type="text" data-aos="fade-up"
                  value={formData.assignedClassId || "N/A"} // Handle null values, show 'N/A' if null
                  disabled
                  className="w-full bg-transparent border-none focus:outline-none text-gray-800"
                />
              </div>
            </div>

            {/* Save & Delete Buttons */}
            <div className="flex justify-between pt-4">
              <button
                type="button" data-aos="fade-up"
                onClick={handleUpdate}
                disabled={!isSaveEnabled}
                className={`px-6 py-2 rounded-lg transition-opacity ${
                  isSaveEnabled
                    ? "bg-gradient-to-r from-green-600 to-teal-600 text-white hover:opacity-90"
                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                }`}
              >
                Save Changes
              </button>
              <button
                type="button" data-aos="fade-up"
                onClick={() => setShowDeleteModal(true)}
                className="px-6 py-2 bg-gradient-to-r from-red-600 to-pink-600 text-white rounded-lg hover:opacity-90 transition-opacity"
              >
                Delete Account
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full">
            <div className="flex items-center space-x-4 mb-4">
              <AlertTriangle className="text-red-600 h-8 w-8" />
              <h2 className="text-2xl font-bold text-gray-800">
                Delete Account
              </h2>
            </div>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete your teacher account? This action
              cannot be undone.
            </p>
            <div className="flex space-x-4">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="flex-1 px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="flex-1 px-4 py-2 bg-gradient-to-r from-red-600 to-pink-600 text-white rounded-lg hover:opacity-90 transition-opacity"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
