import { useState, useRef, useEffect } from "react";
import { useMap } from "react-leaflet";
import L from "leaflet";

const TILE_OPTIONS = [
  {
    id: "osm",
    label: "OpenStreetMap",
    url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  },
  {
    id: "positron",
    label: "CartoDB Positron",
    url: "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png",
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/">CARTO</a>',
  },
  {
    id: "dark-matter",
    label: "CartoDB Dark Matter",
    url: "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png",
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/">CARTO</a>',
  },
] as const;

type TileId = (typeof TILE_OPTIONS)[number]["id"];

const STORAGE_KEY = "labbkarta-tile";

function getStoredTileId(): TileId {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored && TILE_OPTIONS.some((t) => t.id === stored)) {
    return stored as TileId;
  }
  return "osm";
}

export function TileSelector() {
  const map = useMap();
  const [selectedId, setSelectedId] = useState<TileId>(getStoredTileId);
  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const tileLayerRef = useRef<L.TileLayer | null>(null);

  // Prevent map interactions when clicking the control
  useEffect(() => {
    const el = panelRef.current;
    if (!el) return;
    L.DomEvent.disableClickPropagation(el);
    L.DomEvent.disableScrollPropagation(el);
  }, []);

  // Manage the tile layer on the map
  useEffect(() => {
    const option = TILE_OPTIONS.find((t) => t.id === selectedId)!;

    if (tileLayerRef.current) {
      map.removeLayer(tileLayerRef.current);
    }

    const layer = L.tileLayer(option.url, { attribution: option.attribution });
    layer.addTo(map);
    tileLayerRef.current = layer;

    return () => {
      if (tileLayerRef.current) {
        map.removeLayer(tileLayerRef.current);
        tileLayerRef.current = null;
      }
    };
  }, [selectedId, map]);

  function selectTile(id: TileId) {
    setSelectedId(id);
    localStorage.setItem(STORAGE_KEY, id);
    setOpen(false);
  }

  return (
    <div ref={panelRef} className="absolute top-4 left-14 z-[1000]">
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-9 h-9 bg-white rounded-lg shadow-lg border border-gray-200 flex items-center justify-center hover:bg-gray-50 cursor-pointer"
        aria-label="Switch map tiles"
        title="Switch map tiles"
      >
        {/* Layers icon */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-5 h-5 text-gray-600"
        >
          <path d="M12 2 2 7l10 5 10-5-10-5Z" />
          <path d="m2 17 10 5 10-5" />
          <path d="m2 12 10 5 10-5" />
        </svg>
      </button>

      {open && (
        <div className="mt-2 bg-white rounded-lg shadow-lg border border-gray-200 py-1 min-w-[180px]">
          {TILE_OPTIONS.map((option) => (
            <button
              key={option.id}
              onClick={() => selectTile(option.id)}
              className={`w-full text-left px-3 py-2 text-sm cursor-pointer hover:bg-gray-100 flex items-center gap-2 ${
                selectedId === option.id
                  ? "text-blue-600 font-medium bg-blue-50"
                  : "text-gray-700"
              }`}
            >
              {selectedId === option.id && (
                <span className="text-blue-600">✓</span>
              )}
              <span className={selectedId !== option.id ? "ml-5" : ""}>
                {option.label}
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
