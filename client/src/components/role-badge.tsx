import React, { FC } from "react";
import cls from "classnames";

interface RoleBadgeProps {
  roleType: string;
  className?: string;
  children: React.ReactNode;
}

const RoleBadge: FC<RoleBadgeProps> = (props) => {
  const { roleType, className = "", children } = props;

  return (
    <span
      role="contentinfo"
      className={cls(
        "inline-flex px-2 text-xs font-semibold leading-5 rounded-full cursor-pointer",
        {
          "text-purple-5 bg-purple-10": roleType === "CLOSER",
          "text-blue-7 bg-blue-10": roleType !== "CLOSER",
        },
        className
      )}
    >
      {children}
    </span>
  );
};

export default RoleBadge;
