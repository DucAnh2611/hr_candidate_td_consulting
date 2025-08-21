import type { Dispatch } from "react";
import type { ESimpleStateManagementContextDispatchType } from "../enums/context";
import type { Session } from "@supabase/supabase-js";
import type { TCandidate } from "./candidate";

export interface ISimpleStateManagementContext {
  state: ISimpleStateManagementContextState;
  dispatch: Dispatch<ISimpleStateManagementContextDispatchPayload> | null;
}

export interface ISimpleStateManagementContextState {
  session?: Session | null;
  openCreateCandidateForm: boolean;
  candidates: TCandidate[];
  total: number;
  isLoadingCandidate: boolean;
  isCallingCandidate: boolean;
  page: number;
  size: number;
}

export interface ISimpleStateManagementContextDispatchPayload {
  type: ESimpleStateManagementContextDispatchType;
  data: Partial<ISimpleStateManagementContextState>;
}
