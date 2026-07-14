import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import Journey from '../components/Experience/Experience';

export default function ExperiencePage() {
  return (
    <>
      <Helmet>
        <title>The Experience | The Eleganzo — Kodaikanal</title>
        <meta name="description" content="A day at The Eleganzo — from dawn above the clouds to starlit bonfires. Discover the curated mountain experience in Kodaikanal." />
      </Helmet>

      {/* Cinematic hero */}
      <section className="relative h-[45vh] min-h-[360px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/images/exp-hero.jpg"
            alt="The Eleganzo experience"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/20 to-[var(--color-background)]" />
        </div>

        <div className="relative z-10 text-center px-6">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-xs tracking-[0.25em] uppercase text-[var(--color-accent-gold)] mb-4 block"
          >
            The Journey
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.76, 0, 0.24, 1] }}
            className="font-heading text-5xl md:text-7xl font-light text-white tracking-[0.04em]"
          >
            The Experience
          </motion.h1>
        </div>
      </section>

      <Journey />
    </>
  );
}
