import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import AuthProvider, { useAuth } from "../security/AuthContext";
import Login from "./Login";
import Welcome from "./Welcome";

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
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
}
