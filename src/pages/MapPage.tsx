import { useState } from "react";
import MapView from "@/components/MapView";
import StationCard from "@/components/StationCard";
import BookingModal from "@/components/BookingModal";
import EVFilter from "@/components/EVFilter";
import { Station } from "@/data/stations";
import { useStations } from "@/context/StationContext";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { AnimatePresence } from "framer-motion";

const MapPage = () => {
  const [bookingStation, setBookingStation] = useState<Station | null>(null);
  const { selectedStation, setSelectedStation, searchQuery, setSearchQuery } = useStations();

  return (
    <div className="relative flex h-[calc(100vh-4rem)] flex-col md:h-[calc(100vh-4rem)]">
      {/* Top Bar */}
      <div className="absolute left-0 right-0 top-0 z-10 p-3 md:p-4">
        <div className="mx-auto flex max-w-2xl flex-col gap-3 rounded-2xl bg-card/90 p-3 shadow-lg backdrop-blur-md">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search stations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>
          <EVFilter />
        </div>
      </div>

      {/* Map */}
      <div className="flex-1">
        <MapView onStationClick={setSelectedStation} />
      </div>

      {/* Station Card - Bottom Sheet on Mobile */}
      <AnimatePresence>
        {selectedStation && (
          <div className="absolute bottom-0 left-0 right-0 z-10 md:absolute md:bottom-4 md:right-4 md:left-auto md:w-96">
            <StationCard
              station={selectedStation}
              onBookSlot={() => setBookingStation(selectedStation)}
              onClose={() => setSelectedStation(null)}
            />
          </div>
        )}
      </AnimatePresence>

      {/* Booking Modal */}
      {bookingStation && (
        <BookingModal
          station={bookingStation}
          open={!!bookingStation}
          onClose={() => setBookingStation(null)}
        />
      )}
    </div>
  );
};

export default MapPage;
