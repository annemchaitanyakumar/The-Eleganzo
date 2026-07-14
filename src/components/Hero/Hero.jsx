import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { HiArrowDown } from 'react-icons/hi';
import HeroScene from '../ThreeScene/HeroScene';
import MagneticButton from '../Buttons/MagneticButton';

export default function Hero() {
  const heroRef = useRef(null);
  const overlayRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Parallax on scroll
      gsap.to('.hero-bg', {
        yPercent: 30,
        ease: 'none',
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1,
        },
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative w-full h-screen min-h-[700px] overflow-hidden flex items-center justify-center"
    >
      {/* Background image layer */}
      <div className="hero-bg absolute inset-0 z-0">
        <motion.div
          initial={{ scale: 1.15, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 2.5, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          className="w-full h-[120%] bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: 'url(/images/hero-bg.jpg)',
          }}
        />
        {/* Dark gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#050806]/85 via-[#050806]/40 to-[#080D0A]" />
      </div>

      {/* 3D Scene overlay */}
      <HeroScene />

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        {/* Label */}
        <motion.span
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.8, ease: [0.76, 0, 0.24, 1] }}
          className="inline-block text-xs tracking-[0.35em] uppercase text-accent-gold mb-6"
        >
          Kodaikanal · 7,000 ft · Western Ghats
        </motion.span>

        {/* Gold line */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1, delay: 2, ease: [0.76, 0, 0.24, 1] }}
          className="w-16 h-px bg-accent-gold mx-auto mb-8 origin-center"
        />

        {/* Title */}
        <div className="overflow-hidden mb-6">
          <motion.h1
            initial={{ y: 120, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1.2, delay: 2.2, ease: [0.76, 0, 0.24, 1] }}
            className="font-heading text-6xl md:text-8xl lg:text-9xl font-light tracking-[0.08em] leading-[0.9] gold-gradient-text"
          >
            The Eleganzo
          </motion.h1>
        </div>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 2.6, ease: [0.76, 0, 0.24, 1] }}
          className="text-text-muted text-sm md:text-base font-light tracking-[0.2em] max-w-xl mx-auto mb-12 leading-relaxed"
        >
          A Sanctuary Above the Clouds
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 2.9, ease: [0.76, 0, 0.24, 1] }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <MagneticButton variant="outline-light" href="/rooms">
            Explore Rooms
          </MagneticButton>
          <MagneticButton variant="primary" href="/contact">
            Book Your Stay
          </MagneticButton>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3.5, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-3"
      >
        <span className="text-[10px] tracking-[0.3em] uppercase text-[#FAF9F6]/40">
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        >
          <HiArrowDown className="text-accent-gold text-lg" />
        </motion.div>
      </motion.div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent z-10" />
    </section>
  );
}
