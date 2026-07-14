import SectionHeading from '../Common/SectionHeading';
import RoomCard from '../RoomCard/RoomCard';
import { rooms } from '../../data/rooms';

export default function RoomGallery() {
  return (
    <section className="section-padding px-6 md:px-12 max-w-[1440px] mx-auto">
      <SectionHeading
        label="Accommodations"
        title="Your Private Sanctuary"
        subtitle="Each space is thoughtfully designed to harmonize luxury with the natural beauty of the Western Ghats."
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
        {rooms.map((room, index) => (
          <RoomCard key={room.id} room={room} index={index} />
        ))}
      </div>
    </section>
  );
}
