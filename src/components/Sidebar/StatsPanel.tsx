import { useState, useMemo } from "react";
import type { Lab, DigitizationLevel, LabType } from "../../types/lab";
import {
  DIGITIZATION_LABELS,
  DIGITIZATION_COLORS,
  LAB_TYPE_LABELS,
} from "../../types/lab";

interface StatsPanelProps {
  labs: Lab[];
}

const LAB_TYPE_COLORS: Record<LabType, string> = {
  academic: "#2563eb",
  private_network: "#7c3aed",
  private_standalone: "#d97706",
  public_hospital: "#16a34a",
};

export function StatsPanel({ labs }: StatsPanelProps) {
  const [open, setOpen] = useState(false);

  const stats = useMemo(() => {
    const countries = new Set(labs.map((l) => l.country));

    const digitization: Record<string, number> = {};
    for (const level of Object.keys(DIGITIZATION_LABELS)) {
      digitization[level] = 0;
    }
    for (const lab of labs) {
      digitization[lab.digitizationLevel] =
        (digitization[lab.digitizationLevel] || 0) + 1;
    }

    const countryCount: Record<string, number> = {};
    for (const lab of labs) {
      countryCount[lab.country] = (countryCount[lab.country] || 0) + 1;
    }
    const topCountries = Object.entries(countryCount)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 8);

    const labTypes: Record<string, number> = {};
    for (const t of Object.keys(LAB_TYPE_LABELS)) {
      labTypes[t] = 0;
    }
    for (const lab of labs) {
      labTypes[lab.type] = (labTypes[lab.type] || 0) + 1;
    }

    return {
      totalLabs: labs.length,
      totalCountries: countries.size,
      digitization,
      topCountries,
      labTypes,
    };
  }, [labs]);

  const maxCountryCount =
    stats.topCountries.length > 0 ? stats.topCountries[0][1] : 1;

  return (
    <div className="border-b border-gray-100">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-3 py-2 text-xs font-semibold text-gray-600 hover:bg-gray-50 cursor-pointer bg-transparent border-none"
      >
        <span>📊 Statistics</span>
        <svg
          className={`w-3.5 h-3.5 transition-transform ${open ? "rotate-180" : ""}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {open && (
        <div className="px-3 pb-3 space-y-3">
          {/* Summary */}
          <div className="flex gap-3">
            <div className="flex-1 bg-blue-50 rounded-md px-2.5 py-1.5 text-center">
              <div className="text-base font-bold text-blue-700">
                {stats.totalLabs}
              </div>
              <div className="text-[10px] text-blue-500">Labs</div>
            </div>
            <div className="flex-1 bg-emerald-50 rounded-md px-2.5 py-1.5 text-center">
              <div className="text-base font-bold text-emerald-700">
                {stats.totalCountries}
              </div>
              <div className="text-[10px] text-emerald-500">Countries</div>
            </div>
          </div>

          {/* Digitization breakdown */}
          <div>
            <div className="text-[10px] font-medium text-gray-500 mb-1">
              Digitization
            </div>
            <div className="flex h-3 rounded-full overflow-hidden">
              {(Object.keys(DIGITIZATION_LABELS) as DigitizationLevel[]).map(
                (level) => {
                  const count = stats.digitization[level] || 0;
                  if (count === 0) return null;
                  const pct = (count / stats.totalLabs) * 100;
                  return (
                    <div
                      key={level}
                      style={{
                        width: `${pct}%`,
                        backgroundColor: DIGITIZATION_COLORS[level],
                      }}
                      title={`${DIGITIZATION_LABELS[level]}: ${count}`}
                    />
                  );
                }
              )}
            </div>
            <div className="flex flex-wrap gap-x-2.5 gap-y-0.5 mt-1">
              {(Object.keys(DIGITIZATION_LABELS) as DigitizationLevel[]).map(
                (level) => {
                  const count = stats.digitization[level] || 0;
                  if (count === 0) return null;
                  return (
                    <span
                      key={level}
                      className="flex items-center gap-1 text-[10px] text-gray-500"
                    >
                      <span
                        className="inline-block w-1.5 h-1.5 rounded-full"
                        style={{ backgroundColor: DIGITIZATION_COLORS[level] }}
                      />
                      {DIGITIZATION_LABELS[level]} {count}
                    </span>
                  );
                }
              )}
            </div>
          </div>

          {/* Top countries bar chart */}
          <div>
            <div className="text-[10px] font-medium text-gray-500 mb-1">
              Top Countries
            </div>
            <svg
              width="100%"
              viewBox="0 0 260 128"
              className="block"
              aria-label="Top countries by lab count"
            >
              {stats.topCountries.map(([country, count], i) => {
                const y = i * 16;
                const barWidth = (count / maxCountryCount) * 160;
                return (
                  <g key={country}>
                    <text
                      x="54"
                      y={y + 11}
                      textAnchor="end"
                      className="text-[9px]"
                      fill="#6b7280"
                    >
                      {country.length > 9
                        ? country.slice(0, 8) + "…"
                        : country}
                    </text>
                    <rect
                      x="58"
                      y={y + 2}
                      width={barWidth}
                      height="10"
                      rx="2"
                      fill="#3b82f6"
                      opacity="0.8"
                    />
                    <text
                      x={62 + barWidth}
                      y={y + 11}
                      className="text-[8px]"
                      fill="#374151"
                    >
                      {count}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>

          {/* Lab type pills */}
          <div>
            <div className="text-[10px] font-medium text-gray-500 mb-1">
              Lab Types
            </div>
            <div className="flex flex-wrap gap-1.5">
              {(Object.keys(LAB_TYPE_LABELS) as LabType[]).map((t) => {
                const count = stats.labTypes[t] || 0;
                if (count === 0) return null;
                return (
                  <span
                    key={t}
                    className="inline-flex items-center gap-1 text-[10px] px-2 py-0.5 rounded-full font-medium"
                    style={{
                      backgroundColor: LAB_TYPE_COLORS[t] + "18",
                      color: LAB_TYPE_COLORS[t],
                    }}
                  >
                    {LAB_TYPE_LABELS[t]} {count}
                  </span>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
