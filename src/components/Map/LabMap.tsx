import { MapContainer, useMap } from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";
import type { Lab } from "../../types/lab";
import { LabMarker } from "./LabMarker";
import { TileSelector } from "./TileSelector";
import { useEffect } from "react";

interface LabMapProps {
  labs: Lab[];
  selectedLab: Lab | null;
  onSelectLab: (lab: Lab) => void;
}

function FlyToLab({ lab }: { lab: Lab | null }) {
  const map = useMap();
  useEffect(() => {
    if (lab) {
      map.flyTo([lab.coordinates.lat, lab.coordinates.lng], 10, {
        duration: 1.2,
      });
    }
  }, [lab, map]);
  return null;
}

export function LabMap({ labs, selectedLab, onSelectLab }: LabMapProps) {
  return (
    <MapContainer
      center={[50, 10]}
      zoom={4}
      className="h-full w-full"
      zoomControl={true}
    >
      <TileSelector />
      <MarkerClusterGroup chunkedLoading>
        {labs.map((lab) => (
          <LabMarker
            key={lab.id}
            lab={lab}
            isSelected={selectedLab?.id === lab.id}
            onSelect={onSelectLab}
          />
        ))}
      </MarkerClusterGroup>
      <FlyToLab lab={selectedLab} />
    </MapContainer>
  );
}
