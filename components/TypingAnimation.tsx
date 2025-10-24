"use client";

import React, { useState, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

type TypingAnimationProps = {
  text: string;
  className?: string;
  showCursor?: boolean;
  speed?: number;
  startAfterMs?: number;
  cursorColor?: string;
  textParts?: Array<{
    text: string;
    className?: string;
  }>;
};

export const TypingAnimation = ({ text, className, showCursor = false, speed = 150, startAfterMs = 0, cursorColor, textParts }: TypingAnimationProps) => {
  const [displayedText, setDisplayedText] = useState('');
  const [currentCharIndex, setCurrentCharIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.5,
  });

  // Use textParts if provided, otherwise fall back to simple text
  const fullText = textParts ? textParts.map(part => part.text).join('') : text;

  useEffect(() => {
    if (inView) {
      setIsAnimating(true);
      let i = 0;
      const starter = setTimeout(() => {
        const interval = setInterval(() => {
          if (i < fullText.length) {
            setDisplayedText(fullText.substring(0, i + 1));
            setCurrentCharIndex(i + 1);
            i++;
          } else {
            clearInterval(interval);
            if (!showCursor) {
              setIsAnimating(false);
            }
          }
        }, speed);
        // clear interval when unmounting
        (ref as any).current && ((ref as any).current._typingInterval = interval);
      }, startAfterMs);
      return () => {
        clearTimeout(starter);
        const intervalRef = (ref as any).current && (ref as any).current._typingInterval;
        if (intervalRef) clearInterval(intervalRef);
      };
    }
  }, [inView, fullText, showCursor, speed, startAfterMs, ref]);

  const renderStyledText = () => {
    if (!textParts) {
      return displayedText;
    }

    let charCount = 0;
    return textParts.map((part, index) => {
      const partEndIndex = charCount + part.text.length;
      const visibleChars = Math.max(0, Math.min(part.text.length, currentCharIndex - charCount));
      const visibleText = part.text.substring(0, visibleChars);
      charCount = partEndIndex;

      return (
        <span key={index} className={part.className}>
          {visibleText}
        </span>
      );
    });
  };

  return (
    <span ref={ref} className={className} style={{ whiteSpace: 'pre-wrap' }}>
      {renderStyledText()}
      {showCursor && (
        <span
          className={`inline-block w-px border-l-2 ${isAnimating ? 'animate-blink' : ''}`}
          style={{ height: '1em', marginLeft: '2px', borderColor: cursorColor ?? 'currentColor' }}
        >&nbsp;</span>
      )}
    </span>
  );
};
