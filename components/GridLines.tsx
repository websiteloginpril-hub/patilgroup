"use client";

import React from 'react';

export const GridLines = () => {
  return (
    <div className="absolute inset-0 pointer-events-none">
      <div className="absolute left-1/3 top-0 bottom-0 w-px bg-gray-300 h-full scale-in" style={{ animationDelay: '200ms', animationDuration: '500ms' }}></div>
      <div className="absolute left-2/3 top-0 bottom-0 w-px bg-gray-300 h-full scale-in" style={{ animationDelay: '400ms', animationDuration: '500ms' }}></div>
    </div>
  );
};
