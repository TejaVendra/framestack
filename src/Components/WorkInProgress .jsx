import React from "react";
import { FaTools } from "react-icons/fa";
import { motion } from "framer-motion";

const WorkInProgress = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white px-4">
      {/* Icon Animation */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
        className="text-blue-400 text-6xl mb-6"
      >
        <FaTools />
      </motion.div>

      {/* Text Section */}
      <h1 className="text-3xl md:text-5xl font-bold mb-4 text-center">
        We’re Working On This Feature
      </h1>
      <p className="text-gray-300 text-center max-w-md mb-8">
        Our team is working hard to bring something amazing here.  
        Stay tuned — it’ll be worth the wait!
      </p>

      {/* Loading Dots */}
      <div className="flex space-x-2">
        <motion.span
          className="w-3 h-3 bg-blue-400 rounded-full"
          animate={{ y: [0, -8, 0] }}
          transition={{ repeat: Infinity, duration: 0.8 }}
        />
        <motion.span
          className="w-3 h-3 bg-blue-400 rounded-full"
          animate={{ y: [0, -8, 0] }}
          transition={{ repeat: Infinity, duration: 0.8, delay: 0.2 }}
        />
        <motion.span
          className="w-3 h-3 bg-blue-400 rounded-full"
          animate={{ y: [0, -8, 0] }}
          transition={{ repeat: Infinity, duration: 0.8, delay: 0.4 }}
        />
      </div>
    </div>
  );
};

export default WorkInProgress;
