import React, { FC } from "react";
import cls from "classnames";

type ReactHTMLElement<T> = React.DetailedHTMLProps<React.HTMLAttributes<T>, T>;

type TypographyProps<T> = T & {
  children: React.ReactNode | ((props: void) => React.ReactNode);
};

const Title: FC<
  TypographyProps<
    ReactHTMLElement<HTMLHeadingElement> & {
      as?: "h1" | "h2" | "h3";
    }
  >
> = ({ as: Tag = "h2", children, className = "", ...rest }) => {
  return (
    <Tag {...rest} className={cls("text-lg font-medium text-textColors-1 leading-7", className)}>
      {typeof children === "function" ? children() : children}
    </Tag>
  );
};

const Body: FC<TypographyProps<ReactHTMLElement<HTMLParagraphElement>>> = ({ children, className = "", ...rest }) => {
  return (
    <p {...rest} className={cls("text-sm text-textColors-3 leading-5", className)}>
      {typeof children === "function" ? children() : children}
    </p>
  );
};

const Typography = { Title, Body };

export default Typography;
