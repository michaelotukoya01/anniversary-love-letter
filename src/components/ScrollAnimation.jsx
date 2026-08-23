import React from 'react';
import { motion } from 'framer-motion';
import Envelope from './Envelope';

const ScrollAnimation = ({ stage, onOpeningAnimationEnd, onScrollAnimationEnd, onTransitionEnd }) => {
  // Initial values for each stage
  const initialValues = {
    1: { opacity: 0, scale: 0.9 }, // envelope opening start
    2: { height: 0, opacity: 0 }, // scroll unroll start
    3: { height: 400, opacity: 1, scale: 1 }, // transition start (scroll visible)
  };

  // Animated (target) values for each stage
  const animateValues = {
    1: { opacity: 1, scale: 1 }, // envelope opening end
    2: { height: 400, opacity: 1 }, // scroll unroll end
    3: { opacity: 0, scale: 0.9 }, // transition end (fade out)
  };

  // Transition config for each stage
  const transitionConfig = {
    1: { duration: 0.8, ease: 'easeOut' },
    2: { duration: 1.5, ease: 'easeOut' },
    3: { duration: 1.2, ease: 'easeInOut' },
  };

  // Determine which visual to show based on stage
  let Visual = null;
  if (stage === 1) {
    Visual = () => <Envelope onClick={() => {}} />; // non-interactive envelope visual
  } else if (stage === 2 || stage === 3) {
    Visual = () => (
      <>
        <div className="absolute inset-0">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%20width=%22100%22 height=%22100%22 viewBox=%220%200%20100%20100%22><rect width=%22100%22 height=%22100%22 fill=%22%23f9f6ee%22/%22><path d=%22M0,50 Q25,40 50,50 T100,50%22 stroke=%22%23e8e3d9%22 stroke-width=%220.5%22 fill=%22none%22/%22></svg>')",
              backgroundSize: 'contain',
            }}
          />
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
      </>
    );
  }

  // If stage is 0 (initial) or >3, render nothing
  if (stage < 1 || stage > 3) return null;

  const initial = initialValues[stage] || {};
  const animate = animateValues[stage] || {};
  const transition = transitionConfig[stage] || {};

  // Determine which callback to call based on stage
  let onComplete = () => {};
  if (stage === 1) onComplete = onOpeningAnimationEnd;
  else if (stage === 2) onComplete = onScrollAnimationEnd;
  else if (stage === 3) onComplete = onTransitionEnd;

  return (
    <motion.div
      key={stage}
      initial={initial}
      animate={animate}
      transition={transition}
      onAnimationComplete={onComplete}
      className="relative mx-4"
    >
      {Visual && <Visual />}
    </motion.div>
  );
};

export default ScrollAnimation;