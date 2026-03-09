import { useNavigate } from "react-router-dom";
import { Search, Zap, MapPin, Battery, Star, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import EVFilter from "@/components/EVFilter";
import { useStations } from "@/context/StationContext";
import { motion } from "framer-motion";

const Home = () => {
  const navigate = useNavigate();
  const { searchQuery, setSearchQuery, filteredStations, stations } = useStations();

  const totalPorts = stations.reduce((acc, s) => acc + s.totalPorts, 0);
  const availablePorts = stations.reduce((acc, s) => acc + s.availablePorts, 0);
  const avgRating = (stations.reduce((acc, s) => acc + s.rating, 0) / stations.length).toFixed(1);

  return (
    <div className="min-h-screen pb-20 md:pb-0">
      {/* Hero */}
      <section className="ev-gradient relative overflow-hidden px-4 py-16 md:py-24">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iLjA1Ij48cGF0aCBkPSJNMzYgMzRWMGgydjM0aDIydjJIMzh2MjJoLTJWMzZIMHYtMmgzNnoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-30" />
        <div className="container relative mx-auto max-w-3xl text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-white/20 backdrop-blur-sm">
              <Zap className="h-8 w-8 text-white" />
            </div>
            <h1 className="mb-4 text-4xl font-extrabold tracking-tight text-white md:text-5xl">
              Find EV Charging Stations
            </h1>
            <p className="mb-8 text-lg text-white/80">
              Discover and book charging stations across Coimbatore instantly
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-4"
          >
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search stations or locations..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="h-12 bg-white pl-10 text-foreground shadow-lg"
                />
              </div>
              <Button
                size="lg"
                onClick={() => navigate("/map")}
                className="h-12 gap-2 bg-secondary text-secondary-foreground shadow-lg hover:bg-secondary/90"
              >
                <MapPin className="h-5 w-5" />
                <span className="hidden sm:inline">Find Stations</span>
              </Button>
            </div>

            <div className="flex justify-center">
              <EVFilter />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="container mx-auto -mt-8 px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="grid grid-cols-2 gap-4 md:grid-cols-4"
        >
          {[
            { icon: MapPin, label: "Stations", value: stations.length },
            { icon: Battery, label: "Total Ports", value: totalPorts },
            { icon: Zap, label: "Available", value: availablePorts },
            { icon: Star, label: "Avg Rating", value: avgRating },
          ].map(({ icon: Icon, label, value }) => (
            <div key={label} className="rounded-xl bg-card p-5 text-center shadow-md">
              <Icon className="mx-auto h-6 w-6 text-primary" />
              <p className="mt-2 text-2xl font-bold text-foreground">{value}</p>
              <p className="text-sm text-muted-foreground">{label}</p>
            </div>
          ))}
        </motion.div>
      </section>

      {/* Nearby Stations */}
      <section className="container mx-auto px-4 py-12">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-foreground">Nearby Stations</h2>
          <Button variant="ghost" onClick={() => navigate("/map")} className="gap-1 text-primary">
            View All <ArrowRight className="h-4 w-4" />
          </Button>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filteredStations.slice(0, 6).map((station, i) => (
            <motion.div
              key={station.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 * i }}
              className="cursor-pointer rounded-xl bg-card p-5 shadow-md transition-shadow hover:shadow-lg"
              onClick={() => navigate("/map")}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="font-semibold text-foreground">{station.name}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{station.address}</p>
                </div>
                <div className="flex items-center gap-1 rounded-lg bg-accent px-2 py-0.5">
                  <Star className="h-3.5 w-3.5 fill-primary text-primary" />
                  <span className="text-xs font-semibold text-accent-foreground">{station.rating}</span>
                </div>
              </div>

              <div className="mt-3 flex flex-wrap gap-1.5">
                {station.chargingTypes.map((t) => (
                  <span key={t} className="rounded-full bg-muted px-2.5 py-0.5 text-xs font-medium text-muted-foreground">
                    {t}
                  </span>
                ))}
              </div>

              <div className="mt-3 flex items-center justify-between text-sm">
                <span className="text-primary font-medium">
                  {station.availablePorts}/{station.totalPorts} ports
                </span>
                <span className="text-muted-foreground">{station.chargingSpeed}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
