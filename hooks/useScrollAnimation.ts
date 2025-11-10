'use client';

import { useEffect, useState } from 'react';

export function useScrollAnimation(): void {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    if (typeof window === 'undefined') return;
    if (typeof document === 'undefined') return;
    if (!('IntersectionObserver' in window)) return;

    const observerOptions: IntersectionObserverInit = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px',
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    const animatedElements = document.querySelectorAll(
      '.fade-in-section, .slide-in-left, .slide-in-right, .scale-in, .animate-fadeInUp'
    );

    animatedElements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [mounted]);
}