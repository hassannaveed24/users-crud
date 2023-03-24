import { FC } from "react";
import { DetailedDivProps, RenderPropedChildren } from "../types";
import cls from "classnames";
import { useInternalGridContext } from "../context";

const GridRow: FC<Omit<DetailedDivProps, "children"> & RenderPropedChildren> = ({ children, className, ...props }) => {
  const internalContext = useInternalGridContext();
  return (
    <div className={cls("flex items-center py-4", className)} {...props}>
      {typeof children === "function" ? children(internalContext) : children}
    </div>
  );
};

export default GridRow;
