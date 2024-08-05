import { useEffect, useState } from "react";
import { deleteAdminById, fetchAllAdmins } from "../../api/adminService";
import { Bounce, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function AdminManagement() {
  const [admins, setAdmins] = useState([]);

  const listAllAdmins = async () => {
    await fetchAllAdmins().then((response) => {
      if (response.status === 200) {
        setAdmins(response.data);
      }
    });
  };

  const deleteAdmin = async (adminId) => {
    await deleteAdminById(adminId)
      .then((response) => {
        if (response.status === 200) {
          toast.success("Admin is Deleted !", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Bounce,
          });
        }
      })
      .catch(() => {
        toast.warn("Internal Server Error !", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          transition: Bounce,
        });
      });
  };

  useEffect(() => {
    listAllAdmins();
  });

  return (
    <div className="min-h-screen bg-gradient-to-r from-fuchsia-500 to-lime-600">
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Manage Admins</h1>
        <div>
          {admins.length === 0 ? (
            <p>No Admins available</p>
          ) : (
            <div>
              <table className="w-full">
                <thead className="bg-gradient-to-r from-orange-500 to-fuchsia-600 border-b-2 border-gray-200 w-full">
                  <tr>
                    <th className="w-20 p-3 font-semibold tracking-wide text-center text-2xl">
                      Admin ID
                    </th>
                    <th className="w-20 p-3 font-semibold tracking-wide text-center text-2xl">
                      Admin Name
                    </th>
                    <th className="w-20 p-3 text-2xl font-semibold tracking-wide text-center">
                      Delete Admin
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {admins.map((admin) => (
                    <tr
                      key={admin.adminId}
                      className="bg-gradient-to-r from-orange-500 to-fuchsia-600"
                    >
                      <td className="p-3 text-black font-semibold text-xl whitespace-nowrap">
                        {admin.adminId}
                      </td>
                      <td className="p-3 text-black font-semibold text-xl whitespace-nowrap">
                        {admin.adminName}
                      </td>
                      <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                        <button
                          className="p-3 bg-red-500 rounded-full font-semibold text-black border border-black hover:outline-none hover:ring-2 hover:ring-purple-500"
                          onClick={() => deleteAdmin(admin.adminId)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}
