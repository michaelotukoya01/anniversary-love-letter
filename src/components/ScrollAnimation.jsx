import React from 'react';
import { motion } from 'framer-motion';

const ScrollAnimation = ({ stage, onOpeningAnimationEnd, onScrollAnimationEnd, onTransitionEnd }) => {
  // We'll use different animations based on stage
  // Stage 1: Envelope opening to become a scroll
  // Stage 2: Scroll unrolling
  // Stage 3: Transition from scroll to cinematic background

  // We'll animate a single element that transforms from envelope to scroll to transitioning background
  // But it's complex. Instead, we'll have three separate animations that we trigger via state.

  // We'll use the stage prop to control which animation is shown.

  // For simplicity, we'll use CSS animations and use the stage to change classes.

  // However, to meet the requirement of using Framer Motion, we'll use motion components.

  // Let's define the envelope to scroll transformation.

  // We'll create a container that will hold the envelope/scroll.

  // Stage 1: Envelope opens and becomes a scroll (we'll animate the envelope to open and then change shape to a scroll)
  // Stage 2: The scroll unrolls (we'll animate the height of the scroll to increase)
  // Stage 3: The scroll fades out and the background transitions (we'll animate opacity and scale)

  // We'll reuse the same motion element and change its properties based on stage.

  const envelopeVariants = {
    initial: {
      rotateY: 0,
      scale: 1,
      opacity: 1,
      borderRadius: 'md'
    },
    open: {
      rotateY: [0, 180], // Simulate opening by rotating y
      scale: [1, 1.1],
      opacity: [1, 0.8],
      borderRadius: ['md', '0'],
      transition: {
        duration: 1.5,
        easing: 'easeOut',
        // We'll stagger the rotateY and scale
      }
    }
  };

  // We'll use a different approach: we'll have three separate motion components for each stage, but only render one at a time.

  if (stage === 1) {
    // Stage 1: Envelope opening animation
    return (
      <motion.div
        initial="initial"
        animate="open"
        variants={envelopeVariants}
        onAnimationEnd={onOpeningAnimationEnd}
        className="relative w-[200px] h-[140px] md:w-[260px] md:h-[180px] mx-4"
      >
        {/* Envelope content - we'll show the envelope during this stage */}
        <div className="absolute inset-0 bg-white/90 rounded-md">
          {/* Flap and body as before */}
          <div className="absolute inset-0">
            <div className="width-full height-full bg-white/90">
              <div className="absolute inset-0 bg-gradient-to-t from-white/90 to-white/70" />
            </div>
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[40%] h-[20px] bg-white/90" />
            </div>
          </div>
          <div className="absolute inset-0 bg-white/80" />
        </div>
        {/* Seal */}
        <div className="absolute left-1/2 bottom-1/2 -translate-x-1/2 -translate-y-1/2 w-[20px] h-[20px] bg-red-500 rounded-full ring-2 ring-white" />
      </motion.div>
    );
  }

  if (stage === 2) {
    // Stage 2: Scroll unrolling
    // We'll show a scroll that unrolls vertically
    const scrollVariants = {
      initial: { height: 0, opacity: 0 },
      animate: { height: 400, opacity: 1, transition: { duration: 2, ease: 'easeOut' } }
    };

    return (
      <motion.div
        initial="initial"
        animate="animate"
        variants={scrollVariants}
        onAnimationEnd={onScrollAnimationEnd}
        className="relative w-[200px] md:w-[260px] mx-4 bg-white/90 rounded-md"
      >
        {/* Scroll content - we'll show some parchment texture and maybe a hint of text */}
        <div className="relative h-full overflow-hidden">
          {/* Parchment background */}
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%20width=%22100%22 height=%22100%22 viewBox=%220 0 100 100%22><rect width=%22100%22 height=%22100%22 fill=%22%23f9f6ee%22/%22><path d=%22M0,50 Q25,40 50,50 T100,50%22 stroke=%22%23e8e3d9%22 stroke-width=%220.5%22 fill=%22none%22/%22></svg>')] bg-contain" />
          {/* We'll add some lines to mimic paper */}
          <div className="absolute inset-0 bg-[repeat-y:_linear-gradient(transparent,%20transparent%202px,%20%23e8e3d9%202px,%20%23e8e3d9%203px)] bg-[size:100%_20px]" />
        </div>
      </motion.div>
    );
  }

  if (stage === 3) {
    // Stage 3: Transition from scroll to cinematic background
    // We'll fade out the scroll and animate the background to darken and show particles
    const transitionVariants = {
      initial: { opacity: 1, scale: 1 },
      animate: { opacity: 0, scale: 0.9, transition: { duration: 1.5, ease: 'easeInOut' } }
    };

    return (
      <motion.div
        initial="initial"
        animate="animate"
        variants={transitionVariants}
        onAnimationEnd={onTransitionEnd}
        className="absolute inset-0"
      >
        {/* We'll show the scroll fading out */}
        <div className="relative w-[200px] md:w-[260px] mx-4 bg-white/90 rounded-md">
          <div className="relative h-[400px] overflow-hidden">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%20width=%22100%22 height=%22100%22 viewBox=%220 0 100 100%22><rect width=%22100%22 height=%22100%22 fill=%22%23f9f6ee%22/%22><path d=%22M0,50 Q25,40 50,50 T100,50%22 stroke=%22%23e8e3d9%22 stroke-width=%220.5%22 fill=%22none%22/%22></svg>')] bg-contain" />
            <div className="absolute inset-0 bg-[repeat-y:_linear-gradient(transparent,%20transparent%202px,%20%23e8e3d9%202px,%20%23e8e3d9%203px)] bg-[size:100%_20px]" />
          </div>
        </div>
      </motion.div>
    );
  }

  return null;
};

export default ScrollAnimation;