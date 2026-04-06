import type { Lab } from "../../types/lab";
import {
  DIGITIZATION_LABELS,
  DIGITIZATION_COLORS,
  LAB_TYPE_LABELS,
} from "../../types/lab";

interface LabDetailPanelProps {
  lab: Lab;
  onClose: () => void;
}

function InfoRow({
  label,
  value,
}: {
  label: string;
  value: React.ReactNode;
}) {
  if (!value) return null;
  return (
    <div className="py-1.5">
      <dt className="text-xs font-medium text-gray-500 uppercase tracking-wider">
        {label}
      </dt>
      <dd className="text-sm text-gray-900 mt-0.5">{value}</dd>
    </div>
  );
}

export function LabDetailPanel({ lab, onClose }: LabDetailPanelProps) {
  return (
    <div className="absolute right-0 top-0 h-full w-96 max-w-[calc(100vw-4rem)] bg-white shadow-xl border-l border-gray-200 z-[1000] flex flex-col overflow-hidden">
      {/* Header */}
      <div className="p-4 border-b border-gray-200 flex items-start gap-3">
        <div className="flex-1 min-w-0">
          <h2 className="text-base font-bold text-gray-900 m-0 leading-tight">
            {lab.name}
          </h2>
          <p className="text-sm text-gray-500 mt-0.5">
            {lab.city}, {lab.country}
          </p>
        </div>
        <button
          onClick={onClose}
          className="p-1 hover:bg-gray-100 rounded transition-colors cursor-pointer border-none bg-transparent flex-shrink-0"
          aria-label="Close"
        >
          <svg
            className="w-5 h-5 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>

      {/* Body */}
      <div className="flex-1 overflow-y-auto p-4">
        {/* Digitization badge */}
        <div className="mb-4">
          <span
            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium text-white"
            style={{
              backgroundColor:
                DIGITIZATION_COLORS[lab.digitizationLevel],
            }}
          >
            {DIGITIZATION_LABELS[lab.digitizationLevel]}
          </span>
          <span className="ml-2 inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700">
            {LAB_TYPE_LABELS[lab.type]}
          </span>
        </div>

        <dl className="divide-y divide-gray-100">
          {lab.network && <InfoRow label="Network" value={lab.network} />}

          <InfoRow label="Annual Sample Volume" value={lab.annualSampleVolume} />

          {lab.pathologistCount && (
            <InfoRow
              label="Pathologists"
              value={lab.pathologistCount.toString()}
            />
          )}

          {lab.scannerVendors && lab.scannerVendors.length > 0 && (
            <InfoRow
              label="Scanner Vendors"
              value={lab.scannerVendors.join(", ")}
            />
          )}

          <InfoRow label="Software Platform" value={lab.softwarePlatform} />

          {lab.accreditation && lab.accreditation.length > 0 && (
            <InfoRow
              label="Accreditation"
              value={lab.accreditation.join(", ")}
            />
          )}

          {lab.specialties && lab.specialties.length > 0 && (
            <InfoRow
              label="Specialties"
              value={
                <div className="flex flex-wrap gap-1 mt-1">
                  {lab.specialties.map((s) => (
                    <span
                      key={s}
                      className="px-2 py-0.5 bg-gray-100 text-gray-600 rounded text-xs"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              }
            />
          )}

          {lab.description && (
            <InfoRow label="Description" value={lab.description} />
          )}
        </dl>

        {/* Contact section */}
        {(lab.address || lab.phone || lab.email || lab.website) && (
          <div className="mt-4 pt-4 border-t border-gray-200">
            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
              Contact
            </h3>
            {lab.address && (
              <p className="text-sm text-gray-700 mb-1">📍 {lab.address}</p>
            )}
            {lab.phone && (
              <p className="text-sm text-gray-700 mb-1">
                📞{" "}
                <a
                  href={`tel:${lab.phone}`}
                  className="text-blue-600 hover:underline"
                >
                  {lab.phone}
                </a>
              </p>
            )}
            {lab.email && (
              <p className="text-sm text-gray-700 mb-1">
                ✉️{" "}
                <a
                  href={`mailto:${lab.email}`}
                  className="text-blue-600 hover:underline"
                >
                  {lab.email}
                </a>
              </p>
            )}
            {lab.website && (
              <p className="text-sm text-gray-700 mb-1">
                🌐{" "}
                <a
                  href={
                    lab.website.startsWith("http")
                      ? lab.website
                      : `https://${lab.website}`
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  {lab.website}
                </a>
              </p>
            )}
          </div>
        )}

        {/* Sources */}
        {lab.sources && lab.sources.length > 0 && (
          <div className="mt-4 pt-4 border-t border-gray-200">
            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
              Sources
            </h3>
            <ul className="space-y-1">
              {lab.sources.map((src, i) => (
                <li key={i}>
                  <a
                    href={src}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-blue-600 hover:underline break-all"
                  >
                    {src}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Footer with coordinates */}
      <div className="p-3 border-t border-gray-200 text-xs text-gray-400">
        {lab.coordinates.lat.toFixed(4)}, {lab.coordinates.lng.toFixed(4)}
      </div>
    </div>
  );
}
