import React from 'react';
import { motion } from 'framer-motion';

const FinalScene = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.5 }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-end text-center px-4 pb-12"
    >
      {/* Dark background to cover everything */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900 via-gray-950 to-black" />
        <div className="absolute inset-0 bg-radial-gradient bg-center bg-[size:200%_200%] from-transparent via-black/80 to-black/90" />
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%20width=%22200%22 height=%22200%22 viewBox=%220%200%20200%20200%22><filter id=%22noiseFilter%22><feTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%22></filter><rect width=%22100%22 height=%22100%22 filter=%22url(%23noiseFilter)%22 opacity=%220.05%22/%22></svg>')] bg-[size:200%_200%]" />
      </div>

      {/* Content */}
      <div className="relative">
        {/* Final message from requirements */}
        <div className="text-white text-2xl md:text-3xl font-serif max-w-xl mb-6">
          Our story may not always be perfectly but it is ours and that makes every page worth turning.
        </div>

        {/* Sign-off */}
        <div className="text-white text-xl md:text-2xl font-serif mb-4">
          with all my heart, always yours.
        </div>

        {/* Final anniversary message */}
        <div className="text-white text-2xl md:text-3xl font-serif flex items-center gap-2">
          Happy anniversary, my babyy.
          <span className="text-3xl">🖤</span>
        </div>
      </div>
    </motion.div>
  );
};

export default FinalScene;