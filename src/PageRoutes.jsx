import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Home";
import LoginPage from "./Components/Login/LoginPage";
import AuthProvider, { useAuth } from "./security/AuthContext";
import NoAuthErrorComponent from "./Components/ErrorComponent/NoAuthErrorComponent";
import PageNotFoundComponent from "./Components/ErrorComponent/PageNotFoundComponent";
import Navbar from "./Components/Navbar/Navbar";
import AdminDashboard from "./Components/AdminPanel/AdminDashboard";
import AdminManagement from "./Components/AdminPanel/AdminManagement";
import AdminRegister from "./Components/Register/AdminRegister";
import StudentRegister from "./Components/Register/StudentRegister";
import TeacherRegister from "./Components/Register/TeacherRegister";
import MyAccountAdmin from "./Components/AdminPanel/MyAccountAdmin";
import TeacherDashboard from "./Components/TeacherPanel/TeacherDashboard";
import TeacherClassDetails from "./Components/TeacherPanel/TeacherClassDetails";
import LiveMeetingZego from "./Components/LiveMeeting/LiveMeetingZego";
import StudentDashboard from "./Components/StudentPanel/StudentDashboard";
import JoinMeeting from "./Components/StudentPanel/JoinMeeting";
import MyAccountStudent from "./Components/StudentPanel/MyAccountStudent";
import MyAccountTeacher from "./Components/TeacherPanel/MyAccountTeacher";

function AuthRoute({ children, allowedRoles }) {
  const authContext = useAuth();

  if (!authContext.isAuth) {
    return <NoAuthErrorComponent />; // If user is not authenticated
  }

  if (!allowedRoles.includes(authContext.role)) {
    return <NoAuthErrorComponent />; // If user is authenticated but does not have the required role
  }

  return children;
}

const PageRoutes = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/admin-registeration" element={<AdminRegister />} />
          <Route path="/student-registeration" element={<StudentRegister />} />
          <Route path="/teacher-registeration" element={<TeacherRegister />} />

          {/* ✅ Dynamic Route for Admin Dashboard */}
          <Route
            path="/welcome-admin/:username"
            element={
              <AuthRoute allowedRoles={["ADMIN"]}>
                <AdminDashboard />
              </AuthRoute>
            }
          />

          <Route
            path="/admin-management"
            element={
              <AuthRoute allowedRoles={["ADMIN"]}>
                <AdminManagement />
              </AuthRoute>
            }
          />

          <Route
            path="/myaccount-admin"
            element={
              <AuthRoute allowedRoles={["ADMIN"]}>
                <MyAccountAdmin />
              </AuthRoute>
            }
          />

          {/* ✅ Dynamic Route for Teacher */}
          <Route
            path="/welcome-teacher/:username"
            element={
              <AuthRoute allowedRoles={["TEACHER"]}>
                <TeacherDashboard />
              </AuthRoute>
            }
          />
          <Route
            path="/myclass-teacher"
            element={
              <AuthRoute allowedRoles={["TEACHER"]}>
                <TeacherClassDetails />
              </AuthRoute>
            }
          />
          <Route
            path="/myaccount-teacher"
            element={
              <AuthRoute allowedRoles={["TEACHER"]}>
                <MyAccountTeacher />
              </AuthRoute>
            }
          />
          <Route
            path="/hostmeeting/:teacherName"
            element={
              <AuthRoute allowedRoles={["TEACHER"]}>
                <LiveMeetingZego />
              </AuthRoute>
            }
          />
          {/* ✅ Dynamic Route for Student */}
          <Route
            path="/welcome-student/:username"
            element={
              <AuthRoute allowedRoles={["STUDENT"]}>
                <StudentDashboard />
              </AuthRoute>
            }
          />
          <Route
            path="/myaccount-student"
            element={
              <AuthRoute allowedRoles={["STUDENT"]}>
                <MyAccountStudent />
              </AuthRoute>
            }
          />
          <Route
            path="/joinroom/:roomid/:username"
            element={
              <AuthRoute allowedRoles={["STUDENT"]}>
                <JoinMeeting />
              </AuthRoute>
            }
          />

          <Route path="/unauthorized" element={<NoAuthErrorComponent />} />
          <Route path="*" element={<PageNotFoundComponent />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default PageRoutes;
