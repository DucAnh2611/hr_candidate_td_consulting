import type { Dispatch } from "react";
import type { ESimpleStateManagementContextDispatchType } from "../enums/context";

export interface ISimpleStateManagementContext {
  state: ISimpleStateManagementContextState;
  dispatch: Dispatch<ISimpleStateManagementContextDispatchPayload> | null;
}

export interface ISimpleStateManagementContextState {}

export interface ISimpleStateManagementContextDispatchPayload {
  type: ESimpleStateManagementContextDispatchType;
  data: Partial<ISimpleStateManagementContextState>;
}
