import { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { useStations } from "@/context/StationContext";
import { Station } from "@/data/stations";

// Fix default marker icon
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
});

const createEvIcon = (available: number, total: number) => {
  const ratio = available / total;
  const color = ratio > 0.5 ? "#22C55E" : ratio > 0.2 ? "#EAB308" : "#EF4444";
  return L.divIcon({
    className: "custom-ev-marker",
    html: `<div style="background:${color};width:32px;height:32px;border-radius:50%;display:flex;align-items:center;justify-content:center;color:white;font-weight:bold;font-size:12px;border:3px solid white;box-shadow:0 2px 8px rgba(0,0,0,0.3);">⚡</div>`,
    iconSize: [32, 32],
    iconAnchor: [16, 16],
  });
};

const COIMBATORE_CENTER: [number, number] = [11.0168, 76.9558];

interface MapViewProps {
  onStationClick: (station: Station) => void;
}

const MapView = ({ onStationClick }: MapViewProps) => {
  const { filteredStations } = useStations();

  return (
    <MapContainer
      center={COIMBATORE_CENTER}
      zoom={12}
      className="h-full w-full"
      zoomControl={false}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {filteredStations.map((station) => (
        <Marker
          key={station.id}
          position={[station.latitude, station.longitude]}
          icon={createEvIcon(station.availablePorts, station.totalPorts)}
          eventHandlers={{ click: () => onStationClick(station) }}
        >
          <Popup>
            <div className="text-center">
              <strong>{station.name}</strong>
              <br />
              {station.availablePorts}/{station.totalPorts} ports available
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default MapView;
