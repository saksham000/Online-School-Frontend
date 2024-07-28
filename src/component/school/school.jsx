import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Login from "./Login";
import Welcome from "./Welcome";
import AuthProvider, { useAuth } from "./security/AuthContext";
import StudentPanel from "./student/StudentPanel";
import OldStudent from "./student/OldStudent";
import ErrorComponent from "./ErrorComponent";
import TeacherPanel from "./teacher/TeacherPanel";
import OldTeacher from "./teacher/OldTeacher";
import AdminPanel from "./admin/AdminPanel";
import LoginAdmin from "./admin/LoginAdmin";
import AdminConsole from "./admin/AdminConsole";

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
              path="/teacher"
              element={
                <AuthRoute>
                  <TeacherPanel />
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
              path="/studentpanel"
              element={
                <AuthRoute>
                  <StudentPanel />
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
