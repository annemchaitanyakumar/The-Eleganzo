import { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function ParallaxImage({ src, alt, className = '', speed = 0.2, zoom = true }) {
  const containerRef = useRef(null);
  const imageRef = useRef(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    const image = imageRef.current;
    if (!container || !image || !isLoaded) return;

    // Parallax effect
    gsap.to(image, {
      yPercent: speed * 20,
      ease: 'none',
      scrollTrigger: {
        trigger: container,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1,
      },
    });

    // Reveal animation
    gsap.fromTo(
      container,
      { clipPath: 'inset(15% 0)' },
      {
        clipPath: 'inset(0% 0)',
        duration: 1.2,
        ease: 'power3.inOut',
        scrollTrigger: {
          trigger: container,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      }
    );
  }, [speed, isLoaded]);

  return (
    <div ref={containerRef} className={`overflow-hidden ${className}`}>
      <img
        ref={imageRef}
        src={src}
        alt={alt}
        onLoad={() => setIsLoaded(true)}
        className={`w-full h-full object-cover transition-transform duration-[1.2s] ${
          zoom ? 'hover:scale-[1.06]' : ''
        }`}
        style={{
          scale: 1.15,
          willChange: 'transform',
          opacity: isLoaded ? 1 : 0,
          transition: 'opacity 0.5s ease',
        }}
        loading="lazy"
      />
    </div>
  );
}
