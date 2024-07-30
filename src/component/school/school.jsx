import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Login from "./Login";
import Welcome from "./Welcome";
import AuthProvider, { useAuth } from "./security/AuthContext";
import OldStudent from "./student/OldStudent";
import ErrorComponent from "./ErrorComponent";
import OldTeacher from "./teacher/OldTeacher";
import AdminPanel from "./admin/AdminPanel";
import LoginAdmin from "./admin/LoginAdmin";
import AdminConsole from "./admin/AdminConsole";
import CreateAdmin from "./admin/CreateAdmin";
import AssignedClass from "./teacher/AssignedClass";
import StudentClass from "./student/StudentClass";
import StudentJoinRoom from "./student/StudentJoinRoom";
import HostMeeting from "./teacher/HostMeeting";

function AuthRoute({ children }) {
  const authContext = useAuth();
  if (authContext.isAuth) return children;
  return <Navigate to="/" />;
}

export default function School() {
  return (
    <div>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route
              path="/welcome/:username"
              element={
                <AuthRoute>
                  <Welcome />
                </AuthRoute>
              }
            />
            <Route
              path="/oldteacher"
              element={
                <AuthRoute>
                  <OldTeacher />
                </AuthRoute>
              }
            />
            <Route
              path="/assignedclass/:assignedClassId"
              element={
                <AuthRoute>
                  <AssignedClass />
                </AuthRoute>
              }
            />
            <Route
              path="/hostmeeting/:teacherName/:teacherId"
              element={
                <AuthRoute>
                  <HostMeeting />
                </AuthRoute>
              }
            />
            <Route
              path="/oldstudent"
              element={
                <AuthRoute>
                  <OldStudent />
                </AuthRoute>
              }
            />
            <Route
              path="/studentclass/:studentId"
              element={
                <AuthRoute>
                  <StudentClass />
                </AuthRoute>
              }
            />
            <Route
              path="/studentjoinroom/:studentName/:studentRollNumber/:studentJoinRoomId"
              element={
                <AuthRoute>
                  <StudentJoinRoom />
                </AuthRoute>
              }
            />
            <Route
              path="/admin"
              element={
                <AuthRoute>
                  <AdminPanel />
                </AuthRoute>
              }
            />
            <Route
              path="/adminlogin"
              element={
                <AuthRoute>
                  <LoginAdmin />
                </AuthRoute>
              }
            />
            <Route
              path="/newadmin"
              element={
                <AuthRoute>
                  <CreateAdmin />
                </AuthRoute>
              }
            />
            <Route
              path="/adminconsole"
              element={
                <AuthRoute>
                  <AdminConsole />
                </AuthRoute>
              }
            />
            <Route path="*" element={<ErrorComponent />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
}
