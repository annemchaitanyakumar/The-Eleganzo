import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiChevronLeft, HiChevronRight } from 'react-icons/hi';
import SectionHeading from '../Common/SectionHeading';
import { testimonials } from '../../data/testimonials';

export default function Testimonials() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);

  const next = useCallback(() => {
    setDirection(1);
    setCurrent((prev) => (prev + 1) % testimonials.length);
  }, []);

  const prev = useCallback(() => {
    setDirection(-1);
    setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  }, []);

  // Auto-advance
  useEffect(() => {
    const timer = setInterval(next, 6000);
    return () => clearInterval(timer);
  }, [next]);

  const testimonial = testimonials[current];

  const slideVariants = {
    enter: (dir) => ({
      x: dir > 0 ? 80 : -80,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (dir) => ({
      x: dir > 0 ? -80 : 80,
      opacity: 0,
    }),
  };

  return (
    <section className="section-padding px-6 md:px-12 max-w-[1440px] mx-auto">
      <SectionHeading
        label="Voices"
        title="Guest Stories"
        subtitle="Whispered by those who found their sanctuary."
      />

      <div className="max-w-4xl mx-auto relative">
        {/* Testimonial content */}
        <div className="min-h-[280px] flex items-center justify-center">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={testimonial.id}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
              className="text-center"
            >
              {/* Quote */}
              <div className="relative mb-10">
                <span className="absolute -top-8 left-1/2 -translate-x-1/2 text-6xl text-accent-gold/20 font-heading leading-none">
                  "
                </span>
                <p className="text-quote max-w-3xl mx-auto px-8">
                  {testimonial.quote}
                </p>
              </div>

              {/* Gold line */}
              <div className="gold-line-wide mx-auto mb-6" />

              {/* Author */}
              <p className="font-heading text-lg text-text-primary tracking-wide">
                {testimonial.name}
              </p>
              <p className="text-xs text-text-muted tracking-[0.2em] uppercase mt-1">
                {testimonial.location} · {testimonial.date}
              </p>

              {/* Stars */}
              <div className="flex items-center justify-center gap-1 mt-4">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <span key={i} className="text-accent-gold text-sm">★</span>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-center gap-6 mt-8">
          <button
            onClick={prev}
            className="p-3 border border-accent-gold/20 rounded-full text-accent-gold hover:bg-accent-gold hover:text-white transition-all duration-300"
            aria-label="Previous testimonial"
          >
            <HiChevronLeft size={18} />
          </button>

          {/* Indicators */}
          <div className="flex items-center gap-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setDirection(index > current ? 1 : -1);
                  setCurrent(index);
                }}
                className={`h-px transition-all duration-500 ${
                  index === current ? 'w-8 bg-accent-gold' : 'w-4 bg-accent-gold/20'
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>

          <button
            onClick={next}
            className="p-3 border border-accent-gold/20 rounded-full text-accent-gold hover:bg-accent-gold hover:text-white transition-all duration-300"
            aria-label="Next testimonial"
          >
            <HiChevronRight size={18} />
          </button>
        </div>
      </div>
    </section>
  );
}
