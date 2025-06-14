import { useNavigate } from "react-router-dom";

export const Appbar = () => {
  const navigate = useNavigate();  // ← add this

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/signin");            // ← now this will work
  };

  return (
    <div className="shadow h-14 flex justify-between">
      <div className="flex flex-col justify-center h-full ml-4">
        PayTM App
      </div>
      <div className="flex">
        <div className="flex flex-col justify-center h-full mr-4">
          Hello
        </div>
        <div className="rounded-xl h-12 w-19 bg-slate-200 flex justify-center mt-1 mr-2">
          <button
            className="flex flex-col justify-center h-full text-xl cursor-pointer"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};
