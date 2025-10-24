
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../context/axiosInstance";
import { FaKey, FaSignOutAlt } from "react-icons/fa";
const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState({ text: "", type: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  // Fetch profile data
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("access_token");
        if (!token) return navigate("/login");

        const response = await axiosInstance.get("profile/");
        setUser(response.data);
       
      } catch (error) {
       
        if (error.response?.status === 401) navigate("/login");
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, [navigate]);
   
  const handleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    window.location.reload();
  };

  // ✅ Updated handleChangePassword using axiosInstance (includes token)
  const handleChangePassword = async () => {
    if (newPassword !== confirmPassword) {
      setMessage({ text: "New passwords do not match!", type: "error" });
      return;
    }
    if (newPassword.length < 8) {
      setMessage({ text: "Password must be at least 8 characters", type: "error" });
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await axiosInstance.put("change-password/", {
        old_password: oldPassword,
        new_password: newPassword,
      });

      setMessage({ 
        text: response.data.detail || "Password updated successfully!", 
        type: "success" 
      });
      setOldPassword("");
      setNewPassword("");
      setConfirmPassword("");
      setTimeout(() => {
        setShowPasswordModal(false);
        setMessage({ text: "", type: "" }); // Clear message when closing
      }, 1500);
    } catch (err) {
      console.log(err);
      // ✅ Fixed the typo here and improved error handling
      const errorMessage = err.response?.data?.old_password || 
                           err.response?.data?.new_password || 
                           err.response?.data?.detail || 
                           "Failed to update password.";
      setMessage({
        text: errorMessage,
        type: "error",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const closeModal = () => {
    setShowPasswordModal(false);
    setMessage({ text: "", type: "" });
    setOldPassword("");
    setNewPassword("");
    setConfirmPassword("");
  };

  if (loading) {
    return (
      <div className="pt-50 flex justify-center items-center h-screen bg-gradient-to-br from-indigo-950 via-gray-900 to-gray-950">
        <div className="animate-pulse flex flex-col items-center">
          <div className="rounded-full bg-indigo-900 h-16 w-16"></div>
          <p className="mt-4 text-indigo-200">Loading profile...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="pt-50 min-h-screen bg-gradient-to-br from-indigo-950 via-gray-900 to-gray-950 flex items-center justify-center">
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-8 max-w-md w-full border border-gray-700 shadow-2xl">
          <p className="text-center text-gray-300">No profile data found.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-50 min-h-screen bg-gradient-to-br from-indigo-950 via-gray-900 to-gray-950 py-12 px-4 sm:px-6">
      <div className="max-w-md mx-auto bg-gray-800/40 backdrop-blur-lg rounded-2xl shadow-2xl overflow-hidden border border-gray-700">
        {/* Header */}
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-6 text-center">
          <div className="mx-auto w-24 h-24 rounded-full bg-gradient-to-br from-white to-gray-200 flex items-center justify-center text-3xl font-bold text-gray-800 shadow-lg border-4 border-white/20">
            {user.name?.charAt(0).toUpperCase()}
          </div>
          <h1 className="text-2xl font-bold mt-4 text-white">{user.name}</h1>
          <p className="text-indigo-200">{user.email}</p>
        </div>

        {/* Profile Content */}
        <div className="p-6 space-y-5">
          <div className="flex justify-between items-center pb-3 border-b border-gray-700">
            <span className="text-gray-400">Business Name</span>
            <span className="font-medium text-white">{user.business_name || "—"}</span>
          </div>
          <div className="flex justify-between items-center pb-3 border-b border-gray-700">
            <span className="text-gray-400">Account Status</span>
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-900/30 text-green-400 border border-green-800/50">
              Active
            </span>
          </div>
          <div className="flex justify-between items-center pb-3 border-b border-gray-700">
            <span className="text-gray-400">Price plan</span>
            <span className="font-medium text-white">{user.plan || "-"}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-400">Credits</span>
            <span className="font-medium text-white">{user.credit}</span>
          </div>

          {/* Action Buttons */}
          <div className="mt-8 space-y-4">
           <button
            onClick={() => setShowPasswordModal(true)}
            className="w-full py-3.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-semibold transition-all duration-300 shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/40 flex items-center justify-center gap-2"
          >
            <FaKey className="text-lg" />
            Change Password
          </button>

          <button
            onClick={handleLogout}
            className="w-full py-3.5 rounded-xl bg-gradient-to-r from-rose-600 to-red-600 hover:from-rose-500 hover:to-red-500 text-white font-semibold transition-all duration-300 shadow-lg shadow-rose-500/20 hover:shadow-rose-500/40 flex items-center justify-center gap-2"
          >
            <FaSignOutAlt className="text-lg" />
            Logout
          </button>
          </div>
        </div>
      </div>

      {/* Password Modal */}
      {showPasswordModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4 pt-24">
          <div className="bg-gray-800 rounded-2xl p-6 w-full max-w-sm border border-gray-700 shadow-2xl">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-white">Change Password</h2>
              <button onClick={closeModal} className="text-gray-400 hover:text-white transition-colors">
                ✕
              </button>
            </div>
            <div className="space-y-4">
              <input
                type="password"
                placeholder="Old Password"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
                className="w-full p-3 rounded-lg bg-gray-700/50 border border-gray-600 text-white"
                disabled={isSubmitting}
              />
              <input
                type="password"
                placeholder="New Password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full p-3 rounded-lg bg-gray-700/50 border border-gray-600 text-white"
                disabled={isSubmitting}
              />
              <input
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full p-3 rounded-lg bg-gray-700/50 border border-gray-600 text-white"
                disabled={isSubmitting}
              />
            </div>
            {message.text && (
              <div className={`mt-4 p-3 rounded-lg text-sm ${
                message.type === "error" ? "bg-rose-900/30 text-rose-300" : "bg-emerald-900/30 text-emerald-300"
              }`}>
                {message.text}
              </div>
            )}
            <div className="mt-6 flex justify-end gap-3">
              <button 
                onClick={closeModal} 
                className="px-5 py-2.5 rounded-lg bg-gray-700 text-white"
                disabled={isSubmitting}
              >
                Cancel
              </button>
              <button
                onClick={handleChangePassword}
                disabled={isSubmitting}
                className="px-5 py-2.5 rounded-lg bg-gradient-to-r from-emerald-600 to-teal-600 text-white disabled:opacity-50"
              >
                {isSubmitting ? "Updating..." : "Update Password"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;