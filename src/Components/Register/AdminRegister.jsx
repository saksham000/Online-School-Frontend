"use client";

import { Lock, User, Shield } from "lucide-react";
import { useEffect, useState } from "react";
import { createAdmin } from "../../api/AdminApi";
import 'aos/dist/aos.css';
import Aos from "aos";
export default function AdminRegister() {
  const [adminName, setAdminName] = useState("");
  const [adminPassword, setAdminPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  useEffect(() => {
    Aos.init({ duration: 1000 });
  }, []);
  const handleRegister = async (e) => {
    e.preventDefault(); // Prevent page reload

    try {
      const response = await createAdmin(adminName, adminPassword);
      if (response.data.status === 200) {
        setSuccessMessage(response.data.message); // ✅ Show success message
        setErrorMessage(""); // Clear error message
        setAdminName(""); // Reset form fields
        setAdminPassword("");
      } else {
        setErrorMessage(response.data.message); // ✅ Show API error message
        setSuccessMessage("");
      }
    } catch (error) {
      setErrorMessage(error.response?.data?.message || "Something went wrong!");
      setSuccessMessage("");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-600 via-indigo-500 to-purple-500">
      <div className="max-w-md w-full m-4 space-y-8 p-10 bg-white bg-opacity-20 backdrop-blur-lg rounded-xl shadow-xl border border-white border-opacity-20 transform hover:scale-[1.01] transition-transform duration-300">
        <div className="flex flex-col items-center">
          <div data-aos="fade-up" className="p-3 rounded-full bg-white bg-opacity-20 backdrop-blur-sm">
            <Shield className="h-8 w-8 text-white" />
          </div>
          <h2 data-aos="fade-up" className="mt-6 text-center text-4xl font-extrabold text-black">
            Admin Registration
          </h2>
          <p data-aos="fade-up" className="mt-2 text-center text-sm text-black text-opacity-80">
            Create your administrative account
          </p>
        </div>

        {/* ✅ Display error or success message */}
        {errorMessage && (
          <div className="p-2 text-center bg-red-500 text-white rounded-md">
            {errorMessage}
          </div>
        )}
        {successMessage && (
          <div className="p-2 text-center bg-green-500 text-white rounded-md">
            {successMessage}
          </div>
        )}

        <form onSubmit={handleRegister} className="mt-8 space-y-6">
          <div className="rounded-md -space-y-px">
            {/* Admin Name Field */}
            <div className="relative mb-4">
              <label data-aos="fade-up" htmlFor="adminname" className="sr-only">
                Admin Name
              </label>
              <div data-aos="fade-up" className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <User className="h-5 w-5 text-white text-opacity-60" />
              </div>
              <input data-aos="fade-up"
                id="adminname"
                name="adminname"
                type="text"
                required
                value={adminName}
                onChange={(e) => setAdminName(e.target.value)}
                className="appearance-none relative block w-full px-3 py-3 pl-10 border border-black border-opacity-30 placeholder-black placeholder-opacity-60 text-red-500 bg-white bg-opacity-10 rounded-lg focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent sm:text-sm transition-all duration-300"
                placeholder="Admin Name"
              />
            </div>

            {/* Password Field */}
            <div className="relative">
              <label data-aos="fade-up" htmlFor="password" className="sr-only">
                Password
              </label>
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock data-aos="fade-up" className="h-5 w-5 text-white text-opacity-60" />
              </div>
              <input
                id="password"
                name="password" data-aos="fade-up"
                type="password"
                required
                value={adminPassword}
                onChange={(e) => setAdminPassword(e.target.value)}
                className="appearance-none relative block w-full px-3 py-3 pl-10 border border-black border-opacity-30 placeholder-black placeholder-opacity-60 text-red-500 bg-white bg-opacity-10 rounded-lg focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent sm:text-sm transition-all duration-300"
                placeholder="Password"
              />
            </div>
          </div>

          {/* Register Button */}
          <div>
            <button data-aos="fade-up"
              type="submit"
              className="group relative w-full flex justify-center py-3 px-4 border-0 text-sm font-medium rounded-lg text-white bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transform hover:scale-[1.02] transition-all duration-300"
            >
              Register as Admin
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
