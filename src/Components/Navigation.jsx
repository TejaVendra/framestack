// Navigation.jsx
import React, { useState, useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { CiMenuBurger } from "react-icons/ci";
import { IoMdClose } from "react-icons/io";
import { AuthContext } from "../context/AuthProvider";
import {
  FaTachometerAlt,
  FaProjectDiagram,
  FaLayerGroup,
  FaCog,
  FaComments,
  FaHistory,
  FaSignOutAlt,
  FaEnvelope ,
  FaDollarSign 
} from "react-icons/fa";

const Navigation = () => {
  const { authTokens, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const userName = authTokens?.user?.name || "User";

  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const handleLogout = () => {
    logout();
    setIsProfileMenuOpen(false);
    setIsSidebarOpen(false);
    navigate("/login");
  };
  

  const closeSidebar = () => setIsSidebarOpen(false);

  return (
    <>
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 bg-black/80 backdrop-blur-md h-16 z-50 border-b border-gray-800">
        <div className="h-full px-4 sm:px-6 flex items-center justify-between">
          {/* Left: Logo + Hamburger */}
          <div className="flex items-center gap-4">
            <button
              onClick={toggleSidebar}
              className="lg:hidden text-white text-2xl menu-button"
            >
              {isSidebarOpen ? <IoMdClose /> : <CiMenuBurger />}
            </button>
            <NavLink to="/" className="flex items-center gap-2">
              <img src="./logosvg.svg" alt="logo" className="h-8 w-auto" />
              <h4 className="font-bold text-lg text-white hidden sm:block">
                FrameStack
              </h4>
            </NavLink>
          </div>

          {/* Center: Nav Links (Desktop only) */}
          <div className="hidden lg:flex items-center gap-8">
            <NavLink
              to="/price"
              className="relative text-white font-medium group"
            >
              Pricing
              <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-cyan-400 transition-all duration-300 group-hover:w-full"></span>
            </NavLink>
            <NavLink
              to="/contact-page"
              className="relative text-white font-medium group"
            >
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
              <div className="absolute right-0 mt-2 w-48 bg-gray-800 rounded-lg shadow-xl border border-gray-700 z-50">
                <div className="py-1">
                  <div className="px-4 py-2 border-b border-gray-700">
                    <p className="text-sm text-gray-400">Signed in as</p>
                    <p className="text-sm font-medium text-white truncate">
                      {userName}
                    </p>
                  </div>
                 <NavLink
                  to="/profile"
                  className="flex items-center gap-2 px-4 py-2 text-sm text-white hover:bg-gray-700 transition-colors rounded"
                  onClick={() => setIsProfileMenuOpen(false)}
                >
                  <FaCog className="text-lg" />
                  <span>Account Settings</span>
                </NavLink>

                 <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-400 hover:bg-gray-700 transition-colors rounded"
                  >
                    <FaSignOutAlt className="text-lg" />
                    <span>Log out</span>
                  </button>

                </div>
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* Mobile Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={closeSidebar}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-16 left-0 h-[calc(100vh-4rem)] w-64 bg-gray-900 border-r border-gray-800 z-50 transform transition-transform duration-300 lg:translate-x-0 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="p-4">
          <nav className="space-y-2">
           <NavLink
              to="/dashboard"
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 text-white rounded-lg transition-colors ${
                  isActive ? "bg-indigo-600 font-semibold" : "hover:bg-gray-800"
                }`
              }
              onClick={closeSidebar}
            >
              <FaTachometerAlt className="text-lg" />
              <span>Dashboard</span>
            </NavLink>

            <NavLink
              to="/website-requests"
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 text-white rounded-lg transition-colors ${
                  isActive ? "bg-indigo-600 font-semibold" : "hover:bg-gray-800"
                }`
              }
              onClick={closeSidebar}
            >
              <FaProjectDiagram className="text-lg" />
              <span>My Projects</span>
            </NavLink>

            <NavLink
              to="/templates"
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 text-white rounded-lg transition-colors ${
                  isActive ? "bg-indigo-600 font-semibold" : "hover:bg-gray-800"
                }`
              }
              onClick={closeSidebar}
            >
              <FaLayerGroup className="text-lg" />
              <span>Templates</span>
            </NavLink>

            <NavLink
              to="/profile"
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 text-white rounded-lg transition-colors ${
                  isActive ? "bg-indigo-600 font-semibold" : "hover:bg-gray-800"
                }`
              }
              onClick={closeSidebar}
            >
              <FaCog className="text-lg" />
              <span>Settings</span>
            </NavLink>

            <NavLink
              to="/chat"
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 text-white rounded-lg transition-colors ${
                  isActive ? "bg-indigo-600 font-semibold" : "hover:bg-gray-800"
                }`
              }
              onClick={closeSidebar}
            >
              <FaComments className="text-lg" />
              <span>Chat</span>
            </NavLink>

            <NavLink
              to="/orders"
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 text-white rounded-lg transition-colors ${
                  isActive ? "bg-indigo-600 font-semibold" : "hover:bg-gray-800"
                }`
              }
              onClick={closeSidebar}
            >
              <FaHistory className="text-lg" />
              <span>Order History</span>
            </NavLink>

              
           
              

              {/* Mobile-only links */}
              <div className="lg:hidden">
                <NavLink
                    to="/price"
                    className={({ isActive }) =>
                      `flex items-center gap-3 px-4 py-3 text-white rounded-lg transition-colors ${
                        isActive ? "bg-indigo-600 font-semibold" : "hover:bg-gray-800"
                      }`
                    }
                    onClick={closeSidebar}
                  >
                    <FaDollarSign className="text-lg" />
                    <span>Pricing</span>
                  </NavLink>

                  <NavLink
                    to="/contact-page"
                    className={({ isActive }) =>
                      `flex items-center gap-3 px-4 py-3 text-white rounded-lg transition-colors ${
                        isActive ? "bg-indigo-600 font-semibold" : "hover:bg-gray-800"
                      }`
                    }
                    onClick={closeSidebar}
                  >
                    <FaEnvelope className="text-lg" />
                    <span>Contact</span>
                  </NavLink>

            </div>
          </nav>
        </div>
      </aside>
    </>
  );
};

export default Navigation;
