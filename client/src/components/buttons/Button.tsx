import cls from "classnames";
import React from "react";
import Spinner from "../misc/spinner";

const LeadingIcon: React.FC<{ icon: React.ReactNode | undefined | null }> = ({ icon }) => {
  if (!icon) return null;
  return <>{icon}</>;
};

export type ButtonVariantType = "primary" | "white" | "danger";

type Props = {
  type?: "button" | "submit";
  variant?: ButtonVariantType;
  className?: string;
  children: string | React.ReactNode;
  onClick?: (event: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => void;
  as?: "button" | "a" | "span";
  href?: string;
  shape?: "round" | "circle";
  leadingIcon?: React.ReactNode;
  trailingIcon?: React.ReactNode;
  disabled?: boolean;
  isLoading?: boolean;
};

const Button: React.FunctionComponent<Props> = ({
  type = "button",
  variant = "primary",
  className = "",
  children,
  onClick = () => {},
  as: CustomTag = "button",
  shape = "round",
  leadingIcon,
  trailingIcon = <></>,
  disabled = false,
  isLoading = false,
  ...rest
}) => {
  const isButton = CustomTag === "button";
  return (
    <CustomTag
      type={isButton ? type : undefined}
      onClick={isButton ? onClick : undefined}
      disabled={isLoading || disabled}
      className={cls(
        " flex justify-center gap-2 items-center border py-[9px] text-sm font-medium shadow-sm focus:outline-none focus:ring-2 focus:ring-brand focus:ring-offset-2 transition disabled:cursor-not-allowed disabled:opacity-25",
        { "border-transparent bg-primary disabled:bg-primary text-white": variant === "primary" },
        {
          "border-transparent bg-backgroundColors-red disabled:bg-backgroundColors-red text-textColors-red":
            variant === "danger",
        },
        {
          "border-borderColors-1 bg-white disabled:bg-white text-textColors-1 hover:bg-backgroundColors-neutral-2":
            variant === "white",
        },
        { "rounded px-[17px]": shape === "round" },
        { "rounded-full px-[9px]": shape === "circle" },
        className
      )}
      {...rest}
    >
      {isLoading ? (
        <Spinner
          className={cls("w-3 h-3 border mr-2", {
            "text-white": variant === "primary",
            "text-brand": variant === "white",
          })}
        />
      ) : (
        <LeadingIcon icon={leadingIcon} />
      )}
      {children}
      {trailingIcon}
    </CustomTag>
  );
};

export default Button;
