import React, { FC, useCallback } from "react";
import { DetailedDivProps, EmptyStateOptions, ErrorStateOptions } from "../types";
import cls from "classnames";
import { useInternalGridContext } from "../context";
import ErrorState from "../error-state";
import EmptyState from "../empty-state";

// interface GridBodyProps extends DetailedDivProps {

// }

const GridBody: FC<DetailedDivProps> = ({ children, className = "", ...props }) => {
  const { isError, isEmpty, errorState, emptyState } = useInternalGridContext();

  const RenderedErrorComponent = useCallback(() => {
    const errorStateOptions = errorState as ErrorStateOptions;
    if (errorStateOptions.title && errorStateOptions.description) {
      return <ErrorState {...errorStateOptions} />;
    }

    const CustomErrorComponent = errorState as any;
    return CustomErrorComponent;
  }, [errorState]);

  const RenderedEmptyComponent = useCallback(() => {
    const CustomEmptyComponent = emptyState as any;

    if (Object.prototype.hasOwnProperty.call(CustomEmptyComponent, "props")) {
      // empty state is react node
      return CustomEmptyComponent;
    }

    // empty state is config object
    const emptyStateOptions = emptyState as EmptyStateOptions;

    // eslint-disable-next-line react/display-name
    return <EmptyState {...(emptyStateOptions as EmptyStateOptions)} />;
  }, [emptyState]);

  return (
    <div className={cls("divide-y divide-grey-9", className)} {...props}>
      {isError ? (
        <RenderedErrorComponent />
      ) : isEmpty ? (
        <>
          <RenderedEmptyComponent />
        </>
      ) : (
        children
      )}
    </div>
  );
};

export default GridBody;
