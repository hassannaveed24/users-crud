import { IWorkspaceMember } from "@/schemas/member.schema";
import { Nullable } from "@/types/misc.type";
import { createContext, Dispatch, SetStateAction, useContext } from "react";
import { EmptyState } from "./empty-state";
import { ErrorState } from "./error-state";

export interface ModalProps<T> {
  isVisible: boolean;
  setVisibility: Dispatch<SetStateAction<boolean>>;
  data: T | undefined;
  setData: Dispatch<SetStateAction<T | undefined>>;
}

export interface InternalGridContextValue {
  isLoading: boolean;
  isError: boolean;
  isEmpty: boolean;
  errorState: ErrorState;
  emptyState: Partial<EmptyState>;
  editModal: ModalProps<any>;
}

export const INITIAL_INTERNAL_CONTEXT_VALUE: InternalGridContextValue = {
  isLoading: false,
  isError: false,
  isEmpty: true,
  errorState: {
    title: "Something went wrong",
    description: "Sorry! It seems there is a problem with our server!",
  },
  emptyState: {
    text: "No data available, click below to add new data",
    label: "Add New",
    onClick: () => {},
  },
  editModal: {
    isVisible: false,
    setVisibility: () => {},
    data: undefined,
    setData: () => {},
  },
};

const InternalContext = createContext<InternalGridContextValue>(INITIAL_INTERNAL_CONTEXT_VALUE);

export const useInternalGridContext = () => {
  const internalContext = useContext(InternalContext) || INITIAL_INTERNAL_CONTEXT_VALUE;
  return internalContext;
};

export default InternalContext;
