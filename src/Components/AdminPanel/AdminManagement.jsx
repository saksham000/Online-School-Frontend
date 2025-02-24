"use client";

import { useEffect, useState } from "react";
import { Search, Trash2, X } from "lucide-react";
import { deleteAdminById, getAllAdmin } from "../../api/AdminApi";
import Aos from "aos";
import 'aos/dist/aos.css';
export default function AdminManagement() {
  const [searchId, setSearchId] = useState("");
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [admins, setAdmins] = useState([]);
  const [loading, setLoading] = useState(false); // ✅ Added loading state
  const filteredAdmins = admins.filter((admin) =>
    searchId ? admin.adminId.toString() === searchId : true
  );
  // Fetch admins when button is clicked
  const fetchAdmins = async () => {
    setLoading(true); // Start loading
    try {
      const response = await getAllAdmin();
      if (response.data.status === 200) {
        setAdmins(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching admins:", error);
    }
    setLoading(false); // Stop loading
  };

    useEffect(() => {
      Aos.init({ duration: 1000 });
    }, []);

  const handleDelete = async (adminId) => {
    setLoading(true); // Start loading
    try {
      const response = await deleteAdminById(adminId);
      if (response.data.status === 200) {
        // ✅ Remove deleted admin from the list
        setAdmins((prevAdmins) =>
          prevAdmins.filter((admin) => admin.adminId !== adminId)
        );
        setDeleteConfirm(null); // Close modal
      }
    } catch (error) {
      console.error("Error deleting admin:", error);
    }
    setLoading(false); // Stop loading
  };

  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold mb-8" data-aos="fade-up">Admin Management</h1>

      {/* Fetch Admins Button */}
      <button
        onClick={fetchAdmins} data-aos="fade-up"
        className="mb-6 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        disabled={loading} // Disable button while loading
      >
        {loading ? "Loading..." : "Fetch Admins"}
      </button>

      {/* Search Input */}
      <div className="mb-6" data-aos="fade-up">
        <div className="relative max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="number"
            placeholder="Search by Admin ID"
            value={searchId}
            onChange={(e) => setSearchId(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Admin Table */}
      <div  className="border border-gray-200 rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th data-aos="fade-up" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Admin ID
                </th>
                <th data-aos="fade-up" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th data-aos="fade-up" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-[100px]">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody data-aos="fade-up" className="bg-white divide-y divide-gray-200">
              {filteredAdmins.map((admin) => (
                <tr key={admin.adminId} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {admin.adminId}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {admin.adminName}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <button
                      onClick={() => setDeleteConfirm(admin.adminId)}
                      className="text-red-600 hover:text-red-900"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              ))}
              {filteredAdmins.length === 0 && (
                <tr>
                  <td
                    colSpan={3}
                    className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center"
                  >
                    No admins found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {deleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-lg font-semibold">Delete Admin</h3>
              <button
                onClick={() => setDeleteConfirm(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete this admin? This action cannot be
              undone.
            </p>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setDeleteConfirm(null)}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(deleteConfirm)}
                className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
