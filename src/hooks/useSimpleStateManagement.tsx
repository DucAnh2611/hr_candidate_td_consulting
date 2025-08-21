import { useContext } from "react";
import { SimpleStateManagementContext } from "../contexts/SimpleStateManagement";
import type {
  ISimpleStateManagementContext,
  ISimpleStateManagementContextState,
} from "../types";
import { ESimpleStateManagementContextDispatchType } from "../enums/context";

export default function useSimpleStateManagement() {
  const contextValue = useContext<ISimpleStateManagementContext>(
    SimpleStateManagementContext
  );

  if (!contextValue)
    throw new Error("Uninitialise Simple State Management Provider");

  const updateState = (data: Partial<ISimpleStateManagementContextState>) => {
    if (!contextValue.dispatch) return;

    contextValue.dispatch({
      type: ESimpleStateManagementContextDispatchType.UPDATE,
      data,
    });
  };

  return { ...contextValue, updateState };
}
