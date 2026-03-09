import { User, Zap, MapPin, CalendarDays } from "lucide-react";
import { useBookings } from "@/context/BookingContext";
import { motion } from "framer-motion";

const Profile = () => {
  const { bookings } = useBookings();
  const completed = bookings.filter((b) => b.status === "completed").length;
  const upcoming = bookings.filter((b) => b.status === "upcoming").length;

  return (
    <div className="container mx-auto min-h-screen px-4 py-8 pb-24 md:pb-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mx-auto max-w-md space-y-6"
      >
        <div className="flex flex-col items-center rounded-2xl bg-card p-8 shadow-md">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
            <User className="h-10 w-10 text-primary" />
          </div>
          <h2 className="mt-4 text-xl font-bold text-foreground">EV User</h2>
          <p className="text-sm text-muted-foreground">Coimbatore, Tamil Nadu</p>
        </div>

        <div className="grid grid-cols-3 gap-3">
          {[
            { icon: CalendarDays, label: "Total", value: bookings.length },
            { icon: Zap, label: "Completed", value: completed },
            { icon: MapPin, label: "Upcoming", value: upcoming },
          ].map(({ icon: Icon, label, value }) => (
            <div key={label} className="rounded-xl bg-card p-4 text-center shadow-sm">
              <Icon className="mx-auto h-5 w-5 text-primary" />
              <p className="mt-1 text-lg font-bold text-foreground">{value}</p>
              <p className="text-xs text-muted-foreground">{label}</p>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default Profile;
