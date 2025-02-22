import React from "react";
import School from "./School";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import LoginPage from "./Components/Login/LoginPage";
import Welcome from "./Components/Welcome/Welcome";
import AuthProvider, { useAuth } from "./security/AuthContext";

function AuthRoute({ children }) {
  const authContext = useAuth();
  if (authContext.isAuth) return children;
  return <Navigate to="/" />;
}
const App = () => {
  return (
    <div>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<School />} />

            <Route path="/login" element={<LoginPage />} />
            <Route
              path="/welcome"
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
};

export default App;
