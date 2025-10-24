
import React, { useState, useEffect } from "react";
import Nav from "../Components/Nav";
import Copywright from "../Components/Copywright";
import axios from "axios";
import { useNavigate } from "react-router-dom";


let apiUrl = import.meta.env.VITE_API_END_POINT;

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [showErrorPopup, setShowErrorPopup] = useState(false);

  const navigate = useNavigate();

  // Show error popup when an error is set
  useEffect(() => {
    if (error) {
      setShowErrorPopup(true);
      const timer = setTimeout(() => {
        setShowErrorPopup(false);
        setError("");
      }, 5000); // Auto-hide after 5 seconds

      return () => clearTimeout(timer);
    }
  }, [error]);

  // Clear error if user starts typing again
  useEffect(() => {
    if (error) {
      setError("");
      setShowErrorPopup(false);
    }
  }, [email, password]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const response = await axios.post(`${apiUrl}/login/`, {
        email,
        password,
      });

      const { access, refresh } = response.data;

      if (access && refresh) {
        if (rememberMe) {
          localStorage.setItem("access_token", access);
          localStorage.setItem("refresh_token", refresh);
        } else {
          sessionStorage.setItem("access_token", access);
          sessionStorage.setItem("refresh_token", refresh);
        }
        window.location.reload()
        navigate("/dashboard"); // Redirect on successful login
      } else {
        setError("Login failed. No authentication tokens received.");
      }
    } catch (err) {
      if (err.response) {
        setError(err.response.data.message || "Invalid email or password.");
      } else if (err.request) {
        setError("Network issue. Please check your connection.");
      } else {
        setError("Something went wrong. Please try again.");
      }
      console.error("Login error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const dismissError = () => {
    setShowErrorPopup(false);
    setError("");
  };

  return (
    <div className="relative min-h-screen bg-black overflow-hidden flex flex-col">
      {/* Animated Background Blobs */}
      <div className="absolute top-0 left-0 w-full h-full">
        <span className="bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 opacity-30 rounded-full w-72 h-72 absolute -top-24 -left-24 animate-blob"></span>
        <span className="bg-gradient-to-r from-green-400 via-teal-400 to-blue-400 opacity-30 rounded-full w-96 h-96 absolute -bottom-32 right-10 animate-blob animation-delay-2000"></span>
        <span className="bg-gradient-to-r from-yellow-400 via-orange-400 to-pink-400 opacity-20 rounded-full w-80 h-80 absolute top-1/2 left-1/2 animate-blob animation-delay-4000"></span>
      </div>

      <Nav />

      {/* Error Popup */}
      {showErrorPopup && (
        <div className="fixed top-4 right-4 z-50">
          <div className="bg-red-900 text-red-100 px-6 py-4 rounded-lg shadow-2xl border border-red-700 flex items-center animate-slideIn">
            <div className="flex-1">
              <p className="font-medium">Login Error</p>
              <p className="text-sm mt-1">{error}</p>
            </div>
            <button
              onClick={dismissError}
              aria-label="Close error popup"
              className="ml-4 text-red-300 hover:text-white focus:outline-none"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      )}

      {/* Login Form */}
      <div className="h-[80vh] flex items-center justify-center px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="w-full max-w-md bg-gray-900 bg-opacity-90 backdrop-blur-md rounded-2xl shadow-2xl p-8 sm:p-10 animate-fadeIn">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-8 text-center tracking-wide">
            Welcome Back
          </h2>
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                className="w-full px-4 py-3 rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500 transition-all"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label htmlFor="password" className="block text-sm font-medium text-gray-300">
                  Password
                </label>
                <a href="/reset-password" className="text-sm text-pink-500 hover:underline">
                  Forgot Password?
                </a>
              </div>
              <input
                type="password"
                id="password"
                className="w-full px-4 py-3 rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500 transition-all"
                placeholder="********"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="remember"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="w-4 h-4 text-pink-500 bg-gray-800 border-gray-600 rounded focus:ring-pink-500"
              />
              <label htmlFor="remember" className="ml-2 text-sm text-gray-300">
                Remember me
              </label>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className={`w-full py-3 rounded-lg bg-gradient-to-r transition-all shadow-lg font-semibold text-lg flex items-center justify-center ${
                isLoading
                  ? "from-gray-600 to-gray-700 text-gray-400 cursor-not-allowed"
                  : "from-pink-500 to-purple-600 hover:from-purple-600 hover:to-pink-500 text-white"
              }`}
            >
              {isLoading ? (
                <>
                  <svg
                    className="animate-spin h-5 w-5 text-white mr-2"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Logging in...
                </>
              ) : (
                "Log In"
              )}
            </button>
          </form>

          <p className="text-center text-gray-400 mt-6 text-sm">
            Don't have an account?{" "}
            <span onClick={() => navigate('/signup')}  className="text-pink-500 hover:underline">
              Sign Up
            </span>
          </p>
        </div>
      </div>

      <Copywright />

      {/* Animations */}
      <style jsx>{`
        @keyframes fadeIn {
          0% { opacity: 0; transform: translateY(20px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.8s ease-out;
        }

        @keyframes slideIn {
          0% { transform: translateX(100%); opacity: 0; }
          100% { transform: translateX(0); opacity: 1; }
        }
        .animate-slideIn {
          animation: slideIn 0.3s ease-out;
        }

        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-blob {
          animation: blob 8s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
};

export default Login;