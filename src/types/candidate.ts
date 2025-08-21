import type { ECandidateStatusEnum } from "../enums/candidate";

export type TCandidate = {
  id: string;
  full_name: string;
  applied_position: string;
  status: ECandidateStatusEnum;
  resume_url: string;
  created_at: string;
};

export type TCandidateFormData = {
  full_name: string;
  applied_position: string;
  status: ECandidateStatusEnum;
  resume?: FileList;
};
