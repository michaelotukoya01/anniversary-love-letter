import React, { useState, useRef, useEffect } from 'react';

const PasswordGate = ({ onUnlock }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [fadingOut, setFadingOut] = useState(false);
  const [unlocked, setUnlocked] = useState(false);
  const passwordInputRef = useRef(null);

  useEffect(() => {
    if (unlocked) {
      // After unlocking, start fade out
      setFadingOut(true);
      // After fade out transition, hide gate and notify parent
      const timer = setTimeout(() => {
        setUnlocked(false); // reset for safety
        onUnlock();
      }, 500); // matches transition speed in CSS
      return () => clearTimeout(timer);
    }
  }, [unlocked, onUnlock]);

  const handleUnlock = () => {
    if (password === '0509') {
      setError('');
      setUnlocked(true);
    } else {
      setError('Not quite... try again. ♡');
      setPassword('');
      // Shake animation
      passwordInputRef.current?.style.animation = 'shake 0.5s';
      setTimeout(() => {
        passwordInputRef.current?.style.animation = '';
      }, 500);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleUnlock();
    }
  };

  return (
    <div id="password-gate" className={ `gate ${fadingOut ? 'fading-out' : ''} ${unlocked ? '' : ''}` }>
      <div className="gate-content">
        <div className="gate-label">PRIVATE</div>
        <div className="gate-message">A little something for you.</div>
        <div className="gate-submessage">Some things are meant to be opened only by the right person.</div>
        <div className="gate-input-container">
          <input
            type="password"
            id="password-input"
            placeholder="Enter the password"
            autoComplete="off"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            ref={passwordInputRef}
            onKeyPress={handleKeyPress}
          />
          <button id="unlock-button" onClick={handleUnlock}>
            Unlock
          </button>
        </div>
        <div id="password-error" className={`gate-error ${error ? '' : 'hidden'}`}>
          {error}
        </div>
      </div>
    </div>
  );
};

export default PasswordGate;