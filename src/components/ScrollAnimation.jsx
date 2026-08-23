import React from 'react';
import { motion } from 'framer-motion';
import Envelope from './Envelope';

const ScrollAnimation = ({ stage, onOpeningAnimationEnd, onScrollAnimationEnd }) => {
  // Stage 1: envelope -> scroll transformation (scale up, slight rotation)
  const stage1Variants = {
    initial: { scale: 0.8, rotate: -5, opacity: 0 },
    animate: { scale: 1, rotate: 0, opacity: 1 },
    exit: { scale: 1.2, rotate: 2, opacity: 0 },
    transition: { duration: 0.8, ease: 'easeOut' },
  };

  // Stage 2: scroll unroll (height increase)
  const stage2Variants = {
    initial: { height: 0, opacity: 0 },
    animate: { height: 560, opacity: 1 }, // approximate height for content
    exit: { height: 0, opacity: 0 },
    transition: { duration: 2.5, ease: 'easeOut' },
  };

  let Content = null;
  if (stage === 1) {
    Content = () => <Envelope onClick={() => {}} />; // non-interactive envelope visual
  } else if (stage === 2) {
    Content = () => (
      <div className="relative">
        {/* Parchment texture */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%20width=%22100%22 height=%22100%22 viewBox=%220%200%20100%20100%22><rect width=%22100%22 height=%22100%22 fill=%22%23f9f6ee%22/%22><path d=%22M0,50 Q25,40 50,50 T100,50%22 stroke=%22%23e8e3d9%22 stroke-width=%220.5%22 fill=%22none%22/%22></svg>')",
            backgroundSize: 'contain',
          }}
        />
        {/* Paper lines */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%20width=%22100%22 height=%2220%22 viewBox=%220%200%20100%2020%22><rect width=%22100%22 height=%2220%22 fill=%22%23e8e3d9%22/%22></svg>')",
            backgroundRepeat: 'repeat-y',
            backgroundSize: '100% 20px',
          }}
        />
      </div>
    );
  }

  // If stage is 0 or >2, render nothing (this component only handles stages 1-2)
  if (stage < 1 || stage > 2) return null;

  const variants = stage === 1 ? stage1Variants : stage2Variants;

  return (
    <motion.div
      key={stage}
      initial={variants.initial}
      animate={variants.animate}
      exit={variants.exit}
      transition={variants.transition}
      onAnimationComplete={() => {
        if (stage === 1) onOpeningAnimationEnd();
        else if (stage === 2) onScrollAnimationEnd();
      }}
      className="relative mx-4"
    >
      {Content && <Content />}
    </motion.div>
  );
};

export default ScrollAnimation;