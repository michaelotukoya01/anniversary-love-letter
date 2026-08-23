import React from 'react';
import { motion } from 'framer-motion';

const FinalScene = () => {
  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.5 }}
      className="relative min-h-screen flex flex-col items-center justify-end text-center px-4 pb-12"
    >
      {/* Final message from requirements */}
      <div className="text-white text-2xl md:text-3xl font-serif max-w-xl mb-6">
        Our story may not always be perfectly but it is ours and that makes every page worth turning.
      </div>

      {/* Sign-off */}
      <div className="text-white text-xl md:text-2L font-serif mb-4">
        with all my heart, always yours.
      </div>

      {/* Final anniversary message */}
      <div className="text-white text-2xl md:text-3xl font-serif flex items-center gap-2">
        Happy anniversary, my babyy.
        <span className="text-3xl">🖤</span>
      </div>
    </motion.div>
  );
};

export default FinalScene;