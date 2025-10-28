
import { useState } from "react";
import { motion } from "framer-motion";
import { FaQuoteLeft, FaStar } from "react-icons/fa";

const testimonials = [
  {
    name: "Leela Krishna",
    role: "Student Developer",
    message: "I was struggling with my old hosting provider, but these servers are lightning fast! My portfolio site went from loading in 5 seconds to under 1 second. Plus, their support actually responds when I need help. Totally worth it!",
    avatar: "LK",
    rating: 5,
  },
  {
    name: "Thanay",
    role: "Student Mechanical",
    message: "Needed a website for my ECS project and they delivered big time! Fast turnaround, understood exactly what I wanted, and the site runs flawlessly. My professor was impressed too. Definitely recommend!",
    avatar: "TY",
    rating: 5,
  },
  {
    name: "Toshith",
    role: "Student",
    message: "These guys built my portfolio website and honestly, it turned out way better than I imagined! Clean design, super smooth, and I've already landed two clients through it. Couldn't have asked for better work!",
    avatar: "TH",
    rating: 5,
  },
];

export default function Testimonials() {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  return (
    <div className="py-20 px-6 md:px-16 bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white">
      <motion.h2 
        className="text-4xl md:text-5xl font-bold mb-16 text-center"
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true, margin: "-100px" }}
      >
        What Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-indigo-500">Clients Say</span>
      </motion.h2>
      
      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
        {testimonials.map((t, index) => (
          <motion.div
            key={index}
            className="relative bg-gray-800/20 backdrop-blur-lg p-8 rounded-2xl border border-gray-700/50 shadow-2xl overflow-hidden"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
            viewport={{ once: true, margin: "-100px" }}
            whileHover={{ 
              y: -10,
              boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(99, 102, 241, 0.3)"
            }}
            onHoverStart={() => setHoveredIndex(index)}
            onHoverEnd={() => setHoveredIndex(null)}
          >
            {/* Animated background element */}
            <motion.div 
              className="absolute -top-20 -right-20 w-40 h-40 rounded-full bg-indigo-500/10"
              animate={{ 
                scale: hoveredIndex === index ? [1, 1.5, 1] : 1,
                opacity: hoveredIndex === index ? [0.1, 0.15, 0.1] : 0.1
              }}
              transition={{ 
                duration: 2,
                repeat: hoveredIndex === index ? Infinity : 0,
                repeatType: "reverse"
              }}
            />
            
            <div className="relative z-10">
              <FaQuoteLeft className="text-indigo-500 mb-6 text-3xl" />
              
              <motion.p 
                className="text-gray-300 mb-6 text-lg leading-relaxed"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: index * 0.2 + 0.3 }}
              >
                {t.message}
              </motion.p>
              
              {/* Rating stars */}
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.2 + 0.5 + i * 0.1 }}
                  >
                    <FaStar className="text-yellow-400" />
                  </motion.div>
                ))}
              </div>
              
              <div className="flex items-center">
                <motion.div 
                  className="w-14 h-14 rounded-full bg-gradient-to-br from-cyan-500 to-indigo-600 flex items-center justify-center text-white font-bold mr-4"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: index * 0.2 + 0.4, type: "spring", stiffness: 300 }}
                  whileHover={{ scale: 1.1 }}
                >
                  {t.avatar}
                </motion.div>
                
                <div>
                  <motion.h3 
                    className="font-bold text-xl"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.2 + 0.5 }}
                  >
                    {t.name}
                  </motion.h3>
                  <motion.span 
                    className="text-gray-400 text-sm"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.2 + 0.6 }}
                  >
                    {t.role}
                  </motion.span>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}