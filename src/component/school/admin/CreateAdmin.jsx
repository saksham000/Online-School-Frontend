import { useState } from "react";
import { createNewAdmin } from "../api/adminService";
import { Link } from "react-router-dom";

export default function CreateAdmin() {
  const [adminName, setAdminName] = useState("");
  const [adminPassword, setAdminPassword] = useState("");
  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handelCreateAdmin = async (e) => {
    e.preventDefault();
    await createNewAdmin(adminName, adminPassword)
      .then((response) => {
        if (response.status === 200) {
          const { adminId: adminnId } = response.data;
          setMessage("Admin is Created Your Id is: " + adminnId);
          setErrorMessage("");
        } else {
          alert("Invalid Server Error");
        }
      })
      .catch(() => {
        setErrorMessage("Please Check Your inputs !");
      });
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-r from-fuchsia-500 to-lime-600">
      <h1 className="text-2xl font-bold mb-4">Verify Existing Admin</h1>
      <form onSubmit={handelCreateAdmin} className="w-full max-w-sm">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Admin Name
          </label>
          <input
            id="adminName"
            type="text"
            placeholder="Admin Name"
            value={adminName || ""}
            required
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
            type="password"
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
          Add New Admin
        </button>
      </form>
      {message && (
        <div className="mt-4">
          <p className="text-green-500 bg-yellow-300 font-semibold rounded-lg p-1">{message}</p>
          <Link className="bg-green-600 p-2 mt-4 block rounded-full" to="/adminlogin">Click Here to Login</Link>
        </div>
      )}
      {errorMessage && (
        <div className="mt-4">
          <p className="text-red-800 bg-yellow-500 rounded-lg p-1">
            {errorMessage}
          </p>
        </div>
      )}
    </div>
  );
}
