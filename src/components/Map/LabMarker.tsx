import { Marker, Popup } from "react-leaflet";
import type { Lab } from "../../types/lab";
import { DIGITIZATION_LABELS } from "../../types/lab";
import { createLabIcon } from "../../utils/markers";
import { useMemo } from "react";

interface LabMarkerProps {
  lab: Lab;
  isSelected: boolean;
  onSelect: (lab: Lab) => void;
}

export function LabMarker({ lab, onSelect }: LabMarkerProps) {
  const icon = useMemo(
    () => createLabIcon(lab.digitizationLevel),
    [lab.digitizationLevel]
  );

  return (
    <Marker
      position={[lab.coordinates.lat, lab.coordinates.lng]}
      icon={icon}
      eventHandlers={{
        click: () => onSelect(lab),
      }}
    >
      <Popup>
        <div className="min-w-[200px]">
          <h3 className="font-bold text-sm m-0 mb-1">{lab.name}</h3>
          <p className="text-xs text-gray-600 m-0">
            {lab.city}, {lab.country}
          </p>
          <p className="text-xs mt-1 m-0">
            <span className="font-medium">Digitization:</span>{" "}
            {DIGITIZATION_LABELS[lab.digitizationLevel]}
          </p>
          {lab.annualSampleVolume && (
            <p className="text-xs m-0">
              <span className="font-medium">Volume:</span>{" "}
              {lab.annualSampleVolume}
            </p>
          )}
          <button
            onClick={() => onSelect(lab)}
            className="mt-2 text-xs text-blue-600 hover:text-blue-800 underline cursor-pointer bg-transparent border-none p-0"
          >
            View details →
          </button>
        </div>
      </Popup>
    </Marker>
  );
}
