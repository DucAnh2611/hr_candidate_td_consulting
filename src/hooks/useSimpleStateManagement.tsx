import { useContext } from "react";
import {
  SimpleStateManagementContext,
} from "../contexts/SimpleStateManagement";
import type { ISimpleStateManagementContext } from "../types";

export default function useSimpleStateManagement() {
  const contextValue = useContext<ISimpleStateManagementContext>(
    SimpleStateManagementContext
  );

  if (!contextValue)
    throw new Error("Uninitialise Simple State Management Provider");

  return contextValue;
}
