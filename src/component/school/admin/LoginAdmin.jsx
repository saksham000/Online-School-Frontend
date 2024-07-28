import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginAdmin } from "../api/admin/adminService";

export default function LoginAdmin() {
  const [adminId, setAdminId] = useState(null);
  const [adminName, setAdminName] = useState("");
  const [adminPassword, setAdminPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handelAdminLogin = async (e) => {
    e.preventDefault();
    await loginAdmin(adminId,adminName,adminPassword)
      .then((response) => {
        if (response.status === 200) {
          navigate(`/adminconsole`)
          setErrorMessage("")
        } else {
          throw new Error("Invalid Server Error");
        }
      })
      .catch(() => {
        setErrorMessage("Please Check Your Credientials !");
      });
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-r from-fuchsia-500 to-lime-600">
      <h1 className="text-2xl font-bold mb-4">Verify Existing Admin</h1>
      <form onSubmit={handelAdminLogin} className="w-full max-w-sm">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Admin ID
          </label>
          <input
            id="adminId"
            type="text"
            placeholder="Admin ID"
            value={adminId || ""}
            required
            onChange={(e) => setAdminId(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Admin Name
          </label>
          <input
            id="adminName"
            type="text"
            placeholder="Admin Name"
            required
            value={adminName || ""}
            onChange={(e) => setAdminName(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Admin Password
          </label>
          <input
            id="adminPassword"
            type="text"
            placeholder="Admin Password"
            required
            value={adminPassword || ""}
            onChange={(e) => setAdminPassword(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded shadow"
        >
          Verify Admin
        </button>
      </form>
      {errorMessage && (
        <div className="mt-4">
          <p className="text-red-800 bg-yellow-500 rounded-lg p-1">{errorMessage}</p>
        </div>
      )}
    </div>
  );
}
