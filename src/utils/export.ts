import type { Lab } from "../types/lab";

const CSV_COLUMNS = [
  "name",
  "type",
  "network",
  "country",
  "city",
  "lat",
  "lng",
  "website",
  "phone",
  "email",
  "digitizationLevel",
  "specialties",
  "description",
] as const;

function escapeCsvField(value: string): string {
  if (value.includes(",") || value.includes('"') || value.includes("\n")) {
    return `"${value.replace(/"/g, '""')}"`;
  }
  return value;
}

function labToCsvRow(lab: Lab): string {
  return CSV_COLUMNS.map((col) => {
    if (col === "lat") return String(lab.coordinates.lat);
    if (col === "lng") return String(lab.coordinates.lng);
    if (col === "specialties") return escapeCsvField((lab.specialties ?? []).join("; "));
    const val = lab[col as keyof Lab];
    return escapeCsvField(val == null ? "" : String(val));
  }).join(",");
}

function downloadBlob(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

export function exportAsCSV(labs: Lab[]) {
  const header = CSV_COLUMNS.join(",");
  const rows = labs.map(labToCsvRow);
  const csv = [header, ...rows].join("\n");
  downloadBlob(
    new Blob([csv], { type: "text/csv;charset=utf-8;" }),
    "labbkarta-export.csv",
  );
}

export function exportAsJSON(labs: Lab[]) {
  const json = JSON.stringify(labs, null, 2);
  downloadBlob(
    new Blob([json], { type: "application/json" }),
    "labbkarta-export.json",
  );
}
