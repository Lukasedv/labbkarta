import { useState, useMemo } from "react";
import { LabMap } from "./components/Map/LabMap";
import { MapLegend } from "./components/Map/MapLegend";
import { Sidebar } from "./components/Sidebar/Sidebar";
import { LabDetailPanel } from "./components/LabDetail/LabDetailPanel";
import { useLabData } from "./hooks/useLabData";
import { useFilters } from "./hooks/useFilters";
import { parseUrlFilters, useUrlState } from "./hooks/useUrlState";
import type { Lab } from "./types/lab";

const urlState = parseUrlFilters();

export default function App() {
  const { labs, loading, error } = useLabData();

  const initialFilterOverrides = useMemo(() => {
    const overrides: Partial<typeof filters> = {};
    if (urlState.search) overrides.search = urlState.search;
    if (urlState.countries?.length) overrides.countries = urlState.countries;
    if (urlState.digitizationLevels?.length) overrides.digitizationLevels = urlState.digitizationLevels;
    if (urlState.labTypes?.length) overrides.labTypes = urlState.labTypes;
    if (urlState.networks?.length) overrides.networks = urlState.networks;
    return overrides;
  }, []);

  const {
    filters,
    filteredLabs,
    availableCountries,
    availableNetworks,
    setSearch,
    toggleCountry,
    toggleDigitization,
    toggleLabType,
    toggleNetwork,
    clearFilters,
  } = useFilters(labs, initialFilterOverrides);

  const [selectedLab, setSelectedLab] = useState<Lab | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Restore selected lab from URL once labs are loaded
  const initialSelectedApplied = useMemo(() => {
    if (
      urlState.selectedLabId &&
      labs.length > 0 &&
      selectedLab === null
    ) {
      const found = labs.find((l) => l.id === urlState.selectedLabId);
      if (found) {
        setSelectedLab(found);
        return true;
      }
    }
    return false;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [labs]);
  void initialSelectedApplied;

  useUrlState(filters, selectedLab);

  const handleSelectLab = (lab: Lab) => {
    setSelectedLab(lab);
    setSidebarOpen(false);
  };

  if (loading) {
    return (
      <div className="h-screen w-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600 mx-auto mb-3" />
          <p className="text-sm text-gray-500">Loading lab data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-screen w-screen flex items-center justify-center bg-gray-50">
        <div className="text-center text-red-600">
          <p className="font-medium">Failed to load data</p>
          <p className="text-sm">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen w-screen">
      <Sidebar
        filters={filters}
        filteredLabs={filteredLabs}
        allLabs={labs}
        totalCount={labs.length}
        availableCountries={availableCountries}
        availableNetworks={availableNetworks}
        onSearch={setSearch}
        onToggleCountry={toggleCountry}
        onToggleDigitization={toggleDigitization}
        onToggleLabType={toggleLabType}
        onToggleNetwork={toggleNetwork}
        onClearFilters={clearFilters}
        onSelectLab={handleSelectLab}
        selectedLab={selectedLab}
        isOpen={sidebarOpen}
        onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
      />

      <div className="flex-1 relative">
        <LabMap
          labs={filteredLabs}
          selectedLab={selectedLab}
          onSelectLab={handleSelectLab}
        />
        <MapLegend />

        {selectedLab && (
          <LabDetailPanel
            lab={selectedLab}
            allLabs={labs}
            onClose={() => setSelectedLab(null)}
            onSelectLab={handleSelectLab}
          />
        )}
      </div>
    </div>
  );
}
