import { FC } from "react";
import { DetailedDivProps, RenderPropedChildren } from "../types";
import cls from "classnames";
import { useInternalGridContext } from "../context";
import _isNil from "lodash/isNil";
import { SkeletonProps } from "react-loading-skeleton";
import Skeleton from "@/components/skeleton";

const GridCell: FC<
  Omit<DetailedDivProps, "children"> &
    RenderPropedChildren & {
      className: string;
      isLoading?: boolean;
      showSkeletonOnLoading?: boolean;
      skeletonProps?: SkeletonProps;
    }
> = ({
  children: _children,
  className,
  showSkeletonOnLoading = true,
  isLoading: forcedLoading,
  skeletonProps = {},
  ...props
}) => {
  const internalContext = useInternalGridContext();
  const isLoading = _isNil(forcedLoading) ? internalContext.isLoading : forcedLoading;
  const children = typeof _children === "function" ? _children(internalContext) : _children;
  return (
    <div
      className={cls("px-4 sm:px-6 text-sm whitespace-nowrap text-ellipsis text-textColors-3", className)}
      {...props}
    >
      {showSkeletonOnLoading ? (
        <Skeleton {...skeletonProps} isLoading={isLoading}>
          {children}
        </Skeleton>
      ) : !isLoading ? (
        children
      ) : null}
    </div>
  );
};

export default GridCell;
