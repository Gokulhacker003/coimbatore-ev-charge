import { useState } from "react";
import { Station, EVType, ChargingType } from "@/data/stations";
import { useBookings } from "@/context/BookingContext";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Zap, Battery } from "lucide-react";

interface BookingModalProps {
  station: Station;
  open: boolean;
  onClose: () => void;
}

const timeSlots = [
  "6:00 AM - 7:00 AM",
  "7:00 AM - 8:00 AM",
  "8:00 AM - 9:00 AM",
  "9:00 AM - 10:00 AM",
  "10:00 AM - 11:00 AM",
  "11:00 AM - 12:00 PM",
  "12:00 PM - 1:00 PM",
  "1:00 PM - 2:00 PM",
  "2:00 PM - 3:00 PM",
  "3:00 PM - 4:00 PM",
  "4:00 PM - 5:00 PM",
  "5:00 PM - 6:00 PM",
  "6:00 PM - 7:00 PM",
  "7:00 PM - 8:00 PM",
  "8:00 PM - 9:00 PM",
  "9:00 PM - 10:00 PM",
];

const BookingModal = ({ station, open, onClose }: BookingModalProps) => {
  const { addBooking } = useBookings();
  const [evType, setEvType] = useState<EVType>(station.evTypes[0]);
  const [chargingType, setChargingType] = useState<ChargingType>(station.chargingTypes[0]);
  const [date, setDate] = useState("");
  const [timeSlot, setTimeSlot] = useState("");

  const handleConfirm = () => {
    if (!date || !timeSlot) return;
    addBooking({
      stationId: station.id,
      stationName: station.name,
      evType,
      chargingType,
      date,
      timeSlot,
      status: "upcoming",
      portNumber: Math.floor(Math.random() * station.availablePorts) + 1,
    });
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Zap className="h-5 w-5 text-primary" />
            Book Charging Slot
          </DialogTitle>
          <DialogDescription>{station.name}</DialogDescription>
        </DialogHeader>

        <div className="space-y-4 pt-2">
          <div className="flex items-center gap-2 rounded-xl bg-accent p-3">
            <Battery className="h-5 w-5 text-primary" />
            <span className="text-sm font-medium text-accent-foreground">
              {station.availablePorts} ports available
            </span>
          </div>

          <div className="space-y-2">
            <Label>EV Type</Label>
            <Select value={evType} onValueChange={(v) => setEvType(v as EVType)}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                {station.evTypes.map((t) => (
                  <SelectItem key={t} value={t}>
                    {t === "2W" ? "2-Wheeler" : t === "3W" ? "3-Wheeler" : "4-Wheeler"}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Charging Mode</Label>
            <Select value={chargingType} onValueChange={(v) => setChargingType(v as ChargingType)}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                {station.chargingTypes.map((t) => (
                  <SelectItem key={t} value={t}>
                    {t === "Fast" ? "Fast Charger" : `${t} Charger`}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Date</Label>
            <Input type="date" value={date} onChange={(e) => setDate(e.target.value)} min={new Date().toISOString().split("T")[0]} />
          </div>

          <div className="space-y-2">
            <Label>Time Slot</Label>
            <Select value={timeSlot} onValueChange={setTimeSlot}>
              <SelectTrigger><SelectValue placeholder="Select time slot" /></SelectTrigger>
              <SelectContent>
                {timeSlots.map((slot) => (
                  <SelectItem key={slot} value={slot}>{slot}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <Button onClick={handleConfirm} className="w-full gap-2" disabled={!date || !timeSlot}>
            <Zap className="h-4 w-4" />
            Confirm Booking
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default BookingModal;
