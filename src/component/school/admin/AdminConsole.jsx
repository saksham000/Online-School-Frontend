import { Link } from "react-router-dom";

export default function AdminConsole(){
    return(
        <div className="min-h-screen bg-gradient-to-r from-fuchsia-500 to-lime-600">
        <h1 className="text-2xl font-bold pt-4">Admin Panel</h1>
        <div className="flex flex-col space-y-4 gap-5 mt-10 font-semibold">
          <Link to="/manageadmins" className="bg-blue-500 text-white  p-4 rounded">
            Manage Admins
          </Link>
          <Link to="/manageteachers" className="bg-green-500 text-white p-4 rounded">
            Manage Teachers
          </Link>
          <Link to="/manageclass" className="bg-purple-500 text-white p-4 rounded">
            Manage Classes
          </Link>
          <Link to="/managestudents" className="bg-red-500 text-white p-4 rounded">
            Manage Students
          </Link>
        </div>
      </div>
    )
}