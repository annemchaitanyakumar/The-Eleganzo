import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion, AnimatePresence } from 'framer-motion';
import { HiArrowLeft, HiArrowRight, HiCheck } from 'react-icons/hi';
import { getRoomById, rooms } from '../data/rooms';
import MagneticButton from '../components/Buttons/MagneticButton';
import AmbientScene from '../components/ThreeScene/AmbientScene';

function ImageGallery({ images, title }) {
  const [current, setCurrent] = useState(0);

  return (
    <div className="relative w-full aspect-[16/10] md:aspect-[16/9] overflow-hidden bg-background-cream">
      <AnimatePresence mode="wait">
        <motion.img
          key={current}
          src={images[current]}
          alt={`${title} - Image ${current + 1}`}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
          className="w-full h-full object-cover"
        />
      </AnimatePresence>

      {/* Navigation */}
      {images.length > 1 && (
        <>
          <button
            onClick={() => setCurrent((prev) => (prev - 1 + images.length) % images.length)}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-accent-gold/80 transition-all duration-300"
          >
            <HiArrowLeft size={18} />
          </button>
          <button
            onClick={() => setCurrent((prev) => (prev + 1) % images.length)}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-accent-gold/80 transition-all duration-300"
          >
            <HiArrowRight size={18} />
          </button>

          {/* Indicators */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
            {images.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrent(idx)}
                className={`h-0.5 transition-all duration-500 ${
                  idx === current ? 'w-8 bg-accent-gold' : 'w-3 bg-white/30'
                }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default function RoomDetails() {
  const { id } = useParams();
  const room = getRoomById(id);

  if (!room) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-h1 mb-4">Room Not Found</h1>
          <Link to="/rooms" className="text-accent-gold text-label hover:underline">
            ← Back to Rooms
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>{room.title} | The Eleganzo — Kodaikanal</title>
        <meta name="description" content={room.description} />
      </Helmet>

      {/* Back link */}
      <div className="pt-24 pb-4 px-6 md:px-12 max-w-[1440px] mx-auto">
        <Link
          to="/rooms"
          className="inline-flex items-center gap-2 text-xs tracking-[0.15em] uppercase text-text-muted hover:text-accent-gold transition-colors duration-300"
        >
          <HiArrowLeft size={14} />
          All Rooms
        </Link>
      </div>

      {/* Gallery */}
      <section className="px-6 md:px-12 max-w-[1440px] mx-auto mb-16">
        <ImageGallery images={room.images} title={room.title} />
      </section>

      {/* Room Details */}
      <section className="px-6 md:px-12 max-w-[1440px] mx-auto relative">
        <AmbientScene className="opacity-30" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16">
          {/* Content - 3 cols */}
          <div className="lg:col-span-3">
            <span className="text-label mb-3 block">{room.subtitle}</span>
            <h1 className="text-h1 mb-6">{room.title}</h1>

            <div className="flex flex-wrap items-center gap-x-6 gap-y-3 mb-8">
              <span className="text-sm text-text-muted">{room.size}</span>
              <span className="hidden sm:inline w-px h-4 bg-accent-gold/30" />
              <span className="text-sm text-text-muted">{room.occupancy}</span>
              <span className="hidden sm:inline w-px h-4 bg-accent-gold/30" />
              <div className="flex items-baseline gap-1">
                <span className="text-price">{room.price}</span>
                <span className="text-xs text-text-muted">/ night</span>
              </div>
            </div>

            <div className="gold-line mb-8" />

            <p className="text-body-lg mb-12 max-w-2xl leading-[1.9]">{room.description}</p>

            {/* Features */}
            <div className="mb-12">
              <h3 className="text-h4 mb-6">Room Features</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {room.features.map((feature) => (
                  <div key={feature} className="flex items-start gap-3">
                    <HiCheck className="text-accent-gold mt-0.5 shrink-0" />
                    <span className="text-sm text-text-muted">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Amenities */}
            <div>
              <h3 className="text-h4 mb-6">Amenities</h3>
              <div className="flex flex-wrap gap-3">
                {room.amenities.map((amenity) => (
                  <span
                    key={amenity}
                    className="text-[11px] tracking-[0.12em] uppercase px-4 py-2 border border-accent-gold/15 text-text-muted rounded-sm"
                  >
                    {amenity}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Booking Card - 2 cols */}
          <div className="lg:col-span-2">
            <div className="sticky top-28 bg-background-cream border border-accent-gold/10 p-8 md:p-10 rounded-sm">
              <h3 className="font-heading text-2xl mb-2">{room.title}</h3>
              <div className="flex items-baseline gap-2 mb-6">
                <span className="text-price text-3xl">{room.price}</span>
                <span className="text-xs text-text-muted">/ night</span>
              </div>

              <div className="gold-line-wide mb-8" />

              <div className="space-y-4 mb-8">
                <div className="flex justify-between text-sm">
                  <span className="text-text-muted">Room Size</span>
                  <span className="text-text-primary">{room.size}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-text-muted">Max Guests</span>
                  <span className="text-text-primary">{room.occupancy}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-text-muted">Bed Type</span>
                  <span className="text-text-primary">{room.amenities[0]}</span>
                </div>
              </div>

              <MagneticButton variant="primary" className="w-full justify-center" href="/contact">
                Book This Room
              </MagneticButton>

              <p className="text-[10px] text-text-muted text-center mt-4 tracking-wide">
                Free cancellation · Instant confirmation
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Spacer */}
      <div className="h-24" />
    </>
  );
}
