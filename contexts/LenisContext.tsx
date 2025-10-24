"use client";

import { createContext, useContext, ReactNode } from 'react';
import Lenis from '@studio-freight/lenis';

interface LenisContextType {
  lenis: Lenis | null;
}

export const LenisContext = createContext<LenisContextType>({ lenis: null });

export const useLenis = () => {
  return useContext(LenisContext);
};
