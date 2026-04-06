import type { Lab, DigitizationLevel, LabType } from "../../types/lab";
import type { FilterState } from "../../hooks/useFilters";
import { SearchBar } from "./SearchBar";
import { FilterGroup } from "./FilterGroup";
import { LabList } from "./LabList";
import {
  DIGITIZATION_LABELS,
  DIGITIZATION_COLORS,
  LAB_TYPE_LABELS,
} from "../../types/lab";

interface SidebarProps {
  filters: FilterState;
  filteredLabs: Lab[];
  totalCount: number;
  availableCountries: string[];
  availableNetworks: string[];
  onSearch: (q: string) => void;
  onToggleCountry: (c: string) => void;
  onToggleDigitization: (d: DigitizationLevel) => void;
  onToggleLabType: (t: LabType) => void;
  onToggleNetwork: (n: string) => void;
  onClearFilters: () => void;
  onSelectLab: (lab: Lab) => void;
  selectedLab: Lab | null;
  isOpen: boolean;
  onToggleSidebar: () => void;
}

export function Sidebar({
  filters,
  filteredLabs,
  totalCount,
  availableCountries,
  availableNetworks,
  onSearch,
  onToggleCountry,
  onToggleDigitization,
  onToggleLabType,
  onToggleNetwork,
  onClearFilters,
  onSelectLab,
  selectedLab,
  isOpen,
  onToggleSidebar,
}: SidebarProps) {
  const hasActiveFilters =
    filters.search ||
    filters.countries.length > 0 ||
    filters.digitizationLevels.length > 0 ||
    filters.labTypes.length > 0 ||
    filters.networks.length > 0;

  return (
    <>
      {/* Mobile toggle button */}
      <button
        onClick={onToggleSidebar}
        className="md:hidden fixed top-3 left-3 z-[1000] bg-white rounded-lg shadow-lg p-2 border border-gray-200"
        aria-label={isOpen ? "Close sidebar" : "Open sidebar"}
      >
        {isOpen ? (
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        )}
      </button>

      <div
        className={`
          fixed md:relative z-[999] h-full bg-white border-r border-gray-200
          w-80 flex flex-col shadow-lg md:shadow-none
          transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
        `}
      >
        {/* Header */}
        <div className="p-4 border-b border-gray-200">
          <h1 className="text-lg font-bold text-gray-900 m-0">
            🔬 Labbkarta
          </h1>
          <p className="text-xs text-gray-500 mt-1">
            European Anatomical Pathology Labs
          </p>
        </div>

        {/* Search */}
        <div className="p-3 border-b border-gray-100">
          <SearchBar value={filters.search} onChange={onSearch} />
          <div className="flex justify-between items-center mt-2">
            <span className="text-xs text-gray-500">
              {filteredLabs.length} of {totalCount} labs
            </span>
            {hasActiveFilters && (
              <button
                onClick={onClearFilters}
                className="text-xs text-blue-600 hover:text-blue-800 cursor-pointer bg-transparent border-none"
              >
                Clear all
              </button>
            )}
          </div>
        </div>

        {/* Filters */}
        <div className="flex-1 overflow-y-auto">
          <div className="p-3 space-y-3">
            <FilterGroup
              title="Digitization Level"
              options={Object.entries(DIGITIZATION_LABELS).map(
                ([value, label]) => ({
                  value,
                  label,
                  color: DIGITIZATION_COLORS[value as DigitizationLevel],
                })
              )}
              selected={filters.digitizationLevels}
              onToggle={(v) => onToggleDigitization(v as DigitizationLevel)}
            />

            <FilterGroup
              title="Lab Type"
              options={Object.entries(LAB_TYPE_LABELS).map(
                ([value, label]) => ({ value, label })
              )}
              selected={filters.labTypes}
              onToggle={(v) => onToggleLabType(v as LabType)}
            />

            <FilterGroup
              title="Country"
              options={availableCountries.map((c) => ({
                value: c,
                label: c,
              }))}
              selected={filters.countries}
              onToggle={onToggleCountry}
            />

            {availableNetworks.length > 0 && (
              <FilterGroup
                title="Network"
                options={availableNetworks.map((n) => ({
                  value: n,
                  label: n,
                }))}
                selected={filters.networks}
                onToggle={onToggleNetwork}
              />
            )}
          </div>

          {/* Lab list */}
          <div className="border-t border-gray-200">
            <LabList
              labs={filteredLabs}
              selectedLab={selectedLab}
              onSelectLab={onSelectLab}
            />
          </div>
        </div>
      </div>
    </>
  );
}
