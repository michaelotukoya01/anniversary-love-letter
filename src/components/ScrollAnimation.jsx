import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import Envelope from './Envelope';
import LetterContent from './LetterContent';

const ScrollAnimation = ({ stage, onOpeningAnimationEnd, onScrollAnimationEnd, onReadMore }) => {
  const parchmentRef = useRef(null);
  const contentHeightRef = useRef(0);

  // Measure content height after render
  useEffect(() => {
    if (parchmentRef.current) {
      const height = parchmentRef.current.scrollHeight;
      contentHeightRef.current = height;
    }
  }, []);

  // Stage 1: envelope lifts and transforms into scroll (scale up, slight rotation)
  const stage1Variants = {
    initial: { scale: 0.8, rotate: -5, opacity: 0 },
    animate: { scale: 1, rotate: 0, opacity: 1 },
    transition: { duration: 0.8, ease: 'easeOut' },
  };

  // Stage 2: scroll unrolls with parchment and reveals letter
  const stage2Variants = {
    initial: {
      height: 0,
      topRollY: 0,
      bottomRollY: 0,
      topRollRotateX: 30,
      bottomRollRotateX: -30,
      opacity: 0
    },
    animate: {
      height: contentHeightRef.current || 560, // fallback to 560 if not measured
      topRollY: -20, // move top roll up by half its height (approx)
      bottomRollY: 20, // move bottom roll down
      topRollRotateX: 0,
      bottomRollRotateX: 0,
      opacity: 1
    },
    transition: { duration: 2.5, ease: 'easeOut' },
  };

  let Content = null;
  if (stage === 1) {
    Content = () => <Envelope asScroll onClick={() => {}} />; // non‑interactive scroll visual
  } else if (stage === 2) {
    Content = () => (
      <motion.div
        style={{ position: 'relative', width: '100%', maxWidth: '400px', margin: '0 auto', overflow: 'hidden' }}
      >
        {/* Top roll */}
        <motion.div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: 24,
            backgroundColor: '#f9f6ee',
            borderTopLeftRadius: '12px',
            borderTopRightRadius: '12px',
            backgroundImage: "linear-gradient(to bottom, #e8e3d9, #f9f6ee)",
            boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
            transformOrigin: 'center',
            transform: ({ topRollY, topRollRotateX }) => `
              translateY(${topRollY}px)
              rotateX(${topRotateX}deg)
            `,
          }}
        >
        </motion.div>

        {/* Parchment body with letter content */}
        <motion.div
          ref={parchmentRef}
          style={{
            position: 'relative',
            backgroundColor: '#f9f6ee',
            overflow: 'hidden',
            boxSizing: 'border-box',
            padding: '20px',
            borderLeft: '1px solid #e8e3d9',
            borderRight: '1px solid #e8e3d9',
          }}
        >
          {/* We'll animate the height to reveal content */}
          <motion.div
            style={{ height: '100%', overflow: 'hidden' }}
          >
            <LetterContent className="text-gray-800 font-serif leading-relaxed" onReadMore={onReadMore} />
          </motion.div>
        </motion.div>

        {/* Bottom roll */}
        <motion.div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: 24,
            backgroundColor: '#f9f6ee',
            borderBottomLeftRadius: '12px',
            borderBottomRightRadius: '12px',
            backgroundImage: "linear-gradient(to top, #e8e3d9, #f9f6ee)",
            boxShadow: '0 -2px 4px rgba(0,0,0,0.2)',
            transformOrigin: 'center',
            transform: ({ bottomRollY, bottomRollRotateX }) => `
              translateY(${bottomRollY}px)
              rotateX(${bottomRollRotateX}deg)
            `,
          }}
        >
        </motion.div>
      </motion.div>
    );
  }

  // If stage is 0 or >2, render nothing (this component only handles stages 1‑2)
  if (stage < 1 || stage > 2) return null;

  const variants = stage === 1 ? stage1Variants : stage2Variants;

  return (
    <motion.div
      key={stage}
      initial={variants.initial}
      animate={variants.animate}
      onAnimationComplete={() => {
        if (stage === 1) onOpeningAnimationEnd();
        else if (stage === 2) onScrollAnimationEnd();
      }}
      className="relative"
    >
      {Content && <Content />}
    </motion.div>
  );
};

export default ScrollAnimation;