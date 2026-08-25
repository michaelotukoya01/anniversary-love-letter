import React from 'react';
import { motion } from 'framer-motion';
import Background from './Background';

const FinalScene = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.5 }}
      className="fixed inset-0 z-50"
    >
      <Background />
    </motion.div>
  );
};

export default FinalScene;