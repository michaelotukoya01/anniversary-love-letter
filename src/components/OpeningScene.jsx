import React from 'react';
import Envelope from './Envelope';

const OpeningScene = ({ onEnvelopeClick }) => {
  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center text-center px-4">
      {/* Opening Message */}
      <div className="text-white text-2xl md:text-3xl font-serif leading-relaxed mb-8 max-w-xl">
        Out of all the people I could have met, life led me to you. And that will always be one of my favorite things about our story.
      </div>

      {/* Envelope */}
      <div className="relative">
        <Envelope onClick={onEnvelopeClick} />
        {/* Tap to open hint */}
        <div className="absolute bottom-[-40px] left-1/2 transform -translate-x-1/2 text-white text-sm text-center">
          Tap to open.
        </div>
      </div>
    </div>
  );
};

export default OpeningScene;