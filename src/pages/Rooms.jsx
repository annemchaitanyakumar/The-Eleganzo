import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import SectionHeading from '../components/Common/SectionHeading';
import RoomCard from '../components/RoomCard/RoomCard';
import { rooms } from '../data/rooms';

export default function Rooms() {
  return (
    <>
      <Helmet>
        <title>Rooms & Suites | The Eleganzo — Kodaikanal</title>
        <meta name="description" content="Discover our luxury accommodations — Valley View Suite, Forest Retreat Room, or the complete Eleganzo private estate in Kodaikanal." />
      </Helmet>

      {/* Hero Banner */}
      <section className="relative h-[50vh] min-h-[400px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/images/rooms-hero.jpg"
            alt="Luxury rooms at The Eleganzo"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-background" />
        </div>

        <div className="relative z-10 text-center">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-label text-[#FAF9F6] mb-4 block"
          >
            Accommodations
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.76, 0, 0.24, 1] }}
            className="font-heading text-5xl md:text-7xl font-light text-[#FAF9F6] tracking-[0.05em]"
          >
            Rooms & Suites
          </motion.h1>
        </div>
      </section>

      {/* Room listings */}
      <section className="section-padding px-6 md:px-12 max-w-[1440px] mx-auto">
        <div className="max-w-2xl mx-auto text-center mb-16">
          <p className="text-body-lg">
            Every room at The Eleganzo opens to a different chapter of the mountain story.
            Choose your view, choose your experience.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
          {rooms.map((room, index) => (
            <RoomCard key={room.id} room={room} index={index} />
          ))}
        </div>
      </section>
    </>
  );
}
