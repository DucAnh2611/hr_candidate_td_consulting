import type { Dispatch } from "react";
import type { ESimpleStateManagementContextDispatchType } from "../enums/context";
import type { Session, User } from "@supabase/supabase-js";

export interface ISimpleStateManagementContext {
  state: ISimpleStateManagementContextState;
  dispatch: Dispatch<ISimpleStateManagementContextDispatchPayload> | null;
}

export interface ISimpleStateManagementContextState {
  session?: Session | null;
}

export interface ISimpleStateManagementContextDispatchPayload {
  type: ESimpleStateManagementContextDispatchType;
  data: Partial<ISimpleStateManagementContextState>;
}
