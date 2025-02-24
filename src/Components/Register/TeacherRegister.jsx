import React, { useEffect, useState } from "react";
import { createTeacher } from "../../api/TeacherApi";
import "aos/dist/aos.css";
import Aos from "aos";
export default function TeacherRegister() {
  const [teacherName, setTeacherName] = useState("");
  const [teacherPassword, setTeacherPassword] = useState("");
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const response = await createTeacher(teacherName, teacherPassword);

      if (response.status === 201) {
        setMessage(response.data.message); // ✅ Show success message
        setError(null); // Clear error message
        setTeacherName(""); // Reset form fields
        setTeacherPassword("");
      } else {
        setError(response.data?.message || "Failed to register teacher.");
        setMessage(null);
      }
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong!");
      setMessage(null);
    }
  }
  useEffect(() => {
    Aos.init({ duration: 1000 });
  }, []);
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-400 via-yellow-500 to-red-500">
      <div className="max-w-md w-full m-4 space-y-8 p-10 bg-white bg-opacity-20 backdrop-blur-lg rounded-xl shadow-xl border border-white border-opacity-20 transform hover:scale-[1.01] transition-transform duration-300">
        <div>
          <h2 data-aos="fade-up" className="mt-6 text-center text-4xl font-extrabold text-black">
            Teacher Registration
          </h2>
          <p data-aos="fade-up" className="mt-2 text-center text-sm text-white text-opacity-80">
            Create a new teacher account
          </p>
        </div>

        {message && (
          <div className="p-2 text-center bg-green-500 text-black rounded-md">
            {message}
          </div>
        )}
        {error && (
          <div className="p-2 text-center bg-red-500 text-black rounded-md">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <div className="rounded-md -space-y-px">
            {/* Teacher Name Field */}
            <div className="relative mb-4">
              <label data-aos="fade-up" htmlFor="teacherName" className="sr-only">
                Teacher Name
              </label>
              <input data-aos="fade-up"
                id="teacherName"
                name="teacherName"
                type="text"
                required
                value={teacherName}
                onChange={(e) => setTeacherName(e.target.value)}
                className="appearance-none relative block w-full px-3 py-3 border border-black border-opacity-30 placeholder-black placeholder-opacity-60 text-yellow-500 bg-white bg-opacity-10 rounded-lg focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent sm:text-sm transition-all duration-300"
                placeholder="Teacher Name"
              />
            </div>

            {/* Password Field */}
            <div className="relative">
              <label data-aos="fade-up" htmlFor="teacherPassword" className="sr-only">
                Password
              </label>
              <input
                id="teacherPassword"
                name="teacherPassword" data-aos="fade-up"
                type="password"
                required
                value={teacherPassword}
                onChange={(e) => setTeacherPassword(e.target.value)}
                className="appearance-none relative block w-full px-3 py-3 border border-black border-opacity-30 placeholder-black placeholder-opacity-60 text-yellow-500 bg-white bg-opacity-10 rounded-lg focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent sm:text-sm transition-all duration-300"
                placeholder="Password"
              />
            </div>
          </div>

          {/* Submit Button */}
          <div>
            <button data-aos="fade-up"
              type="submit"
              className="group relative w-full flex justify-center py-3 px-4 border-0 text-sm font-medium rounded-lg text-white bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 transform hover:scale-[1.02] transition-all duration-300"
            >
              Register Teacher
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
