import React from 'react';

const MusicControl = ({ isPlaying, onToggle }) => {
  return (
    <div className="absolute bottom-4 left-4 flex items-center gap-2">
      <button
        onClick={onToggle}
        className="w-10 h-10 rounded-full bg-black/50 backdrop-blur-sm text-white hover:bg-black/60 transition-colors flex items-center justify-center"
        aria-label={isPlaying ? 'Pause music' : 'Play music'}
      >
        {isPlaying ? (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 5v14l11-7z" />
          </svg>
        )}
      </button>
      <span className="text-sm text-white/80">Music</span>
    </div>
  );
};

export default MusicControl;