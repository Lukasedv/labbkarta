import { DIGITIZATION_LABELS, DIGITIZATION_COLORS } from "../../types/lab";
import type { DigitizationLevel } from "../../types/lab";

export function MapLegend() {
  return (
    <div className="absolute bottom-6 right-6 z-[1000] bg-white rounded-lg shadow-lg p-3 border border-gray-200">
      <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 m-0">
        Digitization Level
      </h4>
      <div className="space-y-1">
        {(Object.keys(DIGITIZATION_LABELS) as DigitizationLevel[]).map(
          (level) => (
            <div key={level} className="flex items-center gap-2">
              <span
                className="w-3 h-3 rounded-full flex-shrink-0"
                style={{ backgroundColor: DIGITIZATION_COLORS[level] }}
              />
              <span className="text-xs text-gray-600">
                {DIGITIZATION_LABELS[level]}
              </span>
            </div>
          )
        )}
      </div>
    </div>
  );
}
