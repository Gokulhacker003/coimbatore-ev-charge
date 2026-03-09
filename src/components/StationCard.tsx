import { Station } from "@/data/stations";
import { Zap, Clock, Star, MapPin, Battery, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";

interface StationCardProps {
  station: Station;
  onBookSlot: () => void;
  onClose: () => void;
}

const StationCard = ({ station, onBookSlot, onClose }: StationCardProps) => {
  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 100, opacity: 0 }}
      transition={{ type: "spring", damping: 25, stiffness: 300 }}
      className="rounded-t-2xl bg-card shadow-2xl md:rounded-2xl"
    >
      <div className="flex justify-center py-2 md:hidden">
        <button onClick={onClose} className="h-1.5 w-12 rounded-full bg-border" />
      </div>

      <div className="space-y-4 p-5">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h3 className="text-lg font-bold text-foreground">{station.name}</h3>
            <p className="mt-1 flex items-center gap-1 text-sm text-muted-foreground">
              <MapPin className="h-3.5 w-3.5" />
              {station.address}
            </p>
          </div>
          <div className="flex items-center gap-1 rounded-lg bg-accent px-2.5 py-1">
            <Star className="h-4 w-4 fill-primary text-primary" />
            <span className="text-sm font-semibold text-accent-foreground">{station.rating}</span>
          </div>
        </div>

        {/* Charging Types */}
        <div className="flex flex-wrap gap-2">
          {station.chargingTypes.map((type) => (
            <Badge key={type} variant="secondary" className="gap-1">
              <Zap className="h-3 w-3" />
              {type} Charger
            </Badge>
          ))}
        </div>

        {/* EV Types */}
        <div className="flex gap-2">
          {station.evTypes.map((type) => (
            <span
              key={type}
              className="rounded-full bg-muted px-3 py-1 text-xs font-medium text-muted-foreground"
            >
              {type}
            </span>
          ))}
        </div>

        {/* Port Info */}
        <div className="grid grid-cols-3 gap-3 rounded-xl bg-muted/50 p-4">
          <div className="text-center">
            <Battery className="mx-auto h-5 w-5 text-primary" />
            <p className="mt-1 text-lg font-bold text-foreground">{station.availablePorts}</p>
            <p className="text-xs text-muted-foreground">Available</p>
          </div>
          <div className="text-center">
            <Zap className="mx-auto h-5 w-5 text-primary" />
            <p className="mt-1 text-lg font-bold text-foreground">{station.chargingSpeed}</p>
            <p className="text-xs text-muted-foreground">Speed</p>
          </div>
          <div className="text-center">
            <Clock className="mx-auto h-5 w-5 text-primary" />
            <p className="mt-1 text-lg font-bold text-foreground">{station.estimatedWaitTime}</p>
            <p className="text-xs text-muted-foreground">Wait Time</p>
          </div>
        </div>

        {/* Info Row */}
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">
            {station.totalPorts} total ports • ₹{station.pricePerKwh}/kWh
          </span>
          <span className={`font-medium ${station.isOpen ? "text-primary" : "text-destructive"}`}>
            {station.isOpen ? "Open" : "Closed"} • {station.openHours}
          </span>
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          <Button onClick={onBookSlot} className="flex-1 gap-2">
            <Zap className="h-4 w-4" />
            Book Slot
          </Button>
          <Button variant="outline" onClick={onClose} className="hidden md:flex">
            Close
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default StationCard;
