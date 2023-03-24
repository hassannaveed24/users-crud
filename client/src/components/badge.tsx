import React, { FC } from "react";

export type BadgeProps = {
  children: string;
  textColor?: string;
  backgroundColor?: string;
};

const Badge: FC<BadgeProps> = (props) => {
  const { children, textColor = "grey-5", backgroundColor = "grey-10" } = props;
  return (
    <span
      className={`inline-flex px-2 text-xs font-semibold leading-5 rounded-full cursor-pointer ${textColor} ${backgroundColor}`}
    >
      {children}
    </span>
  );
};

export default Badge;
