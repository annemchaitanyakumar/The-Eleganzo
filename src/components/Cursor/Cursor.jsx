import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import useMousePosition from '../../hooks/useMousePosition';
import useStore from '../../store/useStore';

export default function Cursor() {
  const { x, y } = useMousePosition();
  const cursorVariant = useStore((state) => state.cursorVariant);
  const cursorText = useStore((state) => state.cursorText);
  const cursorRef = useRef(null);

  // Hide on touch devices
  const isTouchDevice = typeof window !== 'undefined' && 'ontouchstart' in window;

  if (isTouchDevice) return null;

  const variants = {
    default: {
      x: x - 6,
      y: y - 6,
      width: 12,
      height: 12,
      backgroundColor: 'transparent',
      border: '1.5px solid #B6955B',
      mixBlendMode: 'normal',
    },
    hover: {
      x: x - 30,
      y: y - 30,
      width: 60,
      height: 60,
      backgroundColor: 'rgba(182, 149, 91, 0.1)',
      border: '1.5px solid #B6955B',
      mixBlendMode: 'normal',
    },
    text: {
      x: x - 45,
      y: y - 45,
      width: 90,
      height: 90,
      backgroundColor: 'rgba(182, 149, 91, 0.9)',
      border: 'none',
      mixBlendMode: 'normal',
    },
    hidden: {
      x: x - 6,
      y: y - 6,
      width: 12,
      height: 12,
      opacity: 0,
    },
  };

  return (
    <>
      {/* Dot follower */}
      <motion.div
        className="fixed top-0 left-0 w-1.5 h-1.5 rounded-full bg-accent-gold pointer-events-none z-[9999]"
        animate={{
          x: x - 3,
          y: y - 3,
        }}
        transition={{
          type: 'spring',
          stiffness: 500,
          damping: 28,
          mass: 0.5,
        }}
      />

      {/* Ring follower */}
      <motion.div
        ref={cursorRef}
        className="fixed top-0 left-0 rounded-full pointer-events-none z-[9998] flex items-center justify-center"
        variants={variants}
        animate={cursorVariant}
        transition={{
          type: 'spring',
          stiffness: 300,
          damping: 20,
          mass: 0.8,
        }}
      >
        {cursorText && cursorVariant === 'text' && (
          <span className="text-[11px] font-medium tracking-[0.15em] uppercase text-white pointer-events-none select-none">
            {cursorText}
          </span>
        )}
      </motion.div>
    </>
  );
}
