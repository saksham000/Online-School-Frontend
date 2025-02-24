import React, { useState, useEffect } from "react";
import {
  deleteStudent,
  getStudentDetails,
  updateStudent,
} from "../../api/StudentApi"; // Assume these functions are defined
import { useAuth } from "../../security/AuthContext";
import { useNavigate } from "react-router-dom";
import 'aos/dist/aos.css';
import Aos from "aos";

function MyAccountStudent() {
  const [formData, setFormData] = useState({
    studentId: "",
    studentName: "",
    studentPassword: "",
    assignedClassId: "",
  });
  const { logout } = useAuth();
  const [editField, setEditField] = useState(null); // Track which field is being edited
  const [isSaveEnabled, setIsSaveEnabled] = useState(false); // To enable/disable the save button
  const [showDeleteModal, setShowDeleteModal] = useState(false); // To show delete confirmation modal
  const navigate = useNavigate();
  // Fetch student details on component mount
  useEffect(() => {
    handleGetDetails();
    Aos.init({ duration: 1000 });
  }, []);

  // Fetch student details function
  const handleGetDetails = async () => {
    try {
      const response = await getStudentDetails();
      const data = response?.data;
      if (data) {
        setFormData({
          studentId: data.data.studentId || "",
          studentName: data.data.studentName || "",
          studentPassword: data.data.studentPassword || "",
          assignedClassId: data.data.assignedClassId || "", // Handle null or undefined assignedClassId
        });
      } else {
        console.error("No student data found");
      }
    } catch (error) {
      console.error("Error fetching student details:", error);
    }
  };

  // Update student details function
  const handleUpdate = async () => {
    if (!formData.studentName.trim()) {
      alert("Student name cannot be empty.");
      return;
    }

    try {
      if (editField === "studentName") {
        await updateStudent(formData.studentName);
      } else if (editField === "studentPassword") {
        await updateStudent(formData.studentPassword);
      } else
        await updateStudent(formData.studentName, formData.studentPassword);

      // Reset edit field and disable the save button
      setEditField(null);
      setIsSaveEnabled(false);

      alert("Student details updated successfully!");

      // If the student name was updated, perform logout and navigate to the login page
      if (editField === "studentName") {
        alert("Your student name has changed. Please log in again.");

        // Log out the student
        logout(); // Assuming you have a `logout` function from your Auth context

        // Reload the page and navigate to login
        navigate("/login"); // Redirect to login page
        window.location.reload(); // Ensure the page refreshes
      }
    } catch (error) {
      console.error("Error updating student details:", error);
    }
  };

  // Delete student account function
  const handleDelete = async () => {
    try {
      await deleteStudent();
      alert("Account deleted successfully!");
      // Redirect to login or log out logic here
      navigate("/login");
      window.location.reload(); // Optionally reload the page after deleting
    } catch (error) {
      console.error("Error deleting account:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-green-100 p-6">
      <div className="mx-auto max-w-2xl">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent" data-aos="fade-up">
            My Account
          </h1>
          <p className="text-gray-600 mt-2" data-aos="fade-up">
            Manage your student account details
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8 backdrop-blur-sm bg-opacity-80">
          <div className="space-y-6">
            {/* Student ID (Non-Editable) */}
            <div className="flex items-center space-x-4 p-4 rounded-lg bg-gray-50">
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-600" data-aos="fade-up">
                  Student ID
                </label>
                <input data-aos="fade-up"
                  type="text"
                  value={formData.studentId}
                  disabled
                  className="w-full bg-transparent border-none focus:outline-none text-gray-800"
                />
              </div>
            </div>

            {/* Student Name (Editable) */}
            <div className="flex items-center space-x-4 p-4 rounded-lg bg-gray-50">
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-600" data-aos="fade-up">
                  Student Name
                </label>
                <input
                  type="text" data-aos="fade-up"
                  value={formData.studentName}
                  onChange={(e) => {
                    setFormData({ ...formData, studentName: e.target.value });
                    setIsSaveEnabled(true); // Enable save button when student name is changed
                  }}
                  disabled={editField !== "studentName"}
                  className="w-full bg-transparent border-none focus:outline-none text-gray-800"
                />
              </div>
              {editField === "studentName" ? (
                <button data-aos="fade-up"
                  onClick={() => setEditField(null)}
                  className="text-green-600 cursor-pointer"
                >
                  Save
                </button>
              ) : (
                <button data-aos="fade-up"
                  onClick={() => setEditField("studentName")}
                  className="text-gray-500 cursor-pointer"
                >
                  Edit
                </button>
              )}
            </div>

            {/* Student Password (Editable) */}
            <div className="flex items-center space-x-4 p-4 rounded-lg bg-gray-50">
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-600" data-aos="fade-up">
                  Student Password
                </label>
                <input
                  type="password" data-aos="fade-up"
                  value={formData.studentPassword}
                  onChange={(e) => {
                    setFormData({
                      ...formData,
                      studentPassword: e.target.value,
                    });
                    setIsSaveEnabled(true); // Enable save button when student password is changed
                  }}
                  disabled={editField !== "studentPassword"}
                  className="w-full bg-transparent border-none focus:outline-none text-gray-800"
                />
              </div>
              {editField === "studentPassword" ? (
                <button data-aos="fade-up"
                  onClick={() => setEditField(null)}
                  className="text-green-600 cursor-pointer"
                >
                  Save
                </button>
              ) : (
                <button data-aos="fade-up"
                  onClick={() => setEditField("studentPassword")}
                  className="text-gray-500 cursor-pointer"
                >
                  Edit
                </button>
              )}
            </div>

            {/* Assigned Class ID (Non-Editable) */}
            <div className="flex items-center space-x-4 p-4 rounded-lg bg-gray-50">
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-600" data-aos="fade-up">
                  Assigned Class ID
                </label>
                <input data-aos="fade-up"
                  type="text"
                  value={formData.assignedClassId || "N/A"} // Handle null or undefined assignedClassId
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
              <button data-aos="fade-up"
                type="button"
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
              <div className="text-red-600 h-8 w-8">⚠️</div>
              <h2 className="text-2xl font-bold text-gray-800">
                Delete Account
              </h2>
            </div>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete your student account? This action
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

export default MyAccountStudent;
