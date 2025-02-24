import { executeJwtAuthService } from "./AuthApiService";
import { createContext, useContext, useEffect, useState } from "react";
import { apiClient } from "./ApiClient";
import { jwtDecode } from "jwt-decode";

export const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export default function AuthProvider({ children }) {
  const [isAuth, setAuth] = useState(false);
  const [username, setUsername] = useState(null);
  const [token, setToken] = useState(null);
  const [role, setRole] = useState(null);

  // Function to check token validity
  const isTokenExpired = (token) => {
    try {
      const decoded = jwtDecode(token);
      return decoded.exp * 1000 < Date.now(); // Convert to milliseconds
    } catch (error) {
      return true; // If decoding fails, assume expired
    }
  };

  // Restore auth state from localStorage
  useEffect(() => {
    const storedToken = localStorage.getItem("token");

    if (storedToken && !isTokenExpired(storedToken.replace("Bearer ", ""))) {
      try {
        const decodedToken = jwtDecode(storedToken.replace("Bearer ", ""));
        setAuth(true);
        setToken(storedToken);
        setRole(decodedToken.role);

        // Attach token to Axios requests
        apiClient.defaults.headers.common["Authorization"] = storedToken;
      } catch (error) {
        console.error("Invalid token:", error);
        logout();
      }
    } else {
      logout();
    }
  }, []);

  // Login function
  async function login(username, password) {
    try {
      const response = await executeJwtAuthService(username, password);

      if (response.data.status === 200) {
        const jwtToken = "Bearer " + response.data.data;
        const decodedToken = jwtDecode(response.data.data);
        const userRole = decodedToken.role;

        setAuth(true);
        setUsername(username);
        setToken(jwtToken);
        setRole(userRole);

        // Store in localStorage
        localStorage.setItem("token", jwtToken);
        localStorage.setItem("role", userRole);

        // Attach token to Axios requests
        apiClient.defaults.headers.common["Authorization"] = jwtToken;

        return { success: true, role: userRole };
      } else {
        return { success: false, message: response.data.message };
      }
    } catch (error) {
      console.error("Login error:", error);
      return { success: false, message: "An error occurred. Please try again later." };
    }
  }

  // Logout function
  function logout() {
    setUsername(null);
    setAuth(false);
    setToken(null);
    setRole(null);

    localStorage.removeItem("token");
    localStorage.removeItem("role");

    // Remove token from Axios requests
    delete apiClient.defaults.headers.common["Authorization"];
  }

  return (
    <AuthContext.Provider value={{ isAuth, login, logout, username, token, role }}>
      {children}
    </AuthContext.Provider>
  );
}
