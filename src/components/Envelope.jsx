import React from 'react';
import { motion } from 'framer-motion';

const Envelope = ({ onClick, asScroll = false }) => {
  if (asScroll) {
    // Rendered as a rolled scroll (simplified)
    return (
      <motion.div
        onClick={onClick}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="relative w-[200px] h-[40px] md:w-[260px] md:h-[50px] flex items-center justify-center"
      >
        {/* Scroll body */}
        <div className="relative w-full h-full bg-[#f9f6ee] rounded-lg">
          {/* Top curl */}
          <div className="absolute left-0 top-0 w-full h-2 bg-[#e8e3d9]/80" />
          {/* Bottom curl */}
          <div className="absolute left-0 bottom-0 w-full h-2 bg-[#e8e3d9]/80" />
          {/* Shadow for depth */}
          <div className="absolute inset-0 bg-black/5 blur-sm opacity-20 pointer-events-none" />
        </div>
      </motion.div>
    );
  }

  // Original envelope
  return (
    <motion.div
      onClick={onClick}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="relative w-[200px] h-[140px] md:w-[260px] md:h-[180px] perspective-[1000px]"
    >
      {/* Shadow */}
      <div className="absolute inset-0 bg-black/20 blur-md opacity-0 hover:opacity-50 transition-opacity duration-300 pointer-events-none" />

      {/* Envelope Front */}
      <div className="relative w-full h-full bg-white/90 rounded-md">
        {/* Flap */}
        <div className="absolute inset-0">
          <div className="width-full height-full bg-white/90">
            <div className="absolute inset-0 bg-gradient-to-t from-white/90 to-white/70" />
          </div>
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[40%] h-[20px] bg-white/90" />
          </div>
        </div>
        {/* Body */}
        <div className="absolute inset-0 bg-white/80" />
      </div>

      {/* Seal (optional) */}
      <div className="absolute left-1/2 bottom-1/2 -translate-x-1/2 -translate-y-1/2 w-[20px] h-[20px] bg-red-500 rounded-full ring-2 ring-white" />
    </motion.div>
  );
};

export default Envelope;