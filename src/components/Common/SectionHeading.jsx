import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function SectionHeading({ label, title, subtitle, align = 'center', light = false }) {
  const lineRef = useRef(null);

  useEffect(() => {
    if (!lineRef.current) return;

    gsap.fromTo(
      lineRef.current,
      { scaleX: 0 },
      {
        scaleX: 1,
        duration: 1,
        ease: 'power3.inOut',
        scrollTrigger: {
          trigger: lineRef.current,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      }
    );
  }, []);

  const alignClass = align === 'left' ? 'items-start text-left' : 'items-center text-center';
  const textColor = light ? 'text-[#FAF9F6]' : '';
  const mutedColor = light ? 'text-[#FAF9F6]/60' : 'text-text-muted';

  return (
    <div className={`flex flex-col ${alignClass} gap-5 mb-16 md:mb-20`}>
      {label && (
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
          className="text-label"
        >
          {label}
        </motion.span>
      )}

      <div
        ref={lineRef}
        className="gold-line origin-center"
        style={{ transformOrigin: align === 'left' ? 'left' : 'center' }}
      />

      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.8, delay: 0.1, ease: [0.76, 0, 0.24, 1] }}
        className={`text-h1 ${textColor}`}
      >
        {title}
      </motion.h2>

      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.76, 0, 0.24, 1] }}
          className={`text-body-lg max-w-2xl ${mutedColor}`}
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
}
