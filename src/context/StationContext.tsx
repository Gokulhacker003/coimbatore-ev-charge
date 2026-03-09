import React, { createContext, useContext, useState, useCallback, ReactNode } from "react";
import { Station, EVType, stations as initialStations } from "@/data/stations";

interface StationContextType {
  stations: Station[];
  filteredStations: Station[];
  selectedStation: Station | null;
  activeFilters: EVType[];
  searchQuery: string;
  setSelectedStation: (station: Station | null) => void;
  toggleFilter: (filter: EVType) => void;
  setSearchQuery: (query: string) => void;
  addStation: (station: Station) => void;
  updateStation: (station: Station) => void;
  deleteStation: (id: string) => void;
}

const StationContext = createContext<StationContextType | undefined>(undefined);

export const StationProvider = ({ children }: { children: ReactNode }) => {
  const [stations, setStations] = useState<Station[]>(initialStations);
  const [selectedStation, setSelectedStation] = useState<Station | null>(null);
  const [activeFilters, setActiveFilters] = useState<EVType[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  const toggleFilter = useCallback((filter: EVType) => {
    setActiveFilters((prev) =>
      prev.includes(filter) ? prev.filter((f) => f !== filter) : [...prev, filter]
    );
  }, []);

  const filteredStations = stations.filter((station) => {
    const matchesFilter =
      activeFilters.length === 0 || activeFilters.some((f) => station.evTypes.includes(f));
    const matchesSearch =
      searchQuery === "" ||
      station.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      station.address.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const addStation = useCallback((station: Station) => {
    setStations((prev) => [...prev, station]);
  }, []);

  const updateStation = useCallback((station: Station) => {
    setStations((prev) => prev.map((s) => (s.id === station.id ? station : s)));
  }, []);

  const deleteStation = useCallback((id: string) => {
    setStations((prev) => prev.filter((s) => s.id !== id));
  }, []);

  return (
    <StationContext.Provider
      value={{
        stations,
        filteredStations,
        selectedStation,
        activeFilters,
        searchQuery,
        setSelectedStation,
        toggleFilter,
        setSearchQuery,
        addStation,
        updateStation,
        deleteStation,
      }}
    >
      {children}
    </StationContext.Provider>
  );
};

export const useStations = () => {
  const context = useContext(StationContext);
  if (!context) throw new Error("useStations must be used within StationProvider");
  return context;
};
