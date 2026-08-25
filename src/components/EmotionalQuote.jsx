import React from 'react';

const EmotionalQuote = ({ text, className = '' }) => {
  return (
    <p className={`text-2xl md:text-3xl font-serif leading-relaxed text-center mb-6 ${className}`}>
      <span className="relative bg-black/20 px-2 py-1 rounded-md">{text}</span>
    </p>
  );
};

export default EmotionalQuote;