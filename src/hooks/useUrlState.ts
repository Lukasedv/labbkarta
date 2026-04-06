import { useEffect, useRef } from "react";
import type { FilterState } from "./useFilters";
import type { DigitizationLevel, Lab, LabType } from "../types/lab";

const PARAM_SEARCH = "search";
const PARAM_COUNTRY = "country";
const PARAM_DIGITIZATION = "digitization";
const PARAM_TYPE = "type";
const PARAM_NETWORK = "network";
const PARAM_SELECTED = "selected";

const VALID_DIGITIZATION: DigitizationLevel[] = [
  "fully_digital",
  "partial",
  "pilot",
  "planned",
  "traditional",
  "unknown",
];
const VALID_LAB_TYPES: LabType[] = [
  "academic",
  "private_network",
  "private_standalone",
  "public_hospital",
];

export function parseUrlFilters(): Partial<FilterState> & { selectedLabId?: string } {
  const params = new URLSearchParams(window.location.search);
  const result: Partial<FilterState> & { selectedLabId?: string } = {};

  const search = params.get(PARAM_SEARCH);
  if (search) result.search = search;

  const countries = params.get(PARAM_COUNTRY);
  if (countries) result.countries = countries.split(",").filter(Boolean);

  const digitization = params.get(PARAM_DIGITIZATION);
  if (digitization) {
    result.digitizationLevels = digitization
      .split(",")
      .filter((v): v is DigitizationLevel =>
        VALID_DIGITIZATION.includes(v as DigitizationLevel)
      );
  }

  const labType = params.get(PARAM_TYPE);
  if (labType) {
    result.labTypes = labType
      .split(",")
      .filter((v): v is LabType => VALID_LAB_TYPES.includes(v as LabType));
  }

  const networks = params.get(PARAM_NETWORK);
  if (networks) result.networks = networks.split(",").filter(Boolean);

  const selected = params.get(PARAM_SELECTED);
  if (selected) result.selectedLabId = selected;

  return result;
}

export function useUrlState(
  filters: FilterState,
  selectedLab: Lab | null,
) {
  const isInitialRender = useRef(true);

  useEffect(() => {
    // Skip the initial render to avoid overwriting URL params before they're consumed
    if (isInitialRender.current) {
      isInitialRender.current = false;
      return;
    }

    const params = new URLSearchParams();

    if (filters?.search) params.set(PARAM_SEARCH, filters.search);
    if (filters?.countries?.length > 0)
      params.set(PARAM_COUNTRY, filters.countries.join(","));
    if (filters?.digitizationLevels?.length > 0)
      params.set(PARAM_DIGITIZATION, filters.digitizationLevels.join(","));
    if (filters?.labTypes?.length > 0)
      params.set(PARAM_TYPE, filters.labTypes.join(","));
    if (filters?.networks?.length > 0)
      params.set(PARAM_NETWORK, filters.networks.join(","));
    if (selectedLab) params.set(PARAM_SELECTED, selectedLab.id);

    const qs = params.toString();
    const newUrl = qs
      ? `${window.location.pathname}?${qs}`
      : window.location.pathname;

    window.history.replaceState(null, "", newUrl);
  }, [filters, selectedLab]);
}
