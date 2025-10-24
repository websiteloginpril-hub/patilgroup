'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export const useGSAPAnimations = () => {
  const triggersRef = useRef<ScrollTrigger[]>([]);

  useEffect(() => {
    // Clear any existing triggers
    triggersRef.current.forEach(trigger => trigger.kill());
    triggersRef.current = [];

    // Fade in sections (configurable via data attributes)
    const fadeElements = gsap.utils.toArray('.fade-in-section');
    fadeElements.forEach((element: any) => {
      const delay = parseFloat(element?.dataset?.delay ?? '0');
      const duration = parseFloat(element?.dataset?.duration ?? '0.85');
      const yOffset = parseFloat(element?.dataset?.offset ?? '40');
      const startPos = element?.dataset?.start ?? 'top 85%';

      gsap.set(element, { opacity: 0, y: yOffset });

      const trigger = gsap.fromTo(
        element,
        { opacity: 0, y: yOffset },
        {
          opacity: 1,
          y: 0,
          duration,
          delay,
          ease: 'power2.out',
          overwrite: 'auto',
          scrollTrigger: {
            trigger: element,
            start: startPos,
            once: true,
          },
        }
      );
      triggersRef.current.push(trigger.scrollTrigger as ScrollTrigger);
    });

    // Slide in from left
    const slideLeftElements = gsap.utils.toArray('.slide-in-left');
    slideLeftElements.forEach((element: any) => {
      const delay = parseFloat(element?.dataset?.delay ?? '0');
      const duration = parseFloat(element?.dataset?.duration ?? '1');
      gsap.set(element, { x: -100, opacity: 0 });
      
      const tween = gsap.to(element, {
        x: 0,
        opacity: 1,
        duration,
        delay,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: element,
          start: 'top 85%',
          once: true,
        },
      });
      triggersRef.current.push(tween.scrollTrigger as ScrollTrigger);
    });

    // Slide in from right
    const slideRightElements = gsap.utils.toArray('.slide-in-right');
    slideRightElements.forEach((element: any) => {
      const delay = parseFloat(element?.dataset?.delay ?? '0');
      const duration = parseFloat(element?.dataset?.duration ?? '1');
      gsap.set(element, { x: 100, opacity: 0 });
      
      const tween = gsap.to(element, {
        x: 0,
        opacity: 1,
        duration,
        delay,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: element,
          start: 'top 85%',
          once: true,
        },
      });
      triggersRef.current.push(tween.scrollTrigger as ScrollTrigger);
    });

    // Scale up animations
    const scaleElements = gsap.utils.toArray('.scale-in');
    scaleElements.forEach((element: any) => {
      const delay = parseFloat(element?.dataset?.delay ?? '0');
      const duration = parseFloat(element?.dataset?.duration ?? '0.8');
      gsap.set(element, { scale: 0.92, opacity: 0 });
      
      const tween = gsap.to(element, {
        scale: 1,
        opacity: 1,
        duration,
        delay,
        ease: 'back.out(1.6)',
        scrollTrigger: {
          trigger: element,
          start: 'top 80%',
          once: true,
        },
      });
      triggersRef.current.push(tween.scrollTrigger as ScrollTrigger);
    });

    // Stagger animations for children
    const staggerContainers = gsap.utils.toArray('.stagger-children');
    staggerContainers.forEach((container: any) => {
      const children = container.querySelectorAll('.stagger-item');
      const delay = parseFloat(container?.dataset?.delay ?? '0');
      const duration = parseFloat(container?.dataset?.duration ?? '0.6');
      const stagger = parseFloat(container?.dataset?.stagger ?? '0.15');
      gsap.set(children, { opacity: 0, y: 24 });
      
      const tween = gsap.to(children, {
        opacity: 1,
        y: 0,
        duration,
        delay,
        stagger,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: container,
          start: 'top 80%',
          once: true,
        },
      });
      triggersRef.current.push(tween.scrollTrigger as ScrollTrigger);
    });

    // Staggered animation for project cards
    const projectCards = gsap.utils.toArray<gsap.DOMTarget>('.project-card');
    if (projectCards.length > 0) {
      projectCards.forEach((card, index) => {
        gsap.set(card, { opacity: 0, y: 50 });
        const trigger = ScrollTrigger.create({
          trigger: card as gsap.DOMTarget,
          start: 'top 90%',
          onEnter: () => {
            gsap.to(card, {
              opacity: 1,
              y: 0,
              duration: 0.6,
              delay: index * 0.1,
              ease: 'power2.out'
            });
          },
          once: true,
        });
        if (trigger) {
          triggersRef.current.push(trigger);
        }
      });
    }

    // Parallax effect for images
    const parallaxImages = gsap.utils.toArray('.parallax-image');
    parallaxImages.forEach((image: any) => {
      const trigger = ScrollTrigger.create({
        trigger: image,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1,
        onUpdate: (self) => {
          gsap.to(image, {
            yPercent: (self.progress - 0.5) * 20,
            ease: 'none'
          });
        }
      });
      triggersRef.current.push(trigger);
    });

    // Fade in text elements
    const fadeTextElements = gsap.utils.toArray('.fade-text');
    fadeTextElements.forEach((element: any) => {
      gsap.set(element, { opacity: 0, y: 20 });
      
      const trigger = ScrollTrigger.create({
        trigger: element,
        start: 'top 90%',
        onEnter: () => {
          gsap.to(element, {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power2.out'
          });
        },
        once: true,
      });
      triggersRef.current.push(trigger);
    });

    // Fade in headings with slight delay
    const fadeHeadingElements = gsap.utils.toArray('.fade-heading');
    fadeHeadingElements.forEach((element: any) => {
      gsap.set(element, { opacity: 0, y: 30 });
      
      const trigger = ScrollTrigger.create({
        trigger: element,
        start: 'top 85%',
        onEnter: () => {
          gsap.to(element, {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: 'power3.out'
          });
        },
        once: true,
      });
      triggersRef.current.push(trigger);
    });

    // Split text reveal animation (word by word)
    const revealTextElements = gsap.utils.toArray('.reveal-text');
    revealTextElements.forEach((element: any) => {
      const words = element.textContent.split(' ');
      element.innerHTML = words.map((word: string) => 
        `<span class="word" style="display: inline-block; opacity: 0;">${word}&nbsp;</span>`
      ).join('');
      
      const wordElements = element.querySelectorAll('.word');
      
      const trigger = ScrollTrigger.create({
        trigger: element,
        start: 'top 85%',
        onEnter: () => {
          gsap.to(wordElements, {
            opacity: 1,
            duration: 0.5,
            stagger: 0.05,
            ease: 'power2.out'
          });
        },
        once: true,
      });
      triggersRef.current.push(trigger);
    });

    // Fade up paragraphs
    const fadeParagraphs = gsap.utils.toArray('.fade-paragraph');
    fadeParagraphs.forEach((element: any) => {
      gsap.set(element, { opacity: 0, y: 25 });
      
      const trigger = ScrollTrigger.create({
        trigger: element,
        start: 'top 88%',
        onEnter: () => {
          gsap.to(element, {
            opacity: 1,
            y: 0,
            duration: 0.9,
            ease: 'power2.out'
          });
        },
        once: true,
      });
      triggersRef.current.push(trigger);
    });

    // Parallax effect for hero sections (support multiple per page)
    const mm = gsap.matchMedia();

    mm.add("(min-width: 768px)", () => {
      // Desktop parallax
      const heros = gsap.utils.toArray<HTMLElement>('.hero-section');
      heros.forEach((hero) => {
        const background = hero.querySelector('.hero-video, .hero-image');
        const content = hero.querySelector('.hero-content');

        if (background) {
          const trigger = ScrollTrigger.create({
            trigger: hero,
            start: 'top top',
            end: 'bottom top',
            scrub: true,
            onUpdate: (self) => {
              gsap.to(background, { yPercent: self.progress * 30, ease: 'none' });
            },
          });
          if (trigger) triggersRef.current.push(trigger);
        }

        if (content) {
          const trigger = ScrollTrigger.create({
            trigger: hero,
            start: 'top top',
            end: 'bottom top',
            scrub: true,
            onUpdate: (self) => {
              gsap.to(content, { yPercent: self.progress * -30, opacity: 1 - self.progress, ease: 'power1.out' });
            },
          });
          if (trigger) triggersRef.current.push(trigger);
        }
      });
    });

    mm.add("(max-width: 767px)", () => {
      // Mobile parallax (less intense). Allow opt-out via .no-mobile-parallax
      const heros = gsap.utils.toArray<HTMLElement>('.hero-section:not(.no-mobile-parallax)');
      heros.forEach((hero) => {
        const background = hero.querySelector('.hero-video, .hero-image');
        const content = hero.querySelector('.hero-content');

        if (background) {
          const trigger = ScrollTrigger.create({
            trigger: hero,
            start: 'top top',
            end: 'bottom top',
            scrub: true,
            onUpdate: (self) => {
              gsap.to(background, { yPercent: self.progress * 15, ease: 'none' }); // Reduced effect
            },
          });
          if (trigger) triggersRef.current.push(trigger);
        }

        if (content) {
           const trigger = ScrollTrigger.create({
            trigger: hero,
            start: 'top top',
            end: 'bottom top',
            scrub: true,
            onUpdate: (self) => {
              gsap.to(content, { yPercent: self.progress * -15, opacity: 1 - (self.progress * 0.5), ease: 'power1.out' }); // Reduced effect
            },
          });
          if (trigger) triggersRef.current.push(trigger);
        }
      });
    });

    // Cleanup
    return () => {
      triggersRef.current.forEach(trigger => {
        if (trigger && typeof trigger.kill === 'function') {
          trigger.kill();
        }
      });
      triggersRef.current = [];
    };
  }, []);
};

