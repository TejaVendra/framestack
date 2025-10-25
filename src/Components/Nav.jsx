
import React, { useState, useEffect, useContext } from "react";
import { NavLink } from "react-router-dom";
import { CiMenuBurger } from "react-icons/ci";
import { IoMdClose } from "react-icons/io";
import { AuthContext } from "../context/AuthProvider";

const Nav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { authTokens, logoutUser } = useContext(AuthContext); // Fixed: use correct context function name

  const toggle = () => setIsOpen(!isOpen);

  // Fixed: Added dependency array to useEffect
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Fixed: Added dependency array to useEffect
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) setIsOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Fixed: Added proper accessibility attributes
  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Services", path: "/services" },
    { name: "Pricing", path: "/price" },
    { name: "Contact", path: "/contact-page" },
  ];

  // Fixed: Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  return (
    <div
      className={`w-full fixed top-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-black/80 backdrop-blur-md py-2 shadow-lg"
          : "bg-transparent py-3"
      }`}
    >
      <div className="w-full flex items-center justify-between px-6 sm:px-10 lg:px-[8rem]">
        {/* Logo */}
        <NavLink to="/" className="flex items-center gap-2">
          <img
            src="./logosvg.svg"
            alt="logo"
            className="h-10 w-auto transition-transform duration-300 hover:scale-110"
          />
          <h4 className="font-bold text-xl text-white">FrameStack</h4>
        </NavLink>

        {/* Mobile Hamburger */}
        <button
          onClick={toggle}
          className="lg:hidden text-white z-50"
          aria-label={isOpen ? "Close menu" : "Open menu"}
          aria-expanded={isOpen}
        >
          {isOpen ? <IoMdClose className="text-3xl" /> : <CiMenuBurger className="text-3xl" />}
        </button>

        {/* Mobile Menu */}
        <div
          className={`fixed inset-0 bg-black/95 z-40 flex flex-col items-center justify-center gap-10 transition-all duration-500 ease-in-out ${
            isOpen ? "opacity-100 visible" : "opacity-0 invisible"
          }`}
        >
          {navLinks.map((link) => (
            <NavLink
              key={link.name} // Fixed: Use unique key instead of index
              to={link.path}
              onClick={() => setIsOpen(false)}
              className="text-3xl font-semibold text-white relative group"
            >
              {link.name}
              <span className="absolute bottom-0 left-0 w-0 h-1 bg-cyan-400 group-hover:w-full transition-all duration-300"></span>
            </NavLink>
          ))}

          {/* Auth Buttons (Mobile) */}
          <div className="flex flex-col items-center gap-4 mt-8">
            {authTokens ? (
              <button
                onClick={() => {
                  logoutUser(); // Fixed: Use correct context function
                  setIsOpen(false);
                }}
                className="w-32 py-2 rounded-full border border-red-400 text-red-400 text-center hover:bg-red-400 hover:text-black transition-all duration-300"
              >
                Logout
              </button>
            ) : (
              <>
                <NavLink
                  to="/login"
                  onClick={() => setIsOpen(false)}
                  className="w-32 py-2 rounded-full border border-cyan-400 text-cyan-400 text-center hover:bg-cyan-400 hover:text-black transition-all duration-300"
                >
                  Login
                </NavLink>
                <NavLink
                  to="/signup"
                  onClick={() => setIsOpen(false)}
                  className="w-32 py-2 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 text-white text-center hover:from-purple-600 hover:to-pink-500 transition-all duration-300 shadow-lg shadow-pink-500/30"
                >
                  Signup
                </NavLink>
              </>
            )}
          </div>
        </div>

        {/* Desktop Menu */}
        <div className="hidden lg:flex items-center gap-10">
          {navLinks.map((link) => (
            <NavLink
              key={link.name} // Fixed: Use unique key instead of index
              to={link.path}
              className="text-white font-medium relative group"
            >
              {link.name}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-cyan-400 group-hover:w-full transition-all duration-300"></span>
            </NavLink>
          ))}
        </div>

        {/* Desktop Buttons */}
        <div className="hidden lg:flex items-center gap-4">
          {authTokens ? (
            <button
              onClick={logoutUser} // Fixed: Use correct context function
              className="px-4 py-1 rounded-full border border-red-400 text-red-400 hover:bg-red-400 hover:text-black transition-all duration-300"
            >
              Logout
            </button>
          ) : (
            <>
              <NavLink
                to="/login"
                className="px-4 py-1 rounded-full border border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-black transition-all duration-300"
              >
                Login
              </NavLink>
              <NavLink
                to="/signup"
                className="px-6 py-2 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 text-white hover:from-purple-600 hover:to-pink-500 transition-all duration-300 shadow-lg shadow-pink-500/30"
              >
                Signup
              </NavLink>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Nav;