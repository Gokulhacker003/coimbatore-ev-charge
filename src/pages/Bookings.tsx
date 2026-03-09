import { useBookings } from "@/context/BookingContext";
import { CalendarDays, Zap, Clock, MapPin } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";

const statusStyles = {
  upcoming: "bg-accent text-accent-foreground",
  charging: "bg-primary text-primary-foreground",
  completed: "bg-muted text-muted-foreground",
};

const Bookings = () => {
  const { bookings } = useBookings();

  return (
    <div className="container mx-auto min-h-screen px-4 py-8 pb-24 md:pb-8">
      <h1 className="mb-6 text-2xl font-bold text-foreground">My Bookings</h1>

      {bookings.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <CalendarDays className="mb-4 h-16 w-16 text-muted-foreground/50" />
          <h2 className="text-xl font-semibold text-foreground">No bookings yet</h2>
          <p className="mt-2 text-muted-foreground">Find a station and book your charging slot!</p>
        </div>
      ) : (
        <div className="space-y-4">
          {bookings.map((booking, i) => (
            <motion.div
              key={booking.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="rounded-xl bg-card p-5 shadow-md"
            >
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-semibold text-foreground">{booking.stationName}</h3>
                  <div className="mt-2 flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <CalendarDays className="h-3.5 w-3.5" />
                      {booking.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-3.5 w-3.5" />
                      {booking.timeSlot}
                    </span>
                  </div>
                </div>
                <Badge className={statusStyles[booking.status]}>
                  {booking.status === "charging" && <Zap className="mr-1 h-3 w-3" />}
                  {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                </Badge>
              </div>

              <div className="mt-3 flex gap-2 text-xs text-muted-foreground">
                <span className="rounded-full bg-muted px-2.5 py-1">{booking.evType}</span>
                <span className="rounded-full bg-muted px-2.5 py-1">{booking.chargingType} Charger</span>
                <span className="rounded-full bg-muted px-2.5 py-1">Port #{booking.portNumber}</span>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Bookings;
