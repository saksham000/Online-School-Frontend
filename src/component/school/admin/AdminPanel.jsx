import {  Link } from "react-router-dom"

export default function AdminPanel(){
    return(
        <div className=" min-h-screen bg-gradient-to-r from-fuchsia-500 to-lime-600">
        <div className=" text-black">
          <h1 className="text-3xl text-center pt-20">Welcome To Admin Panel !</h1>
          <h2 className="text-3xl text-center pt-5">Please Choose One</h2>
          <div className="flex justify-center mt-24 gap-32 font-semibold">
            <Link to="/newadmin" className=" bg-red-500 text-center p-8 rounded">
              Create New Admin ?
            </Link>
            <Link to="/adminlogin" className=" bg-green-500 text-center p-8 rounded">
              Login as Admin ?
            </Link>
          </div>
        </div>
      </div>
    )
}