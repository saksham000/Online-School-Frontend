"use client";

import React, { useEffect, useState } from "react";
import { createStudent } from "../../api/StudentApi";
import 'aos/dist/aos.css';
import Aos from "aos";
export default function StudentRegister() {
  const [studentName, setStudentName] = useState("");
  const [studentPassword, setStudentPassword] = useState("");
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);
  useEffect(() => {
    Aos.init({ duration: 1000 });
  }, []);
  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const response = await createStudent(studentName, studentPassword);
      if (response?.status === 201) {
        setMessage(response.data.message); // ✅ Show success message
        setStudentName(""); // ✅ Reset input fields
        setStudentPassword("");
        setError(null); // ✅ Clear any previous errors
      } else {
        setError(response.data?.message || "Failed to register student.");
        setMessage(null);
      }
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong!");
      setMessage(null);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-400 via-green-500 to-teal-500">
      <div className="max-w-md w-full m-4 space-y-8 p-10 bg-white bg-opacity-20 backdrop-blur-lg rounded-xl shadow-xl border border-white border-opacity-20 transform hover:scale-[1.01] transition-transform duration-300">
        <div>
          <h2 data-aos="fade-up" className="mt-6 text-center text-4xl font-extrabold text-black">
            Student Registration
          </h2>
          <p data-aos="fade-up" className="mt-2 text-center text-sm text-white text-opacity-80">
            Create a new student account
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
            {/* Student Name Field */}
            <div className="relative mb-4">
              <label data-aos="fade-up" htmlFor="studentName" className="sr-only">
                Student Name
              </label>
              <input
                id="studentName"
                name="studentName"
                type="text" data-aos="fade-up"
                required
                value={studentName}
                onChange={(e) => setStudentName(e.target.value)}
                className="appearance-none relative block w-full px-3 py-3 border border-black border-opacity-30 placeholder-black placeholder-opacity-60 text-green-500 bg-white bg-opacity-10 rounded-lg focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent sm:text-sm transition-all duration-300"
                placeholder="Student Name"
              />
            </div>

            {/* Password Field */}
            <div className="relative">
              <label data-aos="fade-up" htmlFor="studentPassword" className="sr-only">
                Password
              </label>
              <input
                id="studentPassword"
                name="studentPassword"
                type="password"
                required data-aos="fade-up"
                value={studentPassword}
                onChange={(e) => setStudentPassword(e.target.value)}
                className="appearance-none relative block w-full px-3 py-3 border border-black border-opacity-30 placeholder-black placeholder-opacity-60 text-green-500 bg-white bg-opacity-10 rounded-lg focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent sm:text-sm transition-all duration-300"
                placeholder="Password"
              />
            </div>
          </div>

          {/* Submit Button */}
          <div>
            <button data-aos="fade-up"
              type="submit"
              className="group relative w-full flex justify-center py-3 px-4 border-0 text-sm font-medium rounded-lg text-white bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 transform hover:scale-[1.02] transition-all duration-300"
            >
              Register Student
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
