import React, { PropsWithChildren, FC } from "react";
import ReactSkeleton, { SkeletonProps } from "react-loading-skeleton";

export type EnhancedSkeletonProps = SkeletonProps & {
  isLoading: boolean;
};

const Skeleton: FC<PropsWithChildren<EnhancedSkeletonProps>> = ({ children, isLoading, ...skeletonProps }) => {
  return <>{isLoading ? <ReactSkeleton {...skeletonProps} /> : children}</>;
};

export default Skeleton;
