
import React, { useState, useEffect } from "react";
import Copywright from "../Components/Copywright";
import axios from "axios";
import { useNavigate } from "react-router";


let apiUrl = import.meta.env.VITE_API_END_POINT;

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    business_name: "",
    password: "",
    agreed: false,
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState([]);
  const [success, setSuccess] = useState(false);
  const nav = useNavigate();

  // Auto-clear errors after 5 seconds with progress bar
  useEffect(() => {
    if (errors.length > 0) {
      const timer = setTimeout(() => {
        setErrors([]);
      }, 5000);
      
      return () => clearTimeout(timer);
    }
  }, [errors]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrors([]);
    setSuccess(false);

    // Validate agreement
    if (!formData.agreed) {
      setErrors(["You must agree to the Terms & Privacy Policy"]);
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post(`${apiUrl}/signup/`, {
        name: formData.name,
        email: formData.email,
        business_name: formData.business_name,
        password: formData.password,
      });
      console.log(response)
      setSuccess(true);
      nav('/login')
    } catch (err) {
        if (err.response) {
          console.log("Backend error:", err.response.data);

          // Collect all backend errors into separate blocks
          const backendErrors = Object.entries(err.response.data)
            .map(([field, messages]) => `${field}: ${messages.join(", ")}`);

          setErrors(backendErrors.length > 0 ? backendErrors : ["Registration failed. Please try again."]);
        } else if (err.request) {
          setErrors(["Network error. Please check your connection."]);
        } else {
          setErrors(["Registration failed. Please try again."]);
        }
        console.error("Signup error:", err);
      }
 finally {
      setLoading(false);
    }
  };

  // Spinner component
  const Spinner = () => (
    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg>
  );

  return (
    <>
      <div className="relative min-h-screen bg-black overflow-hidden flex flex-col">
        {/* Background Effects */}
        <div className="absolute top-0 left-0 w-full h-full">
          <span className="bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 opacity-30 rounded-full w-72 h-72 absolute -top-24 -left-24 animate-blob pointer-events-none"></span>
          <span className="bg-gradient-to-r from-green-400 via-teal-400 to-blue-400 opacity-30 rounded-full w-96 h-96 absolute -bottom-32 right-10 animate-blob animation-delay-2000 pointer-events-none"></span>
          <span className="bg-gradient-to-r from-yellow-400 via-orange-400 to-pink-400 opacity-20 rounded-full w-80 h-80 absolute top-1/2 left-1/2 animate-blob animation-delay-4000 pointer-events-none"></span>
        </div>

        {/* Signup Form */}
        <div className="h-[95vh] flex items-center justify-center px-4 sm:px-6 lg:px-8 relative z-10">
          <form
            className="w-full max-w-md bg-gray-900 bg-opacity-90 backdrop-blur-md rounded-2xl shadow-2xl p-8 sm:p-10 animate-fadeIn"
            onSubmit={handleSubmit}
          >
            <div className="mb-8 flex flex-col items-center">
              <span className="text-pink-500 text-3xl font-bold">Frame Stack</span>
              <h2 className="text-xl sm:text-2xl font-semibold mt-2 text-white text-center">
                Create Your Agency Account
              </h2>
              <p className="text-sm text-gray-400 mt-1 text-center">
                Start building digital experiences for your clients!
              </p>
            </div>

            {/* Error Messages with Progress Bar */}
            {errors.length > 0 && (
              <div className="mb-6 space-y-3">
                {errors.map((error, index) => (
                  <div 
                    key={index} 
                    className="p-4 bg-red-900 text-red-100 rounded-lg text-sm animate-fadeIn border border-red-700 shadow-lg relative overflow-hidden"
                  >
                    <div className="flex items-start">
                      <svg className="w-5 h-5 text-red-400 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                      </svg>
                      <div>{error}</div>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-red-500 animate-progress"></div>
                  </div>
                ))}
              </div>
            )}

            {/* Success Message */}
            {success && (
              <div className="mb-6 p-4 bg-green-900 text-green-100 rounded-lg text-sm animate-fadeIn border border-green-700 shadow-lg">
                <div className="flex items-start">
                  <svg className="w-5 h-5 text-green-400 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                  <div>Registration successful! Please check your email for verification.</div>
                </div>
              </div>
            )}

            {/* Form Fields */}
            <div className="space-y-4">
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-300">Name</label>
                <input
                  required
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your full name"
                  className="w-full px-4 py-3 rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500 transition-all"
                  disabled={loading}
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-300">Business Email</label>
                <input
                  required
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="we send all information to this email"
                  className="w-full px-4 py-3 rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500 transition-all"
                  disabled={loading}
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-300">Company Name</label>
                <input
                  required
                  type="text"
                  name="business_name"
                  value={formData.business_name}
                  onChange={handleChange}
                  placeholder="e.g. PixelWave Studios"
                  className="w-full px-4 py-3 rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500 transition-all"
                  disabled={loading}
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-300">Password</label>
                <input
                  required
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Create a strong password"
                  className="w-full px-4 py-3 rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500 transition-all"
                  disabled={loading}
                />
              </div>
              <div className="flex items-center">
                <input
                  required
                  type="checkbox"
                  name="agreed"
                  checked={formData.agreed}
                  onChange={handleChange}
                  className="mr-2 h-5 w-5 text-pink-500 rounded focus:ring-pink-500 bg-gray-700 border-gray-600"
                  disabled={loading}
                />
                <label className="text-sm text-gray-300">
                  I agree to the  <span  onClick={() => nav('/terms-and-conditions')}  className="text-pink-500 ml-2 text-sm underline">
             AgencyWeb Terms & Privacy Policy
              </span>
                </label>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full mt-6 py-3 rounded-lg bg-gradient-to-r transition-all shadow-lg font-semibold text-lg flex items-center justify-center ${
                loading
                  ? "from-gray-600 to-gray-700 text-gray-400 cursor-not-allowed"
                  : "from-pink-500 to-purple-600 hover:from-purple-600 hover:to-pink-500 text-white"
              }`}
            >
              {loading ? (
                <>
                  <Spinner />
                  <span className="ml-2">Creating Account...</span>
                </>
              ) : (
                "Sign Up"
              )}
            </button>

            <div className="mt-4 text-center">
              <span className="text-gray-400 text-sm">Already partnered with us?</span>
              <span  onClick={() => nav('/login')}  className="text-pink-500 ml-2 text-sm underline">
                Log In
              </span>
            </div>
          </form>
        </div>

        <Copywright className="relative z-10" />

        {/* Animations */}
        <style jsx>{`
          @keyframes fadeIn {
            0% { opacity: 0; transform: translateY(10px); }
            100% { opacity: 1; transform: translateY(0); }
          }
          .animate-fadeIn {
            animation: fadeIn 0.3s ease-out;
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
          .animation-delay-2000 { animation-delay: 2s; }
          .animation-delay-4000 { animation-delay: 4s; }
          
          @keyframes progress {
            0% { width: 100%; }
            100% { width: 0%; }
          }
          .animate-progress {
            animation: progress 5s linear forwards;
          }
        `}</style>
      </div>
    </>
  );
};

export default Signup;