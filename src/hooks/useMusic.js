import { useState, useEffect, useRef } from 'react';

const useMusic = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    // Create audio element if it doesn't exist
    if (!audioRef.current) {
      audioRef.current = new Audio('/audio/a-thousand-years.mp3');
      audioRef.current.loop = true;
      audioRef.current.volume = 0.5; // Set volume to 50%
    }

    // Update playing state based on audio
    if (audioRef.current) {
      const handlePlay = () => setIsPlaying(true);
      const handlePause = () => setIsPlaying(false);
      audioRef.current.addEventListener('play', handlePlay);
      audioRef.current.addEventListener('pause', handlePause);
      return () => {
        audioRef.current.removeEventListener('play', handlePlay);
        audioRef.current.removeEventListener('pause', handlePause);
      };
    }
  }, []);

  const playMusic = () => {
    if (audioRef.current) {
      // Try to play audio (might be blocked by browser, but we'll try)
      audioRef.current.play().catch(e => {
        console.warn('Autoplay blocked, user needs to interact');
        // We don't set isPlaying here because the play promise was rejected
        // The actual play will happen when user interacts and we call play again
      });
    }
  };

  const pauseMusic = () => {
    if (audioRef.current) {
      audioRef.current.pause();
    }
  };

  // We'll return a play function that ensures we try to play
  const safePlayMusic = () => {
    if (audioRef.current) {
      audioRef.current.play().catch(e => console.warn('Play failed', e));
    }
  };

  return {
    playMusic: safePlayMusic,
    pauseMusic,
    isPlaying
  };
};

export { useMusic };