import { useState } from "react";

interface FilterOption {
  value: string;
  label: string;
  color?: string;
}

interface FilterGroupProps {
  title: string;
  options: FilterOption[];
  selected: string[];
  onToggle: (value: string) => void;
}

export function FilterGroup({
  title,
  options,
  selected,
  onToggle,
}: FilterGroupProps) {
  const [expanded, setExpanded] = useState(false);
  const displayOptions = expanded ? options : options.slice(0, 6);
  const hasMore = options.length > 6;

  return (
    <div>
      <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
        {title}
        {selected.length > 0 && (
          <span className="ml-1 text-blue-600">({selected.length})</span>
        )}
      </h3>
      <div className="space-y-0.5">
        {displayOptions.map((opt) => (
          <label
            key={opt.value}
            className="flex items-center gap-2 px-2 py-1 rounded hover:bg-gray-50 cursor-pointer text-sm"
          >
            <input
              type="checkbox"
              checked={selected.includes(opt.value)}
              onChange={() => onToggle(opt.value)}
              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            {opt.color && (
              <span
                className="w-3 h-3 rounded-full inline-block flex-shrink-0"
                style={{ backgroundColor: opt.color }}
              />
            )}
            <span className="text-gray-700 truncate">{opt.label}</span>
          </label>
        ))}
      </div>
      {hasMore && (
        <button
          onClick={() => setExpanded(!expanded)}
          className="text-xs text-blue-600 hover:text-blue-800 mt-1 ml-2 cursor-pointer bg-transparent border-none"
        >
          {expanded
            ? "Show less"
            : `Show all ${options.length}`}
        </button>
      )}
    </div>
  );
}
