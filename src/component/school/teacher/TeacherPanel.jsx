import { Link } from "react-router-dom";

export default function TeacherPanel() {
  return (
    <div className=" min-h-screen bg-gradient-to-r from-fuchsia-500 to-lime-600">
      <div className=" text-black">
        <h1 className="text-3xl text-center pt-20">Welcome To Teacher Panel !</h1>
        <h2 className="text-3xl text-center pt-5">Here you can Login</h2>
        <div className="flex justify-center mt-24 font-semibold gap-32">
          <Link to="/oldteacher" className=" bg-green-500 text-center p-8 rounded">
            Login to Teacher Panel
          </Link>
        </div>
      </div>
    </div>
  );
}