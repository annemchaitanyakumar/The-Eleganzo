import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

/**
 * Hook for applying parallax scrolling effect to an element.
 * @param {number} speed - Parallax speed multiplier (default: 0.3). Positive = moves up slower.
 * @param {object} options - Additional ScrollTrigger options.
 */
export default function useParallax(speed = 0.3, options = {}) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const tl = gsap.to(el, {
      y: () => speed * 100,
      ease: 'none',
      scrollTrigger: {
        trigger: el,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1,
        ...options,
      },
    });

    return () => {
      tl.scrollTrigger?.kill();
      tl.kill();
    };
  }, [speed]);

  return ref;
}
