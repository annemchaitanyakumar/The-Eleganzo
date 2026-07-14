import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';
import useStore from '../../store/useStore';

export default function Loader() {
  const [count, setCount] = useState(0);
  const setIsLoading = useStore((state) => state.setIsLoading);
  const loaderRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + Math.floor(Math.random() * 3) + 1;
      });
    }, 30);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (count >= 100) {
      const tl = gsap.timeline({
        onComplete: () => setIsLoading(false),
      });

      tl.to(textRef.current, {
        opacity: 0,
        y: -30,
        duration: 0.5,
        ease: 'power3.inOut',
      })
        .to(
          loaderRef.current,
          {
            clipPath: 'inset(0 0 100% 0)',
            duration: 1,
            ease: 'power4.inOut',
          },
          '-=0.2'
        );
    }
  }, [count, setIsLoading]);

  return (
    <motion.div
      ref={loaderRef}
      className="fixed inset-0 z-[10000] flex flex-col items-center justify-center bg-background-dark"
      style={{ clipPath: 'inset(0 0 0% 0)' }}
    >
      <div ref={textRef} className="flex flex-col items-center gap-8">
        {/* Gold accent line */}
        <div className="w-12 h-px bg-accent-gold animate-pulse-glow" />

        {/* Logo text */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          className="font-heading text-3xl md:text-5xl font-light tracking-[0.25em] text-[#FAF9F6]"
        >
          THE ELEGANZO
        </motion.h1>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-xs tracking-[0.3em] uppercase text-accent-gold"
        >
          Kodaikanal
        </motion.p>

        {/* Counter */}
        <div className="flex items-center gap-4 mt-8">
          <div className="w-32 h-px bg-white/10 overflow-hidden">
            <motion.div
              className="h-full bg-accent-gold"
              initial={{ width: '0%' }}
              animate={{ width: `${Math.min(count, 100)}%` }}
              transition={{ duration: 0.1 }}
            />
          </div>
          <span className="text-xs tracking-[0.2em] text-[#FAF9F6]/40 font-light tabular-nums w-8">
            {Math.min(count, 100)}
          </span>
        </div>
      </div>
    </motion.div>
  );
}
