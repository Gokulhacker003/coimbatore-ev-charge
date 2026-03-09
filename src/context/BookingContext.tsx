import React, { createContext, useContext, useState, useCallback, ReactNode } from "react";
import { Booking, mockBookings } from "@/data/bookings";
import { ChargingType, EVType } from "@/data/stations";
import { toast } from "@/hooks/use-toast";

interface BookingContextType {
  bookings: Booking[];
  addBooking: (booking: Omit<Booking, "id">) => void;
  notifications: Notification[];
  clearNotifications: () => void;
}

interface Notification {
  id: string;
  message: string;
  type: "info" | "success" | "warning";
  timestamp: string;
  read: boolean;
}

const BookingContext = createContext<BookingContextType | undefined>(undefined);

export const BookingProvider = ({ children }: { children: ReactNode }) => {
  const [bookings, setBookings] = useState<Booking[]>(mockBookings);
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: "n1",
      message: "Your charging session at Tidel Park has started",
      type: "info",
      timestamp: "2026-03-09T14:00:00",
      read: false,
    },
    {
      id: "n2",
      message: "Charging completed at RS Puram Central!",
      type: "success",
      timestamp: "2026-03-08T10:00:00",
      read: true,
    },
  ]);

  const addBooking = useCallback(
    (booking: Omit<Booking, "id">) => {
      const newBooking: Booking = { ...booking, id: `b${Date.now()}` };
      setBookings((prev) => [newBooking, ...prev]);
      setNotifications((prev) => [
        {
          id: `n${Date.now()}`,
          message: `Booking confirmed at ${booking.stationName} for ${booking.date}`,
          type: "success",
          timestamp: new Date().toISOString(),
          read: false,
        },
        ...prev,
      ]);
      toast({
        title: "Booking Confirmed! ⚡",
        description: `Your slot at ${booking.stationName} is booked for ${booking.timeSlot}`,
      });
    },
    []
  );

  const clearNotifications = useCallback(() => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  }, []);

  return (
    <BookingContext.Provider value={{ bookings, addBooking, notifications, clearNotifications }}>
      {children}
    </BookingContext.Provider>
  );
};

export const useBookings = () => {
  const context = useContext(BookingContext);
  if (!context) throw new Error("useBookings must be used within BookingProvider");
  return context;
};
