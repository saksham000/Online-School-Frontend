import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Login from "./Login";
import Welcome from "./Welcome";
import AuthProvider, { useAuth } from "./security/AuthContext";
import Teacher from "./teacher/Teacher";
import Student from "./student/Student";
import Admin from "./admin/Admin";

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
                  <Teacher />
                </AuthRoute>
              }
            />
            <Route
              path="/student"
              element={
                <AuthRoute>
                  <Student />
                </AuthRoute>
              }
            />
            <Route
              path="/admin"
              element={
                <AuthRoute>
                  <Admin />
                </AuthRoute>
              }
            />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
}
