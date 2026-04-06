import { useRef } from "react";
import { useVirtualizer } from "@tanstack/react-virtual";
import type { Lab } from "../../types/lab";
import { DIGITIZATION_COLORS } from "../../types/lab";
import { getCountryFlag } from "../../utils/countryFlags";

interface LabListProps {
  labs: Lab[];
  selectedLab: Lab | null;
  onSelectLab: (lab: Lab) => void;
}

export function LabList({ labs, selectedLab, onSelectLab }: LabListProps) {
  const parentRef = useRef<HTMLDivElement>(null);

  const virtualizer = useVirtualizer({
    count: labs.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 52,
    overscan: 10,
  });

  if (labs.length === 0) {
    return (
      <div className="p-4 text-center text-sm text-gray-400">
        No labs match your filters
      </div>
    );
  }

  return (
    <div ref={parentRef} className="overflow-y-auto" style={{ maxHeight: "calc(100vh - 480px)" }}>
      <div
        className="relative w-full"
        style={{ height: `${virtualizer.getTotalSize()}px` }}
      >
        {virtualizer.getVirtualItems().map((virtualItem) => {
          const lab = labs[virtualItem.index];
          return (
            <button
              key={lab.id}
              data-index={virtualItem.index}
              ref={virtualizer.measureElement}
              onClick={() => onSelectLab(lab)}
              className={`absolute top-0 left-0 w-full text-left px-3 py-2.5 hover:bg-blue-50 transition-colors cursor-pointer border-none border-b border-gray-100 ${
                selectedLab?.id === lab.id ? "bg-blue-50" : "bg-transparent"
              }`}
              style={{
                transform: `translateY(${virtualItem.start}px)`,
              }}
            >
              <div className="flex items-start gap-2">
                <span
                  className="w-2.5 h-2.5 rounded-full mt-1.5 flex-shrink-0"
                  style={{
                    backgroundColor: DIGITIZATION_COLORS[lab.digitizationLevel],
                  }}
                />
                <div className="min-w-0">
                  <div className="text-sm font-medium text-gray-900 truncate">
                    {lab.name}
                  </div>
                  <div className="text-xs text-gray-500">
                    {lab.city}, {getCountryFlag(lab.country)} {lab.country}
                  </div>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
