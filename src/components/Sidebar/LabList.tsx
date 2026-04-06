import type { Lab } from "../../types/lab";
import { DIGITIZATION_COLORS } from "../../types/lab";

interface LabListProps {
  labs: Lab[];
  selectedLab: Lab | null;
  onSelectLab: (lab: Lab) => void;
}

export function LabList({ labs, selectedLab, onSelectLab }: LabListProps) {
  if (labs.length === 0) {
    return (
      <div className="p-4 text-center text-sm text-gray-400">
        No labs match your filters
      </div>
    );
  }

  return (
    <div className="divide-y divide-gray-100">
      {labs.map((lab) => (
        <button
          key={lab.id}
          onClick={() => onSelectLab(lab)}
          className={`w-full text-left px-3 py-2.5 hover:bg-blue-50 transition-colors cursor-pointer border-none ${
            selectedLab?.id === lab.id ? "bg-blue-50" : "bg-transparent"
          }`}
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
                {lab.city}, {lab.country}
              </div>
            </div>
          </div>
        </button>
      ))}
    </div>
  );
}
