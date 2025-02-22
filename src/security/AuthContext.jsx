import { executeJwtAuthService } from "./AuthApiService";
import { createContext, useContext, useState } from "react";
import { apiClient } from "./ApiClient";

export const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export default function AuthProvider({ children }) {
  const [isAuth, setAuth] = useState(false);
  const [username, setUsername] = useState(null);
  const [token, setToken] = useState(null);

  async function login(username, password) {
    try {
      const response = await executeJwtAuthService(username, password);

      if (response.status === 200) {
        const jwtToken = "Bearer " + response.data; // Correct way to extract the token

        setAuth(true);
        setUsername(username);
        setToken(jwtToken);

        // Save token to localStorage (optional, for persistence)
        localStorage.setItem("token", jwtToken);

        // Attach token to all Axios requests
        apiClient.interceptors.request.use((config) => {
          config.headers.Authorization = jwtToken;
          return config;
        });

        return true;
      } else {
        logout();
        return false;
      }
    } catch (error) {
      logout();
      return false;
    }
  }

  function logout() {
    setUsername(null);
    setAuth(false);
    setToken(null);
  }

  return (
    <AuthContext.Provider value={{ isAuth, login, logout, username, token }}>
      {children}
    </AuthContext.Provider>
  );
}
