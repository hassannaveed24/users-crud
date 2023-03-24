import React, { FC } from "react";
import { DetailedDivProps } from "../types";
import cls from "classnames";

const GridHeader: FC<DetailedDivProps> = ({ children, className = "", ...props }) => {
  return (
    <div className={cls("flex items-center rounded-t bg-grey-10 py-3.5", className)} {...props}>
      {children}
    </div>
  );
};

export default GridHeader;
