import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function RevealText({ children, tag = 'div', className = '', delay = 0 }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    gsap.fromTo(
      el,
      {
        clipPath: 'inset(0 0 100% 0)',
        opacity: 0,
        y: 30,
      },
      {
        clipPath: 'inset(0 0 0% 0)',
        opacity: 1,
        y: 0,
        duration: 1.2,
        delay,
        ease: 'power4.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      }
    );
  }, [delay]);

  const Tag = tag;

  return (
    <Tag ref={ref} className={className} style={{ willChange: 'clip-path, transform, opacity' }}>
      {children}
    </Tag>
  );
}
