import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { HiOutlineMenuAlt4, HiOutlineX } from 'react-icons/hi';
import useStore from '../../store/useStore';
import MagneticButton from '../Buttons/MagneticButton';

const navLinks = [
  { label: 'Rooms', path: '/rooms' },
  { label: 'Experience', path: '/experience' },
  { label: 'Gallery', path: '/gallery' },
  { label: 'Contact', path: '/contact' },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const { isMenuOpen, setIsMenuOpen } = useStore();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 80);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menu on route change
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname, setIsMenuOpen]);

  // Lock scroll on mobile menu open
  const lenis = useStore((state) => state.lenis);
  useEffect(() => {
    if (isMenuOpen) {
      if (lenis) lenis.stop();
      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
      document.body.style.overflow = 'hidden';
      if (scrollbarWidth > 0) {
        document.body.style.paddingRight = `${scrollbarWidth}px`;
      }
    } else {
      if (lenis) lenis.start();
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';
    }
    return () => {
      if (lenis) lenis.start();
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';
    };
  }, [isMenuOpen, lenis]);

  const isHome = location.pathname === '/';

  return (
    <>
      <motion.header
        initial={{ y: -100, x: "-50%" }}
        animate={{ y: 0, x: "-50%" }}
        transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 1.5 }}
        className="fixed top-4 left-1/2 w-[calc(100%-2rem)] max-w-[1440px] z-[100]"
      >
        <nav className={`w-full flex items-center justify-between px-6 md:px-12 py-4 rounded-full border transition-all duration-700 ${
          isScrolled
            ? 'bg-background-cream/70 backdrop-blur-xl border-accent-gold/20 shadow-[0_20px_50px_-20px_rgba(0,0,0,0.6)]'
            : 'bg-transparent border-transparent'
        }`}>
          {/* Logo */}
          <Link
            to="/"
            className="relative z-10 group"
          >
            <span className="font-heading text-lg md:text-xl tracking-[0.25em] font-medium text-text-primary group-hover:text-accent-gold transition-colors duration-500">
              THE ELEGANZO
            </span>
            <span className="block h-px w-0 group-hover:w-full bg-accent-gold transition-all duration-500 mt-1" />
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-10">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-[10px] tracking-[0.25em] uppercase font-medium transition-colors duration-300 hover:text-accent-gold ${
                  location.pathname === link.path
                    ? 'text-accent-gold'
                    : 'text-text-muted'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* CTA + Hamburger */}
          <div className="flex items-center gap-4">
            <div className="hidden lg:block">
              <MagneticButton
                variant={isScrolled ? 'outline' : 'outline-light'}
                href="/contact"
              >
                Book Your Stay
              </MagneticButton>
            </div>

            {/* Hamburger */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`lg:hidden relative z-10 p-2 transition-colors duration-300 ${
                isMenuOpen ? 'text-[#FAF9F6]' : 'text-text-primary'
              }`}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <HiOutlineX size={22} /> : <HiOutlineMenuAlt4 size={22} />}
            </button>
          </div>
        </nav>
      </motion.header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ clipPath: 'circle(0% at calc(100% - 40px) 40px)' }}
            animate={{ clipPath: 'circle(150% at calc(100% - 40px) 40px)' }}
            exit={{ clipPath: 'circle(0% at calc(100% - 40px) 40px)' }}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-[99] bg-dark-forest flex flex-col items-center justify-center"
          >
            <nav className="flex flex-col items-center gap-8">
              {navLinks.map((link, index) => (
                <motion.div
                  key={link.path}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + index * 0.08, duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
                >
                  <Link
                    to={link.path}
                    className={`font-heading text-4xl md:text-5xl font-light tracking-[0.1em] transition-colors duration-300 ${
                      location.pathname === link.path ? 'text-accent-gold' : 'text-[#FAF9F6] hover:text-accent-gold'
                    }`}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.6 }}
                className="mt-8"
              >
                <MagneticButton variant="outline-light" href="/contact">
                  Book Your Stay
                </MagneticButton>
              </motion.div>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7, duration: 0.6 }}
                className="text-[#FAF9F6]/30 text-xs tracking-[0.3em] uppercase mt-12"
              >
                Kodaikanal, Tamil Nadu
              </motion.p>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
