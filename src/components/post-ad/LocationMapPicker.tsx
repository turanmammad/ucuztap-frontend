import { useState, useEffect, useRef } from "react";
import { MapPin, RotateCcw, Search } from "lucide-react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Fix default marker icon
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

interface Props {
  lat: number | null;
  lng: number | null;
  onSelect: (lat: number, lng: number, address?: string) => void;
}

const BAKU_CENTER: [number, number] = [40.4093, 49.8671];

const LocationMapPicker = ({ lat, lng, onSelect }: Props) => {
  const mapRef = useRef<L.Map | null>(null);
  const markerRef = useRef<L.Marker | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [searching, setSearching] = useState(false);
  const [address, setAddress] = useState("");

  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;

    const map = L.map(containerRef.current, {
      center: lat && lng ? [lat, lng] : BAKU_CENTER,
      zoom: 13,
      zoomControl: false,
    });

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: '© <a href="https://www.openstreetmap.org/copyright">OSM</a>',
      maxZoom: 19,
    }).addTo(map);

    L.control.zoom({ position: "bottomright" }).addTo(map);

    if (lat && lng) {
      const marker = L.marker([lat, lng], { draggable: true }).addTo(map);
      markerRef.current = marker;
      marker.on("dragend", () => {
        const pos = marker.getLatLng();
        reverseGeocode(pos.lat, pos.lng);
      });
    }

    map.on("click", (e: L.LeafletMouseEvent) => {
      const { lat: clickLat, lng: clickLng } = e.latlng;
      if (markerRef.current) {
        markerRef.current.setLatLng([clickLat, clickLng]);
      } else {
        const marker = L.marker([clickLat, clickLng], { draggable: true }).addTo(map);
        markerRef.current = marker;
        marker.on("dragend", () => {
          const pos = marker.getLatLng();
          reverseGeocode(pos.lat, pos.lng);
        });
      }
      reverseGeocode(clickLat, clickLng);
    });

    mapRef.current = map;

    return () => {
      map.remove();
      mapRef.current = null;
      markerRef.current = null;
    };
  }, []);

  const reverseGeocode = async (lat: number, lng: number) => {
    onSelect(lat, lng);
    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=18&addressdetails=1`,
        { headers: { "Accept-Language": "az" } }
      );
      const data = await res.json();
      if (data.display_name) {
        const short = data.display_name.split(",").slice(0, 3).join(",").trim();
        setAddress(short);
        onSelect(lat, lng, short);
      }
    } catch {
      // Geocoding failed silently
    }
  };

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    setSearching(true);
    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(searchQuery + ", Azerbaijan")}&limit=1`,
        { headers: { "Accept-Language": "az" } }
      );
      const data = await res.json();
      if (data.length > 0 && mapRef.current) {
        const { lat: foundLat, lon: foundLng, display_name } = data[0];
        const latNum = parseFloat(foundLat);
        const lngNum = parseFloat(foundLng);
        mapRef.current.setView([latNum, lngNum], 16);
        if (markerRef.current) {
          markerRef.current.setLatLng([latNum, lngNum]);
        } else {
          const marker = L.marker([latNum, lngNum], { draggable: true }).addTo(mapRef.current);
          markerRef.current = marker;
          marker.on("dragend", () => {
            const pos = marker.getLatLng();
            reverseGeocode(pos.lat, pos.lng);
          });
        }
        const short = display_name.split(",").slice(0, 3).join(",").trim();
        setAddress(short);
        onSelect(latNum, lngNum, short);
      }
    } catch {
      // Search failed
    } finally {
      setSearching(false);
    }
  };

  const handleReset = () => {
    if (markerRef.current && mapRef.current) {
      mapRef.current.removeLayer(markerRef.current);
      markerRef.current = null;
    }
    mapRef.current?.setView(BAKU_CENTER, 13);
    setAddress("");
    onSelect(0, 0, "");
  };

  return (
    <div className="space-y-2">
      <label className="block text-xs font-medium text-muted-foreground">
        <MapPin size={12} className="inline mr-1" />
        Xəritədən yer seçin
      </label>

      {/* Search bar */}
      <form onSubmit={handleSearch} className="flex gap-1.5">
        <div className="relative flex-1">
          <Search size={14} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Ünvan axtar..."
            className="w-full h-9 rounded-lg border border-input bg-background pl-8 pr-3 text-xs outline-none focus:ring-2 focus:ring-ring transition-shadow"
          />
        </div>
        <button
          type="submit"
          disabled={searching}
          className="shrink-0 h-9 px-3 rounded-lg bg-primary text-primary-foreground text-xs font-medium hover:bg-primary/90 transition-colors disabled:opacity-60"
        >
          {searching ? "..." : "Axtar"}
        </button>
        {(lat || address) && (
          <button
            type="button"
            onClick={handleReset}
            className="shrink-0 h-9 w-9 rounded-lg border border-border flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
          >
            <RotateCcw size={14} />
          </button>
        )}
      </form>

      {/* Map */}
      <div
        ref={containerRef}
        className="w-full rounded-xl border border-border overflow-hidden"
        style={{ height: 260 }}
      />

      {/* Selected address */}
      {address && (
        <div className="flex items-start gap-1.5 px-3 py-2 rounded-lg bg-accent/10 border border-accent/20">
          <MapPin size={13} className="text-accent shrink-0 mt-0.5" />
          <p className="text-xs text-foreground leading-relaxed">{address}</p>
        </div>
      )}

      <p className="text-[10px] text-muted-foreground">
        Xəritəyə klikləyərək və ya axtarışla dəqiq yeri seçin. Markeri sürükləyə bilərsiniz.
      </p>
    </div>
  );
};

export default LocationMapPicker;
