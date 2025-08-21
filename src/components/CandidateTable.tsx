import { ECandidateStatusEnum } from "../enums/candidate";
import type { TCandidate } from "../types";

type TCandidateTableProps = {
  candidates: TCandidate[];
  total: number;
  page: number;
  size: number;
  isLoading: boolean;
  onPagination: (page: number, size: number) => void;
  onChangeStatus: (candidate: TCandidate, status: ECandidateStatusEnum) => void;
};

function getStatusColor(status: ECandidateStatusEnum) {
  switch (status) {
    case ECandidateStatusEnum.NEW:
      return "bg-blue-100 text-blue-800";
    case ECandidateStatusEnum.INTERVIEWING:
      return "bg-yellow-100 text-yellow-800";
    case ECandidateStatusEnum.HIRED:
      return "bg-green-100 text-green-800";
    case ECandidateStatusEnum.REJECT:
      return "bg-red-400 text-red-5000";
    default:
      return "bg-gray-100 text-gray-800";
  }
}

const columns = [
  {
    key: "id",
    header: "ID",
    render: (c: TCandidate) => (
      <span className="font-mono text-sm" title={c.id}>
        {c.id.slice(0, 8)}...
      </span>
    ),
  },
  {
    key: "full_name",
    header: "Full Name",
    render: (c: TCandidate) => (
      <span className="font-medium">{c.full_name}</span>
    ),
  },
  {
    key: "applied_position",
    header: "Applied Position",
    render: (c: TCandidate) => <span>{c.applied_position}</span>,
  },
  {
    key: "status",
    header: "Status",
    render: (c: TCandidate) => (
      <span
        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
          c.status
        )}`}
      >
        {c.status}
      </span>
    ),
  },
  {
    key: "resume_url",
    header: "Resume",
    render: (c: TCandidate) => (
      <a
        href={c.resume_url}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
      >
        <svg
          className="h-4 w-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
          />
        </svg>
        View Resume
      </a>
    ),
  },
  {
    key: "created_at",
    header: "Created At",
    render: (c: TCandidate) =>
      new Date(c.created_at).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }),
  },
];

export default function CandidateTable({
  candidates,
  page,
  size,
  total,
  isLoading,
  onPagination,
  onChangeStatus,
}: TCandidateTableProps) {
  const totalPages = Math.ceil(total / size);

  return (
    <div>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div className="rounded-lg border border-gray-300 overflow-hidden shadow-sm">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-3000">
                {columns.map((col) => (
                  <th
                    key={col.key}
                    className="text-left p-4 font-semibold border-r border-gray-3000 text-gray-900 last:border-r-0"
                  >
                    {col.header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white">
              {candidates.map((c, idx) => (
                <tr
                  key={c.id}
                  className={`border-b border-gray-3000 hover:bg-gray-50 transition-colors ${
                    idx === candidates.length - 1 ? "border-b-0" : ""
                  }`}
                >
                  {columns.map((col) => (
                    <td
                      key={col.key}
                      className="p-4 border-r border-gray-3000 text-gray-700 last:border-r-0"
                    >
                      {col.render(c)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <div className="flex items-center justify-center gap-4 py-4">
        <button
          onClick={() => onPagination(Math.max(1, page - 1), size)}
          disabled={page <= 1}
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-white transition-colors"
        >
          Previous
        </button>

        <span className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-900 bg-gray-50 border border-gray-300 rounded-md">
          Page {page} of {totalPages}
        </span>

        <button
          onClick={() => onPagination(Math.min(totalPages, page + 1), size)}
          disabled={page >= totalPages}
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-white transition-colors"
        >
          Next
        </button>
      </div>
    </div>
  );
}
