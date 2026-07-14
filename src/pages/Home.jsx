import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Hero from '../components/Hero/Hero';
import RoomGallery from '../components/RoomGallery/RoomGallery';
import Amenities from '../components/Amenities/Amenities';
import Experience from '../components/Experience/Experience';
import Testimonials from '../components/Testimonials/Testimonials';
import SectionHeading from '../components/Common/SectionHeading';
import ParallaxImage from '../components/Common/ParallaxImage';
import RevealText from '../components/Common/RevealText';
import MagneticButton from '../components/Buttons/MagneticButton';

function AboutSection() {
  return (
    <section className="section-padding px-6 md:px-12 max-w-[1440px] mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        {/* Image */}
        <div className="order-2 lg:order-1">
          <ParallaxImage
            src="/images/about.jpg"
            alt="The Eleganzo mountain view"
            className="aspect-[3/4] rounded-sm"
            speed={0.15}
          />
        </div>

        {/* Content */}
        <div className="order-1 lg:order-2 flex flex-col justify-center">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-label mb-4"
          >
            Our Story
          </motion.span>

          <div className="gold-line mb-8" />

          <RevealText tag="h2" className="text-h1 mb-8">
            Where Mountains Meet Luxury
          </RevealText>

          <RevealText tag="p" className="text-body-lg mb-6 max-w-lg" delay={0.1}>
            Perched at 7,000 feet in the Western Ghats, The Eleganzo is a luxury 2BHK homestay
            that reimagines mountain living. Here, panoramic valley views frame every morning,
            ancient forests whisper through open windows, and the art of slow living is
            celebrated in every detail.
          </RevealText>

          <RevealText tag="p" className="text-body-lg mb-10 max-w-lg" delay={0.2}>
            From the hand-crafted stone fireplace to the carefully curated interiors, from
            home-cooked mountain cuisine to private bonfire evenings — every element has been
            designed to create an experience that lingers long after you descend.
          </RevealText>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-wrap gap-x-12 gap-y-6 mt-6"
          >
            {[
              { number: '7,000', label: 'Feet Above Sea Level' },
              { number: '360°', label: 'Valley Views' },
              { number: '2', label: 'Luxury Bedrooms' },
            ].map((stat) => (
              <div key={stat.label}>
                <span className="font-heading text-3xl md:text-4xl text-accent-gold font-light">
                  {stat.number}
                </span>
                <p className="text-[10px] tracking-[0.15em] uppercase text-text-muted mt-1">
                  {stat.label}
                </p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function BookingCTA() {
  return (
    <section className="relative py-28 md:py-36 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <img
          src="/images/cta-bg.jpg"
          alt="Mountain mist"
          className="w-full h-full object-cover opacity-30"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#080D0A] via-transparent to-[#080D0A]" />
        <div className="absolute inset-0 bg-[#080D0A]/30" />
      </div>

      <div className="relative z-10 max-w-3xl mx-auto px-6 text-center">
        <motion.span
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-label text-[10px] mb-4 block"
        >
          Reserve
        </motion.span>

        <div className="gold-line-wide mx-auto mb-8" />

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="font-heading text-4xl md:text-6xl font-light tracking-[0.06em] mb-6 gold-gradient-text"
        >
          Begin Your Escape
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-sm text-text-muted/70 tracking-wide mb-12 max-w-md mx-auto leading-relaxed"
        >
          Limited to one booking at a time, ensuring complete privacy and an undivided experience.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-6"
        >
          <MagneticButton
            variant="primary"
            href="/contact"
          >
            Book Your Stay
          </MagneticButton>
          <MagneticButton
            variant="outline-light"
            href="/rooms"
          >
            View Rooms
          </MagneticButton>
        </motion.div>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <>
      <Helmet>
        <title>The Eleganzo | Premium Luxury Homestay in Kodaikanal</title>
        <meta
          name="description"
          content="The Eleganzo — A luxury mountain homestay in Kodaikanal at 7,000ft. Breathtaking valley views, curated experiences, and serene mountain living in the Western Ghats."
        />
      </Helmet>

      <Hero />
      <AboutSection />
      <RoomGallery />
      <Amenities />
      <Experience />
      <Testimonials />
      <BookingCTA />
    </>
  );
}
