import type { Lab } from "../../types/lab";
import { exportAsCSV, exportAsJSON } from "../../utils/export";

interface ExportButtonProps {
  labs: Lab[];
}

export function ExportButton({ labs }: ExportButtonProps) {
  return (
    <div className="flex items-center gap-2 p-3 border-t border-gray-200 bg-gray-50">
      <span className="text-xs text-gray-500">Export:</span>
      <button
        onClick={() => exportAsCSV(labs)}
        disabled={labs.length === 0}
        className="px-2.5 py-1 text-xs font-medium rounded bg-white border border-gray-300 text-gray-700 hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer transition-colors"
      >
        CSV
      </button>
      <button
        onClick={() => exportAsJSON(labs)}
        disabled={labs.length === 0}
        className="px-2.5 py-1 text-xs font-medium rounded bg-white border border-gray-300 text-gray-700 hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer transition-colors"
      >
        JSON
      </button>
    </div>
  );
}
