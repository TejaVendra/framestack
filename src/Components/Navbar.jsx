
// Navbar.jsx
import React, { useState, useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { CiMenuBurger } from "react-icons/ci";
import { AuthContext } from "../context/AuthProvider";

const Navbar = () => {
  const { authTokens, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const userName = authTokens?.user?.name || "User";
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    setIsProfileMenuOpen(false);
    navigate("/login");
  };

  return (
    <nav className="fixed top-0 left-0 right-0 bg-black/80 backdrop-blur-md h-16 z-50 border-b border-gray-800">
      <div className="h-full px-4 sm:px-6 flex items-center justify-between">
        {/* Left: Logo + Hamburger */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => {
              const event = new CustomEvent('toggleSidebar');
              window.dispatchEvent(event);
            }}
            className="lg:hidden text-white text-2xl"
          >
            <CiMenuBurger />
          </button>
          <NavLink to="/" className="flex items-center gap-2">
            <img src="./logosvg.svg" alt="logo" className="h-8 w-auto" />
            <h4 className="font-bold text-lg text-white hidden sm:block">FrameStack</h4>
          </NavLink>
        </div>

        {/* Center: Nav Links */}
        <div className="hidden lg:flex items-center gap-8">
          <NavLink to="/price" className="relative text-white font-medium group">
            Pricing
            <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-cyan-400 transition-all duration-300 group-hover:w-full"></span>
          </NavLink>

          <NavLink to="/contact-page" className="relative text-white font-medium group">
            Contact
            <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-cyan-400 transition-all duration-300 group-hover:w-full"></span>
          </NavLink>
        </div>

        {/* Right: Profile */}
        <div className="relative">
          <button
            onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
            className="h-10 w-10 rounded-full bg-gradient-to-r from-cyan-500 to-purple-500 flex items-center justify-center text-white font-bold hover:scale-110 transition-transform"
          >
            {userName.charAt(0)}
          </button>

          {isProfileMenuOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-gray-800 rounded-lg shadow-xl border border-gray-700">
              <div className="py-1">
                <div className="px-4 py-2 border-b border-gray-700">
                  <p className="text-sm text-gray-400">Signed in as</p>
                  <p className="text-sm font-medium text-white truncate">{userName}</p>
                </div>
                <NavLink
                  to="/profile"
                  className="block px-4 py-2 text-sm text-white hover:bg-gray-700 transition-colors"
                  onClick={() => setIsProfileMenuOpen(false)}
                >
                  Account Settings
                </NavLink>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-gray-700 transition-colors"
                >
                  Logout
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;