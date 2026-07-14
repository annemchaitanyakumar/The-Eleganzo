import { useRef } from 'react';
import { motion } from 'framer-motion';
import useStore from '../../store/useStore';

export default function MagneticButton({
  children,
  className = '',
  variant = 'primary',
  href,
  onClick,
  ...props
}) {
  const btnRef = useRef(null);
  const setCursor = useStore((state) => state.setCursor);
  const resetCursor = useStore((state) => state.resetCursor);

  const handleMouseMove = (e) => {
    const btn = btnRef.current;
    if (!btn) return;

    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    btn.style.transform = `translate(${x * 0.15}px, ${y * 0.15}px)`;
  };

  const handleMouseLeave = () => {
    const btn = btnRef.current;
    if (btn) {
      btn.style.transform = 'translate(0, 0)';
    }
    resetCursor();
  };

  const handleMouseEnter = () => {
    setCursor('hover');
  };

  const baseClasses =
    'relative inline-flex items-center justify-center gap-2 overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] cursor-pointer';

  const variantClasses = {
    primary:
      'px-8 py-4 bg-accent-gold text-white text-xs tracking-[0.2em] uppercase font-medium hover:bg-accent-gold-dark',
    outline:
      'px-8 py-4 border border-accent-gold text-accent-gold text-xs tracking-[0.2em] uppercase font-medium hover:bg-accent-gold hover:text-white',
    ghost:
      'px-6 py-3 text-text-primary text-xs tracking-[0.2em] uppercase font-medium hover:text-accent-gold',
    'outline-light':
      'px-8 py-4 border border-[#FAF9F6]/30 text-[#FAF9F6] text-xs tracking-[0.2em] uppercase font-medium hover:bg-[#FAF9F6] hover:text-dark-forest',
  };

  const Component = href ? 'a' : 'button';

  const isFullWidth = className.includes('w-full');
  const containerClasses = `inline-block ${isFullWidth ? 'w-full' : ''}`;

  return (
    <motion.div
      ref={btnRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
      style={{ transition: 'transform 0.4s cubic-bezier(0.25, 0.1, 0.25, 1)' }}
      className={containerClasses}
    >
      <Component
        href={href}
        onClick={onClick}
        className={`${baseClasses} ${variantClasses[variant] || variantClasses.primary} ${className}`}
        {...props}
      >
        {children}
        <span className="absolute inset-0 bg-white/10 translate-y-full hover:translate-y-0 transition-transform duration-500" />
      </Component>
    </motion.div>
  );
}
