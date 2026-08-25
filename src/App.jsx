import React, { useState, useRef, useEffect } from 'react';
import OpeningScene from './components/OpeningScene';
import ScrollAnimation from './components/ScrollAnimation';
import Background from './components/Background';
import LetterContent from './components/LetterContent';
import FinalPage from './components/FinalPage';
import MusicControl from './components/MusicControl';
import { useMusic } from './hooks/useMusic';

function App() {
  const [stage, setStage] = useState(0); // 0: opening, 1: envelope->scroll transform, 2: scroll unroll + letter
  const [showFinalPage, setShowFinalPage] = useState(false);
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
    // Scroll unroll done; we stay in stage 2 so the letter content and "Read More" button remain visible
    // No state change needed here
  };

  const handleReadMore = () => {
    setShowFinalPage(true);
  };

  return (
    <div className="relative min-h-screen bg-black overflow-hidden">
      {/* Background: dark gradient, vignette, particles (always visible) */}
      <Background />

      {/* Music Control */}
      <MusicControl isPlaying={isPlaying} onToggle={() => isPlaying ? pauseMusic() : playMusic()} />

      {!showFinalPage ? (
        <>
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
              onReadMore={handleReadMore}
            />
          )}
        </>
      ) : (
        // Final Page
        <FinalPage />
      )}
    </div>
  );
}

export default App;