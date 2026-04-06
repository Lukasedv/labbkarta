export type LabType = "academic" | "private_network" | "private_standalone" | "public_hospital";

export type DigitizationLevel =
  | "fully_digital"
  | "partial"
  | "pilot"
  | "planned"
  | "traditional"
  | "unknown";

export interface Lab {
  id: string;
  name: string;
  type: LabType;
  network?: string;
  country: string;
  city: string;
  coordinates: { lat: number; lng: number };
  address?: string;
  phone?: string;
  email?: string;
  website?: string;
  annualSampleVolume?: string;
  digitizationLevel: DigitizationLevel;
  scannerVendors?: string[];
  softwarePlatform?: string;
  accreditation?: string[];
  specialties?: string[];
  pathologistCount?: number;
  description?: string;
  sources?: string[];
}

export const DIGITIZATION_LABELS: Record<DigitizationLevel, string> = {
  fully_digital: "Fully Digital",
  partial: "Partial",
  pilot: "Pilot",
  planned: "Planned",
  traditional: "Traditional",
  unknown: "Unknown",
};

export const DIGITIZATION_COLORS: Record<DigitizationLevel, string> = {
  fully_digital: "#16a34a",
  partial: "#2563eb",
  pilot: "#d97706",
  planned: "#7c3aed",
  traditional: "#6b7280",
  unknown: "#9ca3af",
};

export const LAB_TYPE_LABELS: Record<LabType, string> = {
  academic: "Academic / University Hospital",
  private_network: "Private Network",
  private_standalone: "Private Standalone",
  public_hospital: "Public Hospital",
};
