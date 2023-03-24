import { createContext, FC, useContext, PropsWithChildren } from "react";

const initialState = false as const;

export const QueryContext = createContext<unknown>(initialState);

const useQueryContext = <T,>() => {
  const queryContext = useContext(QueryContext);
  return queryContext as T | unknown;
};

export const QueryContextWrapper = <T,>(props: PropsWithChildren<{ value: T }>): React.ReactElement | null => {
  const { value, children } = props;
  return <QueryContext.Provider value={value}>{children}</QueryContext.Provider>;
};

export default useQueryContext;
