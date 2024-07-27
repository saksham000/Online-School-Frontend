import { useParams, Link } from "react-router-dom"

export default function Welcome(){
    const {username} = useParams();
    return(
        <div className=" min-h-screen bg-gradient-to-r from-fuchsia-500 to-lime-600">
        <div className=" text-black">
          <h1 className="text-3xl text-center pt-20">Welcome {username} !</h1>
          <h2 className="text-3xl text-center pt-5">Please Choose One</h2>
          <div className="flex justify-center mt-24 gap-32 font-semibold">
            <Link to="/student" className=" bg-red-500 text-center p-8 rounded">
              Student
            </Link>
            <Link to="/teacher" className=" bg-green-500 text-center p-8 rounded">
              Teacher
            </Link>
            <Link to="/admin" className=" bg-purple-500 text-center p-8 rounded">
              Admin
            </Link>
          </div>
        </div>
      </div>
    )
}