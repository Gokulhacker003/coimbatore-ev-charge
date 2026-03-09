import { useState } from "react";
import { useStations } from "@/context/StationContext";
import { Station, ChargingType, EVType } from "@/data/stations";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Plus, Pencil, Trash2, MapPin, Zap } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { motion } from "framer-motion";

const emptyStation: Omit<Station, "id" | "reviews" | "reviewCount"> = {
  name: "",
  address: "",
  latitude: 11.0168,
  longitude: 76.9558,
  chargingTypes: [],
  evTypes: [],
  totalPorts: 0,
  availablePorts: 0,
  chargingSpeed: "",
  rating: 0,
  estimatedWaitTime: "0 min",
  pricePerKwh: 10,
  isOpen: true,
  openHours: "24/7",
};

const Admin = () => {
  const { stations, addStation, updateStation, deleteStation } = useStations();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState<Station | null>(null);
  const [form, setForm] = useState(emptyStation);

  const openNew = () => {
    setEditing(null);
    setForm(emptyStation);
    setDialogOpen(true);
  };

  const openEdit = (station: Station) => {
    setEditing(station);
    setForm(station);
    setDialogOpen(true);
  };

  const toggleChargingType = (type: ChargingType) => {
    setForm((f) => ({
      ...f,
      chargingTypes: f.chargingTypes.includes(type)
        ? f.chargingTypes.filter((t) => t !== type)
        : [...f.chargingTypes, type],
    }));
  };

  const toggleEvType = (type: EVType) => {
    setForm((f) => ({
      ...f,
      evTypes: f.evTypes.includes(type)
        ? f.evTypes.filter((t) => t !== type)
        : [...f.evTypes, type],
    }));
  };

  const handleSave = () => {
    if (!form.name || !form.address) return;
    if (editing) {
      updateStation({ ...editing, ...form, reviews: editing.reviews, reviewCount: editing.reviewCount });
      toast({ title: "Station Updated", description: `${form.name} has been updated.` });
    } else {
      addStation({
        ...form,
        id: `s${Date.now()}`,
        reviews: [],
        reviewCount: 0,
      } as Station);
      toast({ title: "Station Added", description: `${form.name} has been added.` });
    }
    setDialogOpen(false);
  };

  const handleDelete = (id: string, name: string) => {
    deleteStation(id);
    toast({ title: "Station Deleted", description: `${name} has been removed.` });
  };

  return (
    <div className="container mx-auto min-h-screen px-4 py-8 pb-24 md:pb-8">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-foreground">Admin Dashboard</h1>
        <Button onClick={openNew} className="gap-2">
          <Plus className="h-4 w-4" />
          Add Station
        </Button>
      </div>

      <div className="space-y-3">
        {stations.map((station, i) => (
          <motion.div
            key={station.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.03 }}
            className="flex items-center justify-between rounded-xl bg-card p-4 shadow-sm"
          >
            <div className="flex-1">
              <h3 className="font-semibold text-foreground">{station.name}</h3>
              <p className="flex items-center gap-1 text-sm text-muted-foreground">
                <MapPin className="h-3 w-3" />
                {station.address}
              </p>
              <div className="mt-2 flex gap-1.5">
                {station.chargingTypes.map((t) => (
                  <span key={t} className="rounded-full bg-muted px-2 py-0.5 text-xs text-muted-foreground">{t}</span>
                ))}
                <span className="rounded-full bg-accent px-2 py-0.5 text-xs text-accent-foreground">
                  {station.availablePorts}/{station.totalPorts} ports
                </span>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="icon" onClick={() => openEdit(station)}>
                <Pencil className="h-4 w-4" />
              </Button>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="outline" size="icon" className="text-destructive hover:bg-destructive hover:text-destructive-foreground">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Delete Station</AlertDialogTitle>
                    <AlertDialogDescription>
                      Are you sure you want to delete {station.name}?
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={() => handleDelete(station.id, station.name)}>
                      Delete
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Add/Edit Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>{editing ? "Edit Station" : "Add Station"}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 pt-2">
            <div className="space-y-2">
              <Label>Station Name</Label>
              <Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
            </div>
            <div className="space-y-2">
              <Label>Address</Label>
              <Input value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Latitude</Label>
                <Input type="number" step="any" value={form.latitude} onChange={(e) => setForm({ ...form, latitude: parseFloat(e.target.value) || 0 })} />
              </div>
              <div className="space-y-2">
                <Label>Longitude</Label>
                <Input type="number" step="any" value={form.longitude} onChange={(e) => setForm({ ...form, longitude: parseFloat(e.target.value) || 0 })} />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Charging Types</Label>
              <div className="flex gap-4">
                {(["AC", "DC", "Fast"] as ChargingType[]).map((type) => (
                  <label key={type} className="flex items-center gap-2 text-sm">
                    <Checkbox
                      checked={form.chargingTypes.includes(type)}
                      onCheckedChange={() => toggleChargingType(type)}
                    />
                    {type}
                  </label>
                ))}
              </div>
            </div>
            <div className="space-y-2">
              <Label>EV Types Supported</Label>
              <div className="flex gap-4">
                {(["2W", "3W", "4W"] as EVType[]).map((type) => (
                  <label key={type} className="flex items-center gap-2 text-sm">
                    <Checkbox
                      checked={form.evTypes.includes(type)}
                      onCheckedChange={() => toggleEvType(type)}
                    />
                    {type}
                  </label>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Total Ports</Label>
                <Input type="number" value={form.totalPorts} onChange={(e) => setForm({ ...form, totalPorts: parseInt(e.target.value) || 0 })} />
              </div>
              <div className="space-y-2">
                <Label>Charging Speed</Label>
                <Input value={form.chargingSpeed} onChange={(e) => setForm({ ...form, chargingSpeed: e.target.value })} placeholder="e.g. 50kW" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Price (₹/kWh)</Label>
                <Input type="number" value={form.pricePerKwh} onChange={(e) => setForm({ ...form, pricePerKwh: parseInt(e.target.value) || 0 })} />
              </div>
              <div className="space-y-2">
                <Label>Open Hours</Label>
                <Input value={form.openHours} onChange={(e) => setForm({ ...form, openHours: e.target.value })} />
              </div>
            </div>
            <Button onClick={handleSave} className="w-full gap-2">
              <Zap className="h-4 w-4" />
              {editing ? "Update Station" : "Add Station"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Admin;
