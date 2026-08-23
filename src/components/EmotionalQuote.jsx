import React from 'react';
import { motion } from 'framer-motion';

const EmotionalQuote = ({ text }) => {
  return (
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.6, type: 'spring', stiffness: 300 }}
      className="text-center mb-12 px-4"
    >
      {/* We'll make the text slightly larger and maybe add a subtle background highlight */}
      <p className="text-2xl md:text-3xl font-serif leading-relaxed relative">
        <span className="relative bg-black/30 px-2 py-1 rounded-md">{text}</span>
      </p>
    </motion.div>
  );
};

export default EmotionalQuote;