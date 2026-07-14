import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { HiOutlineLocationMarker, HiOutlinePhone, HiOutlineMail, HiOutlineClock } from 'react-icons/hi';
import SectionHeading from '../components/Common/SectionHeading';
import MagneticButton from '../components/Buttons/MagneticButton';

const contactInfo = [
  {
    icon: HiOutlineLocationMarker,
    title: 'Address',
    content: 'Naidupuram, Kodaikanal, Tamil Nadu 624101',
    link: 'https://maps.app.goo.gl/WqkCWEEkDBNM4sLb7',
  },
  {
    icon: HiOutlinePhone,
    title: 'Phone',
    content: '+91 98765 43210',
    link: 'tel:+919876543210',
  },
  {
    icon: HiOutlineMail,
    title: 'Email',
    content: 'stay@theeleganzo.com',
    link: 'mailto:stay@theeleganzo.com',
  },
  {
    icon: HiOutlineClock,
    title: 'Check-in / Check-out',
    content: '2:00 PM / 11:00 AM',
    link: null,
  },
];

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    checkin: '',
    checkout: '',
    guests: '2',
    room: '',
    message: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
    // In production, this would submit to an API
  };

  return (
    <>
      <Helmet>
        <title>Contact & Book | The Eleganzo — Kodaikanal</title>
        <meta name="description" content="Book your stay at The Eleganzo luxury homestay in Kodaikanal. Contact us for reservations and inquiries." />
      </Helmet>

      {/* Hero */}
      <section className="relative h-[40vh] min-h-[350px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/images/contact-hero.jpg"
            alt="Contact The Eleganzo"
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
            Reservations
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.76, 0, 0.24, 1] }}
            className="font-heading text-5xl md:text-7xl font-light text-[#FAF9F6] tracking-[0.05em]"
          >
            Get in Touch
          </motion.h1>
        </div>
      </section>

      <section className="section-padding px-6 md:px-12 max-w-[1440px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Form */}
          <div>
            <h2 className="text-h2 mb-3">Book Your Stay</h2>
            <p className="text-body mb-10">
              Complete the form below and our team will confirm your reservation within 24 hours.
            </p>

            {isSubmitted ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-background-cream border border-accent-gold/20 p-10 rounded-sm text-center"
              >
                <div className="w-12 h-12 bg-accent-gold/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-accent-gold text-2xl">✓</span>
                </div>
                <h3 className="text-h3 mb-3">Inquiry Received</h3>
                <p className="text-body text-sm">
                  Thank you for your interest. We will reach out within 24 hours to confirm your reservation.
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="text-[10px] tracking-[0.2em] uppercase text-text-muted block mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full bg-transparent border-b border-accent-gold/20 py-3 text-text-primary text-sm focus:border-accent-gold focus:outline-none transition-colors duration-300"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] tracking-[0.2em] uppercase text-text-muted block mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full bg-transparent border-b border-accent-gold/20 py-3 text-text-primary text-sm focus:border-accent-gold focus:outline-none transition-colors duration-300"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="text-[10px] tracking-[0.2em] uppercase text-text-muted block mb-2">
                      Phone
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full bg-transparent border-b border-accent-gold/20 py-3 text-text-primary text-sm focus:border-accent-gold focus:outline-none transition-colors duration-300"
                      placeholder="+91 XXXXX XXXXX"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] tracking-[0.2em] uppercase text-text-muted block mb-2">
                      Guests
                    </label>
                    <select
                      name="guests"
                      value={formData.guests}
                      onChange={handleChange}
                      className="w-full bg-transparent border-b border-accent-gold/20 py-3 text-text-primary text-sm focus:border-accent-gold focus:outline-none transition-colors duration-300 cursor-pointer"
                    >
                      <option value="1">1 Guest</option>
                      <option value="2">2 Guests</option>
                      <option value="3">3 Guests</option>
                      <option value="4">4 Guests</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="text-[10px] tracking-[0.2em] uppercase text-text-muted block mb-2">
                      Check-in Date
                    </label>
                    <input
                      type="date"
                      name="checkin"
                      value={formData.checkin}
                      onChange={handleChange}
                      required
                      className="w-full bg-transparent border-b border-accent-gold/20 py-3 text-text-primary text-sm focus:border-accent-gold focus:outline-none transition-colors duration-300"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] tracking-[0.2em] uppercase text-text-muted block mb-2">
                      Check-out Date
                    </label>
                    <input
                      type="date"
                      name="checkout"
                      value={formData.checkout}
                      onChange={handleChange}
                      required
                      className="w-full bg-transparent border-b border-accent-gold/20 py-3 text-text-primary text-sm focus:border-accent-gold focus:outline-none transition-colors duration-300"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[10px] tracking-[0.2em] uppercase text-text-muted block mb-2">
                    Preferred Room
                  </label>
                  <select
                    name="room"
                    value={formData.room}
                    onChange={handleChange}
                    className="w-full bg-transparent border-b border-accent-gold/20 py-3 text-text-primary text-sm focus:border-accent-gold focus:outline-none transition-colors duration-300 cursor-pointer"
                  >
                    <option value="">Select a room</option>
                    <option value="valley-view-suite">Valley View Suite — ₹8,500/night</option>
                    <option value="forest-retreat-room">Forest Retreat Room — ₹6,500/night</option>
                    <option value="the-eleganzo-complete">The Eleganzo Complete — ₹14,000/night</option>
                  </select>
                </div>

                <div>
                  <label className="text-[10px] tracking-[0.2em] uppercase text-text-muted block mb-2">
                    Special Requests
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={4}
                    className="w-full bg-transparent border-b border-accent-gold/20 py-3 text-text-primary text-sm focus:border-accent-gold focus:outline-none transition-colors duration-300 resize-none"
                    placeholder="Any special requests or dietary requirements..."
                  />
                </div>

                <div className="pt-8">
                  <MagneticButton variant="primary" type="submit">
                    Submit Inquiry
                  </MagneticButton>
                </div>
              </form>
            )}
          </div>

          {/* Contact Info & Map */}
          <div>
            <h2 className="text-h2 mb-3">Find Us</h2>
            <p className="text-body mb-10">
              Nestled in the Palani Hills at 7,000 feet, a 3-hour drive from Madurai.
            </p>

            <div className="space-y-6 mb-12">
              {contactInfo.map((info) => {
                const Icon = info.icon;
                const Wrapper = info.link ? 'a' : 'div';
                const wrapperProps = info.link
                  ? { href: info.link, target: info.link.startsWith('http') ? '_blank' : undefined, rel: 'noopener noreferrer' }
                  : {};

                return (
                  <Wrapper
                    key={info.title}
                    {...wrapperProps}
                    className="flex items-start gap-4 group"
                  >
                    <div className="w-10 h-10 bg-background-cream border border-accent-gold/10 rounded-full flex items-center justify-center shrink-0 group-hover:bg-accent-gold/10 transition-colors duration-300">
                      <Icon className="text-accent-gold text-lg" />
                    </div>
                    <div>
                      <p className="text-[10px] tracking-[0.2em] uppercase text-accent-gold mb-1">
                        {info.title}
                      </p>
                      <p className="text-sm text-text-muted group-hover:text-text-primary transition-colors duration-300">
                        {info.content}
                      </p>
                    </div>
                  </Wrapper>
                );
              })}
            </div>

            {/* Map embed */}
            <div className="aspect-[4/3] rounded-sm overflow-hidden border border-accent-gold/10">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3926.3!2d77.4985507!3d10.2345376!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b07676649a5a0ad%3A0x6bbc66d4bd39afa9!2sTHE%20ELEGANZO%20(Homestay)!5e0!3m2!1sen!2sin!4v1"
                width="100%"
                height="100%"
                style={{ border: 0, filter: 'grayscale(0.5) contrast(1.1)' }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="The Eleganzo Location"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
