"use client";

import React, { useRef, useState } from 'react';

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
  maxTilt?: number;
  perspective?: number;
  scale?: number;
  speed?: number;
  glareEnable?: boolean;
  glareMaxOpacity?: number;
}

export const TiltCard: React.FC<TiltCardProps> = ({
  children,
  className = '',
  maxTilt = 25,
  perspective = 1000,
  scale = 1.05,
  speed = 1000,
  glareEnable = true,
  glareMaxOpacity = 0.5,
}) => {
  const [style, setStyle] = useState({});
  const [glareStyle, setGlareStyle] = useState({});
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;

    const { clientX, clientY } = e;
    const { left, top, width, height } = cardRef.current.getBoundingClientRect();
    
    const x = clientX - left;
    const y = clientY - top;
    
    const centerX = width / 2;
    const centerY = height / 2;
    
    const rotateX = ((y - centerY) / centerY) * maxTilt;
    const rotateY = ((centerX - x) / centerX) * maxTilt;

    setStyle({
      transform: `perspective(${perspective}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(${scale}, ${scale}, ${scale})`,
      transition: 'none',
    });

    if (glareEnable) {
      const glareX = (x / width) * 100;
      const glareY = (y / height) * 100;
      
      setGlareStyle({
        background: `radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255, 255, 255, ${glareMaxOpacity}), transparent 50%)`,
        opacity: 1,
      });
    }
  };

  const handleMouseLeave = () => {
    setStyle({
      transform: 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)',
      transition: `transform ${speed}ms cubic-bezier(0.03, 0.98, 0.52, 0.99)`,
    });
    
    if (glareEnable) {
      setGlareStyle({
        opacity: 0,
      });
    }
  };

  const handleMouseEnter = () => {
    setStyle({
      ...style,
      transition: `transform ${speed}ms cubic-bezier(0.03, 0.98, 0.52, 0.99)`,
    });
  };

  return (
    <div
      ref={cardRef}
      className={`relative ${className}`}
      style={{
        transformStyle: 'preserve-3d',
        ...style,
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
    >
      {children}
      {glareEnable && (
        <div
          className="absolute inset-0 pointer-events-none rounded-lg"
          style={{
            ...glareStyle,
            transition: `opacity ${speed}ms cubic-bezier(0.03, 0.98, 0.52, 0.99)`,
          }}
        />
      )}
    </div>
  );
};
