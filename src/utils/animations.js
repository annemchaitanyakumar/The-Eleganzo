import { gsap } from 'gsap';

/**
 * Reusable GSAP animation presets for The Eleganzo.
 */

export const fadeInUp = (target, options = {}) => {
  return gsap.from(target, {
    opacity: 0,
    y: 60,
    duration: 1,
    ease: 'power3.out',
    ...options,
  });
};

export const staggerReveal = (targets, options = {}) => {
  return gsap.from(targets, {
    opacity: 0,
    y: 40,
    duration: 0.8,
    stagger: 0.1,
    ease: 'power3.out',
    ...options,
  });
};

export const maskReveal = (target, options = {}) => {
  return gsap.fromTo(
    target,
    { clipPath: 'inset(0 100% 0 0)' },
    {
      clipPath: 'inset(0 0% 0 0)',
      duration: 1.2,
      ease: 'power4.inOut',
      ...options,
    }
  );
};

export const scaleReveal = (target, options = {}) => {
  return gsap.from(target, {
    opacity: 0,
    scale: 0.85,
    duration: 1,
    ease: 'power3.out',
    ...options,
  });
};

export const splitTextReveal = (target, options = {}) => {
  return gsap.from(target, {
    opacity: 0,
    y: 100,
    rotateX: -30,
    duration: 1,
    ease: 'power4.out',
    stagger: 0.05,
    ...options,
  });
};

export const parallaxScroll = (target, speed = 50, options = {}) => {
  return gsap.to(target, {
    y: speed,
    ease: 'none',
    scrollTrigger: {
      trigger: target,
      start: 'top bottom',
      end: 'bottom top',
      scrub: 1,
      ...options,
    },
  });
};
