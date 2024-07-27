import { useState } from "react";
import { useAuth } from "./security/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const authContext = useAuth();
  const navigate = useNavigate();

  async function handelSubmit() {
    if (await authContext.login(username, password)) {
      navigate(`/welcome/${username}`);
    } else {
      setShowErrorMessage(true);
    }
  }

  return (
    <div className="Login flex items-center justify-center min-h-screen bg-gradient-to-r from-fuchsia-500 to-lime-600">
      <div className="w-full max-w-md p-8 space-y-6 bg-gradient-to-r from-emerald-300 to-cyan-700 rounded shadow-md">
        {showErrorMessage && (
          <div className="block p-1 bg-yellow-500 rounded font-semibold text-black">
            Please Check Your Credientials !!!!
          </div>
        )}

        <h2 className="text-2xl font-bold text-center">Login</h2>
        <form className="mt-8 space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Username
            </label>
            <input
              type="text"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full p-2 mt-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 mt-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div>
            <button
              type="button"
              name="login"
              onClick={handelSubmit}
              className="w-full py-2 font-semibold text-white bg-indigo-600 rounded hover:bg-indigo-700"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
