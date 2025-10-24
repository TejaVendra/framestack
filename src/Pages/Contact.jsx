import { useState, useEffect } from "react";
import Copywright from "../Components/Copywright";
import { FaEnvelope, FaUser, FaCommentDots, FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";
import axios from "axios";


let apiUrl = import.meta.env.VITE_API_END_POINT;
export default function ContactUs() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);

  // Toast state
  const [toast, setToast] = useState({ message: "", type: "", visible: false });

  const showToast = (message, type = "success", duration = 3000) => {
    setToast({ message, type, visible: true });
    setTimeout(() => setToast({ message: "", type, visible: false }), duration);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data } = await axios.post(`${apiUrl}/contact-message/`, formData);

      showToast(
        `🎉 Thank you ${data.name}! We’ve received your message. We will connect to you soon at ${data.email}.`,
        "success"
      );

      // Reset form
      setFormData({ name: "", email: "", message: "" });
    } catch (err) {
      console.error(err);
      const msg = err.response?.data?.error || "❌ Something went wrong! Please try again.";
      showToast(msg, "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {/* Toast Notification */}
      {toast.visible && (
        <div
          className={`fixed top-6 right-6 z-50 px-6 py-4 rounded-lg shadow-lg font-semibold ${
            toast.type === "success"
              ? "bg-green-600 text-white border-green-400"
              : "bg-red-600 text-white border-red-400"
          } animate-fadeIn`}
        >
          {toast.message}
        </div>
      )}

      <div className="relative w-full flex flex-col min-h-screen bg-black overflow-hidden">
        {/* Animated blobs */}
        <div className="absolute top-0 left-0 w-full h-full -z-10">
          <span className="absolute w-96 h-96 bg-gradient-to-r from-indigo-900 to-purple-900 opacity-20 rounded-full filter blur-3xl animate-blob top-[-20%] left-[-10%]"></span>
          <span className="absolute w-80 h-80 bg-gradient-to-r from-pink-900 to-rose-900 opacity-20 rounded-full filter blur-3xl animate-blob animation-delay-2000 top-[30%] left-[30%]"></span>
          <span className="absolute w-96 h-96 bg-gradient-to-r from-cyan-900 to-blue-900 opacity-20 rounded-full filter blur-3xl animate-blob animation-delay-4000 top-[10%] right-[-15%]"></span>
          <span className="absolute w-72 h-72 bg-gradient-to-r from-emerald-900 to-teal-900 opacity-20 rounded-full filter blur-3xl animate-blob animation-delay-6000 bottom-[-10%] left-[20%]"></span>
        </div>

        {/* Left Social Box */}
        <div className="fixed top-1/3 left-6 flex flex-col space-y-6 z-50">
          <a href="https://instagram.com/" target="_blank" rel="noopener noreferrer" className="social-icon">
            <FaInstagram />
          </a>
          <a href="mailto:example@email.com" className="social-icon">
            <FaEnvelope />
          </a>
          <a href="https://linkedin.com/" target="_blank" rel="noopener noreferrer" className="social-icon">
            <FaLinkedin />
          </a>
          <a href="https://twitter.com/" target="_blank" rel="noopener noreferrer" className="social-icon">
            <FaTwitter />
          </a>
        </div>

        {/* Centered Contact Card */}
        <div className="flex-1 flex items-center justify-center p-4">
          <div className="w-full max-w-6xl bg-gray-900/80 backdrop-blur-lg rounded-3xl shadow-2xl overflow-hidden flex flex-col lg:flex-row border border-gray-700">
            {/* Left Side Info */}
            <div className="lg:w-1/2 p-10 bg-gradient-to-br from-gray-900 to-black text-white flex flex-col justify-center relative">
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-pink-500/10 rounded-l-3xl"></div>
              <h1 className="text-3xl lg:text-4xl font-bold mb-4 drop-shadow-lg relative z-10">
                Let's Work Together
              </h1>
              <p className="text-gray-300 text-lg relative z-10">
                Have a project in mind? Send us a message and we'll make it happen.
              </p>
            </div>

            {/* Right Side Form */}
            <div className="lg:w-1/2 p-10 flex items-center justify-center bg-gray-900/90 relative">
              <div className="absolute inset-0 bg-gradient-to-br from-gray-800/30 to-black/50 rounded-r-3xl"></div>
              <form onSubmit={handleSubmit} className="w-full max-w-md space-y-6 animate-fadeIn relative z-10">
                <h2 className="text-2xl font-bold text-white text-center drop-shadow-md">Contact Us</h2>
                <p className="text-gray-400 text-sm text-center">Fill the form and we will get back to you shortly.</p>

                <div className="space-y-4">
                  <div className="relative">
                    <FaUser className="absolute top-3 left-3 text-gray-400" />
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Your Name"
                      className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-700 bg-gray-900/70 text-white placeholder-gray-500 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition backdrop-blur-sm"
                      required
                    />
                  </div>

                  <div className="relative">
                    <FaEnvelope className="absolute top-3 left-3 text-gray-400" />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Your Email"
                      className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-700 bg-gray-900/70 text-white placeholder-gray-500 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition backdrop-blur-sm"
                      required
                    />
                  </div>

                  <div className="relative">
                    <FaCommentDots className="absolute top-3 left-3 text-gray-400" />
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows="5"
                      placeholder="Your Message"
                      className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-700 bg-gray-900/70 text-white placeholder-gray-500 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition backdrop-blur-sm"
                      required
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className={`relative w-full py-3 rounded-full bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white font-semibold overflow-hidden group shadow-lg hover:shadow-indigo-500/30 transition-all duration-300 ${
                    loading ? "opacity-70 cursor-not-allowed" : ""
                  }`}
                >
                  <span className="relative z-10">{loading ? "Sending..." : "Send Message"}</span>
                  <span className="absolute inset-0 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 opacity-40 blur-xl animate-pulse rounded-full"></span>
                  <span className="absolute left-[-100%] top-0 w-full h-full bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-0 group-hover:opacity-100 transform -rotate-12 transition-all duration-1000 group-hover:left-[100%]"></span>
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Animations & Styling */}
        <style jsx>{`
          .animate-fadeIn { animation: fadeIn 0.8s ease-out; }
          @keyframes fadeIn { 0% { opacity: 0; transform: translateY(20px);} 100% { opacity: 1; transform: translateY(0);} }

          .animate-blob { animation: blob 12s infinite cubic-bezier(0.37,0,0.63,1); }
          @keyframes blob { 0% { transform: translate(0,0) scale(1);} 33% { transform: translate(30px,-50px) scale(1.2);} 66% { transform: translate(-20px,20px) scale(0.9);} 100% { transform: translate(0,0) scale(1);} }
          .animation-delay-2000 { animation-delay: 2s; }
          .animation-delay-4000 { animation-delay: 4s; }
          .animation-delay-6000 { animation-delay: 6s; }

          @keyframes pulseGlow { 0%,100%{opacity:0.4;transform:scale(1);} 50%{opacity:0.7;transform:scale(1.05);} }
          .animate-pulse { animation: pulseGlow 3s infinite; }

          .social-icon { font-size:1.8rem; color:white; display:block; width:50px; height:50px; line-height:50px; text-align:center; border-radius:50%; background:rgba(30,30,30,0.7); backdrop-filter: blur(5px); box-shadow:0 0 10px rgba(0,0,0,0.3); transition:0.3s; }
          .social-icon:hover { color:#ff00ff; transform:scale(1.2); text-shadow:0 0 15px #ff00ff,0 0 25px #ff00ff; box-shadow:0 0 20px rgba(255,0,255,0.5);}
        `}</style>
      </div>
      <Copywright />
    </div>
  );
}
