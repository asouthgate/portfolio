import React, { useRef, useEffect, useState } from 'react';
import './effects.css'

const SpinEffect = ({ children, className = '' }) => {
  return (
    <div className={`spin-effect ${className}`}>
      {children}
    </div>
  );
};

const FloatEffect = ({ children, className = '' }) => {
  return (
    <div className={`float-effect ${className}`}>
      {children}
    </div>
  );
};

const TypingEffect = ({ text, speed = 100, as: Component = 'div', delay = 0 }) => {
  const [displayedText, setDisplayedText] = useState('');
  const textLength = useRef(text.length);
  const index = useRef(0);
  const intervalId = useRef(null);
  const started = useRef(false);
  useEffect(() => {
    const handleTyping = () => {
      if (index.current < text.length) {
        setDisplayedText(text.slice(0, index.current + 1) + "▌");
        index.current += 1;
      } else {
        setDisplayedText(text);
        clearInterval(intervalId.current);
      }
    };

    intervalId.current = setInterval(handleTyping, speed);

    return () => {
      clearInterval(intervalId.current);
    };
  }, [text, speed]);

  return <Component>{displayedText}</Component>;
};

export { SpinEffect, FloatEffect };
