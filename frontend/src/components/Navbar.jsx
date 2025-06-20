import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import { GiNotebook } from "react-icons/gi";

function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const name = localStorage.getItem("name");
  const [menuOpen, setMenuOpen] = useState(false);

  const onLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("name");
    setMenuOpen(false);
    navigate("/login");
  };

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <nav className="bg-blue-800 text-white px-4 py-3 shadow-md ">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
       
        <div
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => navigate("/")}
        >
          <span className="text-2xl">
            <GiNotebook/>
          </span>
          <span className="text-lg font-bold  text-blue-200"> TASK MANAGER APP</span>
        </div>

        
        <button
          className="sm:hidden text-2xl focus:outline-none"
          onClick={toggleMenu}
        >
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>

        
        <div className="hidden sm:flex items-center gap-3">
          {token ? (
            <>
              <span className="text-sm font-medium">{name}</span>
              <button
                onClick={onLogout}
                className="bg-white text-blue-700 px-3 py-1 rounded hover:bg-slate-100 transition text-sm cursor-pointer"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => navigate("/login")}
                className="bg-white text-blue-700 px-3 py-1 rounded hover:bg-slate-100 transition text-sm cursor-pointer"
              >
                Login
              </button>
              <button
                onClick={() => navigate("/register")}
                className="bg-white text-blue-700 px-3 py-1 rounded hover:bg-slate-100 transition text-sm cursor-pointer"
              >
                Register
              </button>
            </>
          )}
        </div>
      </div>

 
      {menuOpen && (
        <div className="sm:hidden mt-3 px-2 flex flex-col items-start gap-2">
          {token ? (
            <>
              <span className="text-sm font-medium px-2">{name}</span>
              <button
                onClick={onLogout}
                className="bg-white text-blue-700 px-3 py-1 rounded hover:bg-slate-100 transition w-full text-left"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => {
                  setMenuOpen(false);
                  navigate("/login");
                }}
                className="bg-white text-blue-700 px-3 py-1 rounded hover:bg-slate-100 transition w-full text-left"
              >
                Login
              </button>
              <button
                onClick={() => {
                  setMenuOpen(false);
                  navigate("/register");
                }}
                className="bg-white text-blue-700 px-3 py-1 rounded hover:bg-slate-100 transition w-full text-left"
              >
                Register
              </button>
            </>
          )}
        </div>
      )}
    </nav>
  );
}

export default Navbar;
