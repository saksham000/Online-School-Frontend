export default function PageNotFoundComponent() {
  return (
    <div className=" bg-black flex items-center justify-center min-h-screen">
      <div className="text-red-600 w-full max-w-md space-y-6">
        <h1 className="text-2xl  text-center font-semibold">
          This Page Does Not Exist !
        </h1>
        <div className="text-2xl text-center font-semibold">
          Please go to Home Page
        </div>
      </div>
    </div>
  );
}
