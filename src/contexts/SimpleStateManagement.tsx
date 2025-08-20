import { createContext, useReducer, type ReactNode } from "react";
import type {
  ISimpleStateManagementContext,
  ISimpleStateManagementContextDispatchPayload,
  ISimpleStateManagementContextState,
} from "../types";
import { ESimpleStateManagementContextDispatchType } from "../enums/context";

const initialState: ISimpleStateManagementContextState = {};

export const SimpleStateManagementContext =
  createContext<ISimpleStateManagementContext>({
    state: initialState,
    dispatch: null,
  });

  
const reducer = (
  state: ISimpleStateManagementContextState,
  payload: ISimpleStateManagementContextDispatchPayload
): ISimpleStateManagementContextState => {
  const { type, data } = payload;
  
  switch (type) {
    case ESimpleStateManagementContextDispatchType.UPDATE:
      return { ...state, ...data };
  }
};

export function SimpleStateManagementContextProvider({
  children,
}: {
  children: ReactNode;
}): JSX.Element {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <SimpleStateManagementContext.Provider value={{ state, dispatch }}>
      {children}
    </SimpleStateManagementContext.Provider>
  );
}
