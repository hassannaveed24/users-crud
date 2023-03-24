import React, { FC, PropsWithChildren, useCallback, useMemo } from "react";
import InternalContext, { INITIAL_INTERNAL_CONTEXT_VALUE, InternalGridContextValue } from "../context";
import { DetailedDivProps, ErrorStateOptions } from "../types";
import cls from "classnames";
import { INITIAL_GRID_STATE } from "@/state/contexts/grid-context";
import { ErrorState } from "../error-state";
import { isNil } from "lodash";

interface GridBaseProps {
  className: string;
  context: Partial<InternalGridContextValue>;
}

const GridBase: FC<PropsWithChildren<GridBaseProps>> = (props) => {
  const { children, className, context } = props;

  const memoizedCtx = useMemo<InternalGridContextValue>(
    () => ({
      isLoading: context.isLoading || INITIAL_INTERNAL_CONTEXT_VALUE.isLoading,
      isError: context.isError || INITIAL_INTERNAL_CONTEXT_VALUE.isError,
      isEmpty: !isNil(context.isEmpty) ? context.isEmpty : INITIAL_INTERNAL_CONTEXT_VALUE.isEmpty,
      errorState: context.errorState || INITIAL_INTERNAL_CONTEXT_VALUE.errorState,
      emptyState: context.emptyState || INITIAL_INTERNAL_CONTEXT_VALUE.emptyState,
      editModal: context.editModal || INITIAL_INTERNAL_CONTEXT_VALUE.editModal,
    }),
    [context]
  );

  return (
    <InternalContext.Provider value={memoizedCtx}>
      <div className="overflow-x-auto">
        <div
          className={cls(
            "block align-middle shadow-sm border divide-y rounded divide-borderColors-2 border-borderColors-2",
            className
          )}
        >
          {children}
        </div>
      </div>
    </InternalContext.Provider>
  );
};

export default GridBase;
