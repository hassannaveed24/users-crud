import React, { FC, PropsWithChildren } from "react";
import cls from "classnames";

type CardProps = { className?: string };

const Card: FC<PropsWithChildren<CardProps>> = ({ className = "", children }) => {
  return (
    <div className={cls("p-6 bg-white border border-borderColors-2 rounded sm:overflow-hidden", className)}>
      {children}
    </div>
  );
};

export default Card;
