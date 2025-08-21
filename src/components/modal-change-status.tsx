import { useState } from "react";
import { ECandidateStatusEnum } from "../enums/candidate";
import type { TCandidate } from "../types";

type TModalChangeStatusProps = {
  candidate: TCandidate;
  onCancel: () => void;
  onUpdate: (candidate: TCandidate, status: ECandidateStatusEnum) => void;
};

export default function ModalChangeStatus({
  candidate,
  onCancel,
  onUpdate,
}: TModalChangeStatusProps) {
  const [status, setStatus] = useState<ECandidateStatusEnum>(candidate.status);
  const [loading, setLoading] = useState<boolean>(false);

  const handleSave = async () => {
    if (loading) return;
    setLoading(true);
    try {
      onUpdate(candidate, status);
    } finally {
      setLoading(false);
    }
  };

  const formatStatusName = (status: string) => {
    return status
      .split("_")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm animate-in fade-in-0 duration-300">
      <div className="bg-white border border-gray-200 rounded-xl shadow-2xl p-8 w-96 max-w-[90vw] animate-in zoom-in-95 slide-in-from-bottom-2 duration-300">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-2 h-8 bg-blue-600 rounded-full"></div>
          <h2 className="text-xl font-semibold text-gray-900">
            Update Candidate Status
          </h2>
        </div>

        <div className="mb-6 p-4 bg-gray-50 rounded-lg border border-gray-100">
          <p className="text-sm text-gray-600 mb-1">Candidate</p>
          <p className="font-medium text-gray-900">{candidate.full_name}</p>
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-900 mb-2">
            New Status
          </label>
          <div className="relative">
            <select
              value={status}
              onChange={(e) =>
                setStatus(e.target.value as ECandidateStatusEnum)
              }
              className="w-full bg-white border border-gray-200 rounded-lg px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 appearance-none cursor-pointer hover:border-blue-300"
              disabled={loading}
            >
              {Object.values(ECandidateStatusEnum).map((s) => (
                <option key={s} value={s} className="py-2">
                  {formatStatusName(s)}
                </option>
              ))}
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
              <svg
                className="w-5 h-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-3 pt-2">
          <button
            className="px-6 py-2.5 rounded-lg border border-gray-200 bg-gray-100 text-gray-700 font-medium hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={onCancel}
            disabled={loading}
          >
            Cancel
          </button>
          <button
            className="px-6 py-2.5 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            onClick={handleSave}
            disabled={loading}
          >
            {loading && (
              <svg
                className="w-4 h-4 animate-spin"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
            )}
            {loading ? "Updating..." : "Update Status"}
          </button>
        </div>
      </div>
    </div>
  );
}
