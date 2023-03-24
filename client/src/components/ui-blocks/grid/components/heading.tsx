import React, { FC } from "react";
import { DetailedDivProps } from "../types";
import cls from "classnames";

const GridHeading: FC<
  DetailedDivProps & {
    className: string;
  }
> = ({ children, className, ...props }) => {
  return (
    <div
      className={cls("px-4 sm:px-6 text-left text-xs font-semibold text-textColors-3 uppercase", className)}
      {...props}
    >
      {children}
    </div>
  );
};

export default GridHeading;
