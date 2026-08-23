import React from 'react';
import { useEffect, useRef } from 'react';

const Background = ({ stage }) => {
  // We'll create a canvas for particles or use div-based particles
  // For simplicity and performance, we'll use multiple div particles with CSS animations

  useEffect(() => {
    // Create particles
    const container = document.createElement('div');
    container.style.position = 'fixed';
    container.style.inset = '0';
    container.style.overflow = 'hidden';
    container.style.zIndex = '-1';
    document.body.prepend(container);

    const particleCount = 50;
    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement('div');
      particle.style.position = 'absolute';
      particle.style.width = '2px';
      particle.style.height = '2px';
      particle.style.backgroundColor = 'rgba(255,255,255,0.1)';
      particle.style.borderRadius = '50%';
      particle.style.left = `${Math.random() * 100}%`;
      particle.style.top = `${Math.random() * 100}%`;
      particle.style.animation = `float ${Math.random() * 60 + 30}s linear infinite`;
      container.appendChild(particle);
    }

    // Add animation keyframes for floating
    const style = document.createElement('style');
    style.textContent = `
      @keyframes float {
        0% {
          transform: translateY(0) translateX(0);
          opacity: 0;
        }
        50% {
          opacity: 0.3;
        }
        100% {
          transform: translateY(-100vh) translateX(-50vw);
          opacity: 0;
        }
      }
    `;
    document.head.appendChild(style);

    return () => {
      container.remove();
      style.remove();
    };
  }, []);

  // We'll also add a subtle vignette and gradient overlay
  return (
    <div className="absolute inset-0">
      {/* Black background with subtle gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-900 to-black" />
      {/* Vignette */}
      <div className="absolute inset-0 bg-radial-gradient bg-center bg-[size:200%_200%] from-transparent via-black/80 to-black/90" />
      {/* Only show background from stage 3 onwards (after transition) */}
      {stage >= 3 && (
        <>
          {/* Subtle light particles */}
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(20)].map((_, i) => (
              <div key={i} className="absolute" style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                width: `${Math.random() * 3 + 1}px`,
                height: `${Math.random() * 3 + 1}px`,
                backgroundColor: 'rgba(255,255,255,0.2)',
                borderRadius: '50%',
                animation: `float ${Math.random() * 40 + 20}s linear infinite`,
                animationDelay: `${Math.random() * 20}s`
              }}/>
            ))}
          </div>
          {/* Very subtle film grain */}
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%20width=%22200%22 height=%22200%22 viewBox=%220 0 200 200%22><filter id=%22noiseFilter%22><feTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%22></filter><rect width=%22100%22 height=%22100%22 filter=%22url(%23noiseFilter)%22 opacity=%220.05%22/%22></svg>')] bg-[size:200%_200%]" />
        </>
      )}
    </div>
  );
};

export default Background;