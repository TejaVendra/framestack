import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Nav from "../Components/nav";


let apiUrl = import.meta.env.VITE_API_END_POINT;

const Reset = () => {
  const { uid, token } = useParams(); // extracted from URL
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (password !== confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.put(`${apiUrl}/reset-password/${uid}/${token}/`, {
        password: password, 
      });

      setSuccess("✨ Your password has been reset successfully!");
      setPassword("");
      setConfirmPassword("");

      setTimeout(() => {
        navigate("/login"); // redirect to login after success
      }, 2500);
    } catch (err) {
      setError(
        err.response?.data?.message || "Failed to reset password. Try again."
      );
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen bg-black overflow-hidden flex flex-col">
      {/* Background Effects */}
      <div className="absolute top-0 left-0 w-full h-full">
        <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 opacity-30 rounded-full w-72 h-72 absolute -top-24 -left-24 animate-blob"></span>
        <span className="bg-gradient-to-r from-green-400 via-teal-400 to-blue-400 opacity-30 rounded-full w-96 h-96 absolute -bottom-32 right-10 animate-blob animation-delay-2000"></span>
        <span className="bg-gradient-to-r from-yellow-400 via-orange-400 to-pink-400 opacity-20 rounded-full w-80 h-80 absolute top-1/2 left-1/2 animate-blob animation-delay-4000"></span>
      </div>

      {/* Navigation */}
      <Nav />

      {/* Reset Password Form */}
      <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="w-full max-w-md bg-gray-900 bg-opacity-90 backdrop-blur-md rounded-2xl shadow-2xl p-8 sm:p-10 animate-fadeIn">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4 text-center tracking-wide">
            Set New Password
          </h2>
          <p className="text-gray-400 text-center mb-8 text-sm">
            Enter your new password to unlock your magical journey
          </p>

          {error && (
            <div className="mb-4 p-3 bg-red-900 text-red-200 rounded-lg text-sm">
              {error}
            </div>
          )}

          {success && (
            <div className="mb-4 p-3 bg-green-900 text-green-200 rounded-lg text-sm">
              {success}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-300 mb-2"
              >
                New Password
              </label>
              <input
                type="password"
                id="password"
                className="w-full px-4 py-3 rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
                placeholder="Enter new password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-gray-300 mb-2"
              >
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                className="w-full px-4 py-3 rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
                placeholder="Confirm new password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3 rounded-lg bg-gradient-to-r transition-all shadow-lg font-semibold text-lg flex items-center justify-center ${
                loading
                  ? "from-gray-600 to-gray-700 text-gray-400 cursor-not-allowed"
                  : "from-purple-500 to-pink-500 hover:from-pink-500 hover:to-purple-600 text-white"
              }`}
            >
              {loading ? "Resetting..." : "Set New Password"}
            </button>
          </form>

          <p className="text-center text-gray-400 mt-6 text-sm">
            Remembered your password?{" "}
            <a href="/login" className="text-purple-500 hover:underline">
              Back to Login
            </a>
          </p>
        </div>
      </div>

      {/* Footer */}
      <footer className="relative z-10 py-6 text-center text-gray-400 text-sm">
        <p>&copy; 2025 All rights reserved.</p>
      </footer>

      {/* Animations */}
      <style jsx>{`
        @keyframes fadeIn {
          0% {
            opacity: 0;
            transform: translateY(20px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.8s ease-out;
        }

        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
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

export default Reset;
