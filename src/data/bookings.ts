import { ChargingType, EVType } from "./stations";

export interface Booking {
  id: string;
  stationId: string;
  stationName: string;
  evType: EVType;
  chargingType: ChargingType;
  date: string;
  timeSlot: string;
  status: "upcoming" | "charging" | "completed";
  portNumber: number;
}

export const mockBookings: Booking[] = [
  {
    id: "b1",
    stationId: "1",
    stationName: "Brookefields Mall EV Station",
    evType: "4W",
    chargingType: "Fast",
    date: "2026-03-10",
    timeSlot: "10:00 AM - 11:00 AM",
    status: "upcoming",
    portNumber: 3,
  },
  {
    id: "b2",
    stationId: "14",
    stationName: "Tidel Park Charging Hub",
    evType: "4W",
    chargingType: "DC",
    date: "2026-03-09",
    timeSlot: "2:00 PM - 3:00 PM",
    status: "charging",
    portNumber: 7,
  },
  {
    id: "b3",
    stationId: "10",
    stationName: "RS Puram Central Charge",
    evType: "2W",
    chargingType: "AC",
    date: "2026-03-08",
    timeSlot: "9:00 AM - 10:00 AM",
    status: "completed",
    portNumber: 2,
  },
];
