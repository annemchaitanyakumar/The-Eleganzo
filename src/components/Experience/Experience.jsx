import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';
import useStore from '../../store/useStore';

const experiences = [
  {
    id: 'morning',
    time: '6:00 AM',
    label: 'Morning',
    title: 'Dawn Above the Clouds',
    description:
      'Watch the sun rise through a sea of clouds from your private balcony. Golden light filters through ancient pine forests as mountain coffee brews.',
    image: '/images/exp-morning.jpg',
    accent: '#D4A853',
  },
  {
    id: 'afternoon',
    time: '2:00 PM',
    label: 'Afternoon',
    title: 'Trails Through Shola Forests',
    description:
      'Rare orchids cling to moss-covered trees. Follow hidden waterfalls and discover secret viewpoints overlooking the valley.',
    image: '/images/exp-afternoon.jpg',
    accent: '#6BAE8A',
  },
  {
    id: 'golden',
    time: '5:30 PM',
    label: 'Golden Hour',
    title: 'The Valley Turns Gold',
    description:
      'The entire valley transforms into liquid gold. Watch mountains shift through amber, copper, and rose from the private viewpoint deck.',
    image: '/images/exp-golden.jpg',
    accent: '#E8923A',
  },
  {
    id: 'night',
    time: '8:00 PM',
    label: 'Night',
    title: 'Starlight & Embers',
    description:
      'Stone bonfire, crisp mountain air, a million unfiltered stars. Home-cooked dinner under the canopy of ancient trees.',
    image: '/images/exp-night.jpg',
    accent: '#8B7EC8',
  },
];

