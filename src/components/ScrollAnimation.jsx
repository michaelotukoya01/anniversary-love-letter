import React from 'react';
import { motion } from 'framer-motion';
import Envelope from './Envelope';

const ScrollAnimation = ({ stage, onOpeningAnimationEnd, onScrollAnimationEnd, onTransitionEnd }) => {
  // Define variants for each stage
  const variants = {
    initial: {
      opacity: 0,
      scale: 0.9,
    },
    opening: {
      opacity: 1,
      scale: [0.9, 1.02, 1], // slight bounce
      transition: {
        duration: 0.8,
        ease: 'easeOut',
      },
    },
    scroll: {
      // We'll animate height and opacity to simulate unrolling scroll
      height: [0, 400],
      opacity: [0, 1],
      transition: {
        duration: 1.5,
        ease: 'easeOut',
      },
    },
    transition: {
      // Fade out and scale down to transition to black background
      opacity: [1, 0],
      scale: [1, 0.9],
      transition: {
        duration: 1.2,
        ease: 'easeInOut',
      },
    },
  };

  // Base styles for the container
  const baseStyle = {
    position: 'relative',
    marginX: 4,
    width: { base: 200, md: 260 },
    height: { base: 140, md: 180 },
  };

  // Determine which variant to animate to based on stage
  let variantName = 'initial';
  let containerStyle = baseStyle;

  if (stage === 1) {
    variantName = 'opening';
    // Keep envelope size
    containerStyle = {
      ...baseStyle,
      width: { base: 200, md: 260 },
      height: { base: 140, md: 180 },
    };
  } else if (stage === 2) {
    variantName = 'scroll';
    // Scroll unrolls to larger height
    containerStyle = {
      ...baseStyle,
      width: { base: 200, md: 260 },
      height: 'auto', // let content determine height, but we animate height via variant
      minHeight: 400,
    };
  } else if (stage === 3) {
    variantName = 'transition';
    // Fade out and shrink
    containerStyle = {
      ...baseStyle,
      width: { base: 200, md: 260 },
      height: { base: 140, md: 180 },
    };
  }

  return (
    <motion.div
      style={containerStyle}
      variants={variants}
      initial="initial"
      animate={variantName}
      // Use onAnimationEnd to call the appropriate handler based on stage
      onAnimationEnd={() => {
        if (stage === 1) onOpeningAnimationEnd();
        else if (stage === 2) onScrollAnimationEnd();
        else if (stage === 3) onTransitionEnd();
      }}
    >
      {/* Content that changes based on stage */}
      {stage === 1 && (
        <>
          {/* Envelope visual (same as Envelope but non‑interactive) */}
          <Envelope onClick={() => {}} />
        </>
      )}
      {stage === 2 && (
        <>
          {/* Scroll visual: parchment texture with lines */}
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
      )}
      {stage === 3 && (
        <>
          {/* Same scroll visual as stage 2, but will fade out via animation */}
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
      )}
    </motion.div>
  );
};

export default ScrollAnimation;