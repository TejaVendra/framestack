
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

const faqData = [
  {
    question: "What is your refund policy?",
    answer: "We offer a 30-day money-back guarantee on all purchases. If you're not satisfied with our service, simply contact our support team within 30 days for a full refund.",
  },
  {
    question: "Can I upgrade my plan later?",
    answer: "Yes! You can upgrade anytime from your account settings. Your new plan will be immediately activated and any unused time from your current plan will be prorated.",
  },
  {
    question: "Do you offer support?",
    answer: "Yes! 24/7 support is available via chat and email. Our dedicated support team responds within 2 hours during business hours and within 12 hours during off-peak times.",
  },
];

export default function FAQ() {
  const [activeIndex, setActiveIndex] = useState(null);

  return (
    <div className="py-16 px-6 md:px-16 bg-gradient-to-br from-gray-900 to-black text-white">
      <motion.h2 
        className="text-4xl md:text-5xl font-bold mb-12 text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Frequently Asked Questions
      </motion.h2>
      
      <div className="max-w-3xl mx-auto space-y-4">
        {faqData.map((item, index) => (
          <motion.div
            key={index}
            className="border border-gray-700 rounded-xl overflow-hidden bg-gray-800/30 backdrop-blur-sm"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            whileHover={{ 
              scale: 1.02,
              boxShadow: "0 10px 30px -10px rgba(255, 255, 255, 0.1)"
            }}
          >
            <button
              className="w-full px-6 py-5 flex justify-between items-center text-left hover:bg-gray-800/50 transition-colors duration-300"
              onClick={() =>
                setActiveIndex(activeIndex === index ? null : index)
              }
            >
              <span className="font-medium text-lg">{item.question}</span>
              <motion.div
                animate={{ rotate: activeIndex === index ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                {activeIndex === index ? (
                  <FaChevronUp className="text-cyan-400" />
                ) : (
                  <FaChevronDown className="text-cyan-400" />
                )}
              </motion.div>
            </button>
            
            <AnimatePresence>
              {activeIndex === index && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                  className="overflow-hidden"
                >
                  <div className="px-6 pb-5 text-gray-300 border-t border-gray-700/50 pt-4">
                    {item.answer}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>
    </div>
  );
}