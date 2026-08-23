import React, { useState, useRef, useEffect } from 'react';
import OpeningScene from './components/OpeningScene';
import ScrollAnimation from './components/ScrollAnimation';
import Background from './components/Background';
import LetterContent from './components/LetterContent';
import FinalScene from './components/FinalScene';
import MusicControl from './components/MusicControl';
import { useMusic } from './hooks/useMusic';

function App() {
  const [stage, setStage] = useState(0); // 0: initial, 1: envelope->scroll, 2: scroll unroll, 3: letter content, 4: final
  const [showFinal, setShowFinal] = useState(false);
  const scrollRef = useRef(null);
  const { playMusic, pauseMusic, isPlaying } = useMusic();

  useEffect(() => {
    // Play music on first user interaction (we'll trigger this when the envelope is clicked)
    // We'll handle this in the OpeningScene component via a callback
  }, []);

  const handleEnvelopeClick = () => {
    // Start the opening animation
    setStage(1);
    // Play music if possible (we'll try to play, but it might be blocked)
    playMusic();
  };

  const handleOpeningAnimationEnd = () => {
    // Envelope -> scroll transform done, start scroll unroll
    setStage(2);
  };

  const handleScrollAnimationEnd = () => {
    // Scroll unroll done, show letter content
    setStage(3);
  };

  const handleScroll = (event) => {
    // When the user scrolls near the bottom, we can trigger the final scene
    const { scrollTop, scrollHeight, clientHeight } = event.currentTarget;
    if (scrollTop + clientHeight >= scrollHeight - 100 && stage === 3) {
      // User has scrolled to near the bottom of the letter content
      setStage(4);
    }
  };

  return (
    <div className="relative min-h-screen bg-black overflow-hidden">
      {/* Background */}
      <Background stage={stage} />

      {/* Music Control */}
      <MusicControl isPlaying={isPlaying} onToggle={() => isPlaying ? pauseMusic() : playMusic()} />

      {/* Opening Scene (only in stage 0) */}
      {stage === 0 && (
        <OpeningScene onEnvelopeClick={handleEnvelopeClick} />
      )}

      {/* Scroll Animation (stages 1 and 2) */}
      {stage >= 1 && stage <= 2 && (
        <ScrollAnimation
          stage={stage}
          onOpeningAnimationEnd={handleOpeningAnimationEnd}
          onScrollAnimationEnd={handleScrollAnimationEnd}
        />
      )}

      {/* Letter Content (stage 3) - inside a parchment container with scroll */}
      {stage === 3 && (
        <div className="relative z-10" ref={scrollRef} onScroll={handleScroll}>
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
          {/* Letter content with padding and max height */}
          <div className="relative px-4 pt-8 pb-20 max-h-[80vh] overflow-y-auto">
            <LetterContent />
          </div>
        </div>
      )}

      {/* Final Scene (stage 4) */}
      {stage === 4 && (
        <FinalScene />
      )}
    </div>
  );
}

export default App;