import { useForm } from "react-hook-form";
import type { TCandidateFormData } from "../types";
import { ECandidateStatusEnum } from "../enums/candidate";
import { createCandidate } from "../api";
import useSimpleStateManagement from "../hooks/useSimpleStateManagement";

type TCandidateForm = {
  show: boolean;
  onClose: () => void;
};

const baseFormData: TCandidateFormData = {
  applied_position: "",
  full_name: "",
  status: ECandidateStatusEnum.NEW,
};

export default function CandidateForm({ show, onClose }: TCandidateForm) {
  const { state, updateState } = useSimpleStateManagement();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TCandidateFormData>({
    defaultValues: baseFormData,
  });

  const onSubmit = async (data: TCandidateFormData) => {
    try {
      if (state.isCallingCandidate) return;

      updateState({ isCallingCandidate: true });

      const resCreated = await createCandidate(data);

      if (resCreated && !!resCreated.data) {
        reset();
      }
    } finally {
      updateState({ isCallingCandidate: false });
    }
  };

  if (!show) return null;

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6 p-8 bg-white rounded-xl shadow-lg border border-gray-100 max-w-md mx-auto"
    >
      {/* Header */}
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Add New Candidate</h2>
        <p className="text-gray-600 text-sm">Fill in the candidate information below</p>
      </div>

      {/* Full Name Field */}
      <div className="space-y-2">
        <label className="block text-sm font-semibold text-gray-800">Full Name *</label>
        <input
          {...register("full_name", { required: "Full name is required" })}
          type="text"
          placeholder="Enter full name"
          className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-gray-50 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
        />
        {errors.full_name && (
          <span className="text-sm text-red-600 flex items-center gap-1">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
            {errors.full_name.message}
          </span>
        )}
      </div>

      {/* Applied Position Field */}
      <div className="space-y-2">
        <label className="block text-sm font-semibold text-gray-800">Applied Position *</label>
        <input
          {...register("applied_position", {
            required: "Applied position is required",
          })}
          type="text"
          placeholder="e.g. Software Engineer, Marketing Manager"
          className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-gray-50 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
        />
        {errors.applied_position && (
          <span className="text-sm text-red-600 flex items-center gap-1">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
            {errors.applied_position.message}
          </span>
        )}
      </div>

      {/* Status Field */}
      <div className="space-y-2">
        <label className="block text-sm font-semibold text-gray-800">Status *</label>
        <div className="relative">
          <select
            {...register("status", { required: "Status is required" })}
            className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-gray-50 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 appearance-none cursor-pointer"
          >
            <option value="">Select status</option>
            {Object.entries(ECandidateStatusEnum).map((entry) => (
              <option value={entry[1]} key={entry[1]}>
                {entry[1]}
              </option>
            ))}
          </select>
          <svg
            className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
        {errors.status && (
          <span className="text-sm text-red-600 flex items-center gap-1">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
            {errors.status.message}
          </span>
        )}
      </div>

      {/* Resume Upload Field */}
      <div className="space-y-2">
        <label className="block text-sm font-semibold text-gray-800">Resume (PDF) *</label>
        <div className="relative">
          <input
            type="file"
            accept="application/pdf"
            {...register("resume", { required: "Resume is required!" })}
            className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-gray-50 text-gray-900 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          />
        </div>
        {errors.resume && (
          <span className="text-sm text-red-600 flex items-center gap-1">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
            {errors.resume.message}
          </span>
        )}
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col gap-3 pt-4">
        <button
          type="submit"
          disabled={state.isCallingCandidate}
          className="w-full py-3 px-6 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 disabled:from-blue-400 disabled:to-blue-500 disabled:cursor-not-allowed text-white font-semibold rounded-lg shadow-md hover:shadow-lg transform hover:-translate-y-0.5 disabled:transform-none transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 flex items-center justify-center gap-2"
        >
          {state.isCallingCandidate && (
            <svg
              className="animate-spin h-5 w-5 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
          )}
          {state.isCallingCandidate ? "Creating..." : "Create Candidate"}
        </button>

        <button
          type="button"
          onClick={onClose}
          disabled={state.isCallingCandidate}
          className="w-full py-3 px-6 bg-gray-100 hover:bg-gray-200 disabled:bg-gray-50 disabled:cursor-not-allowed text-gray-700 disabled:text-gray-400 font-semibold rounded-lg shadow-sm hover:shadow-md disabled:shadow-none transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2 flex items-center justify-center gap-2"
        >
          {state.isCallingCandidate && (
            <svg
              className="animate-spin h-5 w-5 text-gray-400"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
          )}
          Cancel
        </button>
      </div>
    </form>
  );
}
