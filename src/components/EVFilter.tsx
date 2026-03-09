import { useStations } from "@/context/StationContext";
import { EVType } from "@/data/stations";
import { Bike, Car, Truck } from "lucide-react";

const filters: { type: EVType; label: string; icon: React.ElementType }[] = [
  { type: "2W", label: "2-Wheeler", icon: Bike },
  { type: "3W", label: "3-Wheeler", icon: Truck },
  { type: "4W", label: "4-Wheeler", icon: Car },
];

const EVFilter = () => {
  const { activeFilters, toggleFilter } = useStations();

  return (
    <div className="flex gap-2">
      {filters.map(({ type, label, icon: Icon }) => {
        const active = activeFilters.includes(type);
        return (
          <button
            key={type}
            onClick={() => toggleFilter(type)}
            className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-all ${
              active
                ? "bg-primary text-primary-foreground shadow-md"
                : "bg-card text-muted-foreground border border-border hover:bg-muted"
            }`}
          >
            <Icon className="h-4 w-4" />
            {label}
          </button>
        );
      })}
    </div>
  );
};

export default EVFilter;
