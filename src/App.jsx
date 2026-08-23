import React, { useState, useRef, useEffect } from 'react';
import OpeningScene from './components/OpeningScene';
import ScrollAnimation from './components/ScrollAnimation';
import Background from './components/Background';
import LetterContent from './components/LetterContent';
import FinalScene from './components/FinalScene';
import MusicControl from './components/MusicControl';
import { useMusic } from './hooks/useMusic';

function App() {
  const [stage, setStage] = useState(0); // 0: initial, 1: opening, 2: scroll, 3: transition, 4: content, 5: final
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
    setStage(2);
  };

  const handleScrollAnimationEnd = () => {
    setStage(3);
  };

  const handleTransitionEnd = () => {
    setStage(4);
  };

  const handleScroll = (event) => {
    // When the user scrolls near the bottom, we can trigger the final scene
    const { scrollTop, scrollHeight, clientHeight } = event.currentTarget;
    if (scrollTop + clientHeight >= scrollHeight - 100 && stage === 4) {
      // User has scrolled to near the bottom of the letter content
      setStage(5);
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

      {/* Scroll Animation (stages 1, 2, 3) */}
      {stage >= 1 && stage <= 3 && (
        <ScrollAnimation
          stage={stage}
          onOpeningAnimationEnd={handleOpeningAnimationEnd}
          onScrollAnimationEnd={handleScrollAnimationEnd}
          onTransitionEnd={handleTransitionEnd}
        />
      )}

      {/* Letter Content (stage 4) */}
      {stage === 4 && (
        <div className="relative z-10" ref={scrollRef} onScroll={handleScroll}>
          <LetterContent />
        </div>
      )}

      {/* Final Scene (stage 5) */}
      {stage === 5 && (
        <FinalScene />
      )}
    </div>
  );
}

export default App;