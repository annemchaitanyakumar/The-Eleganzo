import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

/**
 * Hook for triggering animations when elements scroll into view.
 * @param {object} config - Animation configuration
 * @param {string} config.animation - Animation type: 'fadeUp', 'fadeIn', 'scaleIn', 'slideLeft', 'slideRight'
 * @param {number} config.delay - Animation delay in seconds
 * @param {number} config.duration - Animation duration in seconds
 * @param {string} config.start - ScrollTrigger start position
 * @param {boolean} config.stagger - Whether to stagger children
 */
export default function useScrollAnimation({
  animation = 'fadeUp',
  delay = 0,
  duration = 1,
  start = 'top 85%',
  stagger = false,
  staggerAmount = 0.1,
} = {}) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const targets = stagger ? el.children : el;

    const animations = {
      fadeUp: { from: { opacity: 0, y: 50 }, to: { opacity: 1, y: 0 } },
      fadeIn: { from: { opacity: 0 }, to: { opacity: 1 } },
      scaleIn: { from: { opacity: 0, scale: 0.9 }, to: { opacity: 1, scale: 1 } },
      slideLeft: { from: { opacity: 0, x: 80 }, to: { opacity: 1, x: 0 } },
      slideRight: { from: { opacity: 0, x: -80 }, to: { opacity: 1, x: 0 } },
    };

    const { from, to } = animations[animation] || animations.fadeUp;

    gsap.set(targets, from);

    const tl = gsap.to(targets, {
      ...to,
      duration,
      delay,
      ease: 'power3.out',
      stagger: stagger ? staggerAmount : 0,
      scrollTrigger: {
        trigger: el,
        start,
        toggleActions: 'play none none none',
      },
    });

    return () => {
      tl.scrollTrigger?.kill();
      tl.kill();
    };
  }, [animation, delay, duration, start, stagger, staggerAmount]);

  return ref;
}
