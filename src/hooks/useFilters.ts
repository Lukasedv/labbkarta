import { useState, useMemo, useCallback } from "react";
import type { Lab, DigitizationLevel, LabType } from "../types/lab";

export interface FilterState {
  search: string;
  countries: string[];
  digitizationLevels: DigitizationLevel[];
  labTypes: LabType[];
  networks: string[];
}

const defaultFilters: FilterState = {
  search: "",
  countries: [],
  digitizationLevels: [],
  labTypes: [],
  networks: [],
};

export function useFilters(labs: Lab[], initialOverrides?: Partial<FilterState>) {
  const [filters, setFilters] = useState<FilterState>(() => ({
    ...defaultFilters,
    ...initialOverrides,
  }));

  const availableCountries = useMemo(
    () => [...new Set(labs.map((l) => l.country))].sort(),
    [labs]
  );

  const availableNetworks = useMemo(
    () =>
      [...new Set(labs.map((l) => l.network).filter(Boolean) as string[])].sort(),
    [labs]
  );

  const filteredLabs = useMemo(() => {
    return labs.filter((lab) => {
      if (filters.search) {
        const q = filters.search.toLowerCase();
        const match =
          lab.name.toLowerCase().includes(q) ||
          lab.city.toLowerCase().includes(q) ||
          lab.country.toLowerCase().includes(q) ||
          (lab.network?.toLowerCase().includes(q) ?? false);
        if (!match) return false;
      }

      if (
        filters.countries.length > 0 &&
        !filters.countries.includes(lab.country)
      )
        return false;

      if (
        filters.digitizationLevels.length > 0 &&
        !filters.digitizationLevels.includes(lab.digitizationLevel)
      )
        return false;

      if (
        filters.labTypes.length > 0 &&
        !filters.labTypes.includes(lab.type)
      )
        return false;

      if (filters.networks.length > 0) {
        if (!lab.network || !filters.networks.includes(lab.network))
          return false;
      }

      return true;
    });
  }, [labs, filters]);

  const setSearch = useCallback(
    (search: string) => setFilters((f) => ({ ...f, search })),
    []
  );

  const toggleCountry = useCallback(
    (country: string) =>
      setFilters((f) => ({
        ...f,
        countries: f.countries.includes(country)
          ? f.countries.filter((c) => c !== country)
          : [...f.countries, country],
      })),
    []
  );

  const toggleDigitization = useCallback(
    (level: DigitizationLevel) =>
      setFilters((f) => ({
        ...f,
        digitizationLevels: f.digitizationLevels.includes(level)
          ? f.digitizationLevels.filter((l) => l !== level)
          : [...f.digitizationLevels, level],
      })),
    []
  );

  const toggleLabType = useCallback(
    (type: LabType) =>
      setFilters((f) => ({
        ...f,
        labTypes: f.labTypes.includes(type)
          ? f.labTypes.filter((t) => t !== type)
          : [...f.labTypes, type],
      })),
    []
  );

  const toggleNetwork = useCallback(
    (network: string) =>
      setFilters((f) => ({
        ...f,
        networks: f.networks.includes(network)
          ? f.networks.filter((n) => n !== network)
          : [...f.networks, network],
      })),
    []
  );

  const clearFilters = useCallback(() => setFilters(defaultFilters), []);

  return {
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
  };
}
