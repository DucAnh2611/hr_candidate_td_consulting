import { useEffect } from "react";
import {
  supabase,
  getCandidate,
  registerRealTimeCandidateChangesChannel,
  signOut,
  updateCandidate,
} from "../api";
import useSimpleStateManagement from "../hooks/useSimpleStateManagement";
import { useNavigate, useSearchParams } from "react-router-dom";
import type { TCandidate } from "../types";
import CandidateTable from "../components/CandidateTable";
import CandidateForm from "../components/CandidateForm";
import { ECandidateStatusEnum } from "../enums/candidate";
import ModalChangeStatus from "../components/ModalChangeStatus";

export default function Dashboard() {
  const navigate = useNavigate();
  const { state, updateState } = useSimpleStateManagement();

  const [searchParams, setSearchParams] = useSearchParams();

  const fetchData = async (page: number, size: number) => {
    try {
      setLoadingList(true);

      const { data, error, count } = await getCandidate({ page, size });

      if (!error && data) {
        updateState({ candidates: data, total: count });
      }
    } catch {
      console.error("Loading candidate error!");
    } finally {
      setLoadingList(false);
    }
  };

  const setLoadingList = (loading: boolean) => {
    updateState({ isLoadingCandidate: loading });
  };

  const setOpenCreateCandidateForm = (open: boolean) => {
    updateState({ openCreateCandidateForm: open });
  };

  const handleLogout = async () => {
    await signOut();
    navigate("login");
  };

  const onPagination = (page: number, size: number) => {
    setSearchParams({ page: String(page), size: String(size) });
    updateState({ size, page });
  };

  const onCloseCreate = () => {
    updateState({
      openCreateCandidateForm: false,
    });
  };

  const onSelectChangeStatus = (candidate: TCandidate) => {
    updateState({ editCandidate: candidate });
  };

  const onCancelChangeStatus = () => {
    updateState({ editCandidate: null });
  };

  const onChangeStatus = async (
    candidate: TCandidate,
    status: ECandidateStatusEnum
  ) => {
    const { error } = await updateCandidate(candidate.id, { status });

    if (!error) {
      updateState({ editCandidate: null });
    } 
  };

  useEffect(() => {
    const pageParam = parseInt(searchParams.get("page") || `${1}`, 10);
    const sizeParam = parseInt(searchParams.get("size") || `${10}`, 10);

    updateState({ page: pageParam, size: sizeParam });
  }, [searchParams]);

  useEffect(() => {
    if (state.page <= 0 || state.page <= 0) return;

    fetchData(state.page, state.size);

    const channel = registerRealTimeCandidateChangesChannel(() => {
      onPagination(1, state.size);
      fetchData(1, state.size);
    });

    return () => {
      supabase.removeChannel(channel);
    };
  }, [state.page, state.size, state.session]);

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8 flex flex-col gap-5">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              Candidate Management
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Manage and track job applications and candidate information
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={handleLogout}
              className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200 flex items-center gap-2"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                />
              </svg>
              Logout
            </button>
            <button
              onClick={() => setOpenCreateCandidateForm(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200 flex items-center gap-2"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4v16m8-8H4"
                />
              </svg>
              Add Candidate
            </button>
          </div>
        </div>

        <div className="flex items-start gap-5 w-full">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200  p-6 flex-1">
            <CandidateTable
              candidates={state.candidates}
              total={state.total}
              page={state.page}
              size={state.size}
              isLoading={state.isLoadingCandidate}
              onPagination={onPagination}
              onSelectChangeStatus={onSelectChangeStatus}
            />
          </div>

          <CandidateForm
            show={!!state.openCreateCandidateForm}
            onClose={onCloseCreate}
          />
        </div>
      </div>

      {state.editCandidate && (
        <ModalChangeStatus
          candidate={state.editCandidate}
          onCancel={onCancelChangeStatus}
          onUpdate={onChangeStatus}
        />
      )}
    </main>
  );
}