export default function Journey() {
  const [active, setActive] = useState(0);
  const imageRef = useRef(null);
  const sectionRef = useRef(null);
  const throttleRef = useRef(false);
  const activeRef = useRef(0); // always-current ref for use inside event listener
  const lenis = useStore((state) => state.lenis);
  const lenisRef = useRef(lenis);

  // Keep lenisRef in sync
  useEffect(() => { lenisRef.current = lenis; }, [lenis]);
  // Keep activeRef in sync
  useEffect(() => { activeRef.current = active; }, [active]);

  // Snap section to viewport center when it first enters view
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        const l = lenisRef.current;
        if (!l) return;

        const sectionH = section.offsetHeight;
        const viewportH = window.innerHeight;
        // Offset: scroll so section top lands at (viewport - section) / 2
        const offset = -Math.max(0, (viewportH - sectionH) / 2);

        l.scrollTo(section, {
          offset,
          duration: 1.2,
          easing: (t) => 1 - Math.pow(1 - t, 4), // easeOutQuart
        });

        // Only snap once per mount
        observer.disconnect();
      },
      {
        // Fire when 20% of the section is visible
        threshold: 0.2,
      }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []); // runs once on mount

  // Animate image on step change
  useEffect(() => {
    if (!imageRef.current) return;
    gsap.fromTo(
      imageRef.current,
      { scale: 1.07, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.75, ease: 'power3.out' }
    );
  }, [active]);

  // Wheel listener — attached as non-passive so we can preventDefault
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const onWheel = (e) => {
      const current = activeRef.current;
      const scrollingDown = e.deltaY > 0;
      const scrollingUp = e.deltaY < 0;
      const atFirst = current === 0;
      const atLast  = current === experiences.length - 1;

      if (scrollingDown && atLast) {
        // Last step → let Lenis scroll past the section
        lenisRef.current?.scrollTo('next', { offset: 200 });
        return;
      }
      if (scrollingUp && atFirst) {
        // First step → let Lenis scroll backward
        lenisRef.current?.scrollTo('prev', { offset: -200 });
        return;
      }

      // Consume the event — don't let Lenis or native scroll touch it
      e.preventDefault();
      e.stopPropagation();

      if (throttleRef.current) return;
      throttleRef.current = true;
      setTimeout(() => { throttleRef.current = false; }, 650);

      setActive(prev =>
        scrollingDown
          ? Math.min(prev + 1, experiences.length - 1)
          : Math.max(prev - 1, 0)
      );
    };

    // passive: false is required to call preventDefault on wheel events
    section.addEventListener('wheel', onWheel, { passive: false });
    return () => section.removeEventListener('wheel', onWheel);
  }, []); // no deps — uses refs to stay current

  const current = experiences[active];

  return (
    /*
      data-lenis-prevent — tells Lenis to NOT intercept wheel events on this element.
      Our own listener (passive:false) handles them exclusively.
    */
    <section
      ref={sectionRef}
      data-lenis-prevent
      className="py-20 md:py-28 px-6 md:px-16 max-w-[1400px] mx-auto"
    >
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-4">
        <div>
          <span className="text-xs tracking-[0.25em] uppercase text-[var(--color-accent-gold)] mb-3 block">
            The Journey
          </span>
          <h2 className="font-heading text-4xl md:text-5xl font-light text-white leading-tight">
            A Day at The Eleganzo
          </h2>
        </div>
        <p className="text-sm text-[var(--color-text-muted)] max-w-xs leading-relaxed hidden md:block">
          Click or scroll to move through the day.
        </p>
      </div>

      {/* Two-column layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-14 items-start">

        {/* Left — Image */}
        <div className="relative overflow-hidden rounded-xl aspect-[4/3] lg:aspect-[5/4] bg-[var(--color-forest)]">
          <div ref={imageRef} className="absolute inset-0">
            <img
              key={current.id}
              src={current.image}
              alt={current.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
          </div>

          {/* Time badge */}
          <div className="absolute top-5 left-5 z-10 flex items-center gap-2 bg-black/40 backdrop-blur-md border border-white/10 rounded-full px-4 py-2">
            <span
              className="w-2 h-2 rounded-full flex-shrink-0"
              style={{ background: current.accent }}
            />
            <span className="text-white text-xs tracking-widest font-light">{current.time}</span>
          </div>

          {/* Counter */}
          <div className="absolute bottom-5 right-5 z-10 text-white/30 font-heading text-xs tracking-widest">
            {String(active + 1).padStart(2, '0')} / {String(experiences.length).padStart(2, '0')}
          </div>
        </div>

        {/* Right — Content + Timeline */}
        <div className="flex flex-col justify-between h-full gap-8">

          {/* Active content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={current.id}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.45, ease: [0.76, 0, 0.24, 1] }}
              className="flex flex-col gap-4"
            >
              <span
                className="text-xs tracking-[0.2em] uppercase font-light"
                style={{ color: current.accent }}
              >
                {current.label}
              </span>
              <h3 className="font-heading text-3xl md:text-4xl font-light text-white leading-snug">
                {current.title}
              </h3>
              <p className="text-[var(--color-text-muted)] text-sm md:text-base leading-[1.85] max-w-sm">
                {current.description}
              </p>
            </motion.div>
          </AnimatePresence>

          {/* Timeline — clickable */}
          <div className="flex flex-col gap-0 border-l border-white/10 pl-5">
            {experiences.map((exp, i) => {
              const isActive = i === active;
              return (
                <button
                  key={exp.id}
                  onClick={() => setActive(i)}
                  className={`group flex items-start gap-4 py-4 text-left relative cursor-pointer transition-all duration-300 ${
                    isActive ? 'opacity-100' : 'opacity-40 hover:opacity-70'
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="timeline-indicator"
                      className="absolute -left-[21px] top-0 bottom-0 w-px"
                      style={{ background: exp.accent }}
                      transition={{ type: 'spring', stiffness: 400, damping: 40 }}
                    />
                  )}
                  <div
                    className="w-2 h-2 rounded-full flex-shrink-0 mt-1.5 -ml-[25px] transition-all duration-300"
                    style={{
                      background: isActive ? exp.accent : 'rgba(255,255,255,0.2)',
                      boxShadow: isActive ? `0 0 8px ${exp.accent}80` : 'none',
                    }}
                  />
                  <div className="flex flex-col gap-0.5">
                    <span className="text-xs text-[var(--color-text-muted)] tracking-widest">
                      {exp.time}
                    </span>
                    <span className={`text-sm font-light transition-colors duration-300 ${isActive ? 'text-white' : 'text-white/60'}`}>
                      {exp.title}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Progress pills */}
          
        </div>
      </div>
    </section>
  );
}
