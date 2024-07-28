export default function ErrorComponent() {
    return (
      <div className=" bg-black flex items-center justify-center min-h-screen">
        <div className="text-red-600 w-full max-w-md space-y-6">
          <h1 className="text-2xl  text-center font-semibold">
            We Are Working Really Hard !
          </h1>
          <div className="text-2xl text-center font-semibold">
            Soory but this page does not exist !
          </div>
        </div>
      </div>
    );
  }
  