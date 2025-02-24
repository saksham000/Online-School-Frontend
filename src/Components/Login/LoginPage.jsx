"use client";
import 'aos/dist/aos.css';
import React, { useEffect, useState } from "react";
import { Lock, User } from "lucide-react";
import { useAuth } from "../../security/AuthContext";
import { Link } from "react-router-dom";
import Aos from "aos";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const authContext = useAuth();
  useEffect(() => {
    Aos.init({ duration: 1000 });
  }, []);
  async function handleSubmit(e) {
    e.preventDefault();

    const loginResponse = await authContext.login(username, password);

    if (loginResponse.success) {
      // ✅ Store username and role in localStorage
      localStorage.setItem("loggedInUsername", username);
      localStorage.setItem("userRole", loginResponse.role);

      // ✅ Redirect with encoded username
      if (loginResponse.role === "ADMIN") {
        window.location.href = `/welcome-admin/${encodeURIComponent(username)}`;
      } else if (loginResponse.role === "TEACHER") {
        window.location.href = `/welcome-teacher/${encodeURIComponent(
          username
        )}`;
      } else if (loginResponse.role === "STUDENT") {
        window.location.href = `/welcome-student/${encodeURIComponent(
          username
        )}`;
      }
    } else {
      setErrorMessage(loginResponse.message);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-400 via-pink-500 to-red-500">
      <div className="max-w-md w-full m-4 space-y-8 p-10 bg-white bg-opacity-20 backdrop-blur-lg rounded-xl shadow-xl border border-white border-opacity-20 transform hover:scale-[1.01] transition-transform duration-300">
        <div>
          <h2 data-aos="fade-up" className="mt-6 text-center text-4xl font-extrabold text-black">
            Welcome Back
          </h2>
          <p data-aos="fade-up" className="mt-2 text-center text-sm text-white text-opacity-80">
            Sign in to your account
          </p>
        </div>

        {errorMessage && (
          <div className="p-2 text-center bg-yellow-500 text-black rounded-md">
            {errorMessage}
          </div>
        )}

        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <div className="rounded-md -space-y-px">
            {/* Username Field */}
            <div className="relative mb-4">
              <label data-aos="fade-up" htmlFor="username" className="sr-only">
                Username
              </label>
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <User data-aos="fade-up" className="h-5 w-5 text-black text-opacity-60" />
              </div>
              <input
                id="username"
                name="username"
                type="text"
                required data-aos="fade-up"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="appearance-none relative block w-full px-3 py-3 pl-10 border border-black border-opacity-30 placeholder-black placeholder-opacity-60 text-red-500 bg-white bg-opacity-10 rounded-lg focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent sm:text-sm transition-all duration-300"
                placeholder="Username"
              />
            </div>

            {/* Password Field */}
            <div className="relative">
              <label data-aos="fade-up" htmlFor="password" className="sr-only">
                Password
              </label>
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock data-aos="fade-up" className="h-5 w-5 text-black text-opacity-60" />
              </div>
              <input data-aos="fade-up"
                id="password"
                name="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="appearance-none relative block w-full px-3 py-3 pl-10 border border-black border-opacity-30 placeholder-black placeholder-opacity-60 text-red-500 bg-white bg-opacity-10 rounded-lg focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent sm:text-sm transition-all duration-300"
                placeholder="Password"
              />
            </div>
          </div>

          {/* Sign In Button */}
          <div>
            <button data-aos="fade-up"
              type="submit"
              className="group relative w-full flex justify-center py-3 px-4 border-0 text-sm font-medium rounded-lg text-white bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transform hover:scale-[1.02] transition-all duration-300"
            >
              Sign in
            </button>
          </div>
        </form>

        {/* 🔹 Add Register Links */}
        <div className="mt-4 text-center text-black text-opacity-80">
          <p className="text-sm" data-aos="fade-up">Don't have an account?</p>
          <div className="flex flex-col space-y-2 mt-2">
            <Link
              to="/admin-registeration"
              className="text-sm font-medium text-green-400 hover:text-gray-200 transition-all duration-300"
            >
              Create an Admin Account
            </Link>
            <Link
              to="/teacher-registeration"
              className="text-sm font-medium text-blue-400 hover:text-gray-200 transition-all duration-300"
            >
              Create a Teacher Account
            </Link>
            <Link
              to="/student-registeration"
              className="text-sm font-medium text-purple-400 hover:text-gray-200 transition-all duration-300"
            >
              Create a Student Account
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
