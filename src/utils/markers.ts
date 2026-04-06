import L from "leaflet";
import type { DigitizationLevel } from "../types/lab";
import { DIGITIZATION_COLORS } from "../types/lab";

export function createLabIcon(digitizationLevel: DigitizationLevel): L.DivIcon {
  const color = DIGITIZATION_COLORS[digitizationLevel];
  return L.divIcon({
    className: "custom-marker",
    html: `<div style="
      width: 24px;
      height: 24px;
      border-radius: 50%;
      background: ${color};
      border: 3px solid white;
      box-shadow: 0 2px 6px rgba(0,0,0,0.35);
    "></div>`,
    iconSize: [24, 24],
    iconAnchor: [12, 12],
    popupAnchor: [0, -14],
  });
}
