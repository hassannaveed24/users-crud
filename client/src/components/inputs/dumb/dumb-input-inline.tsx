import React, { useState } from "react";
import cls from "classnames";
import { createStyles } from "@mantine/core";

type LeadingIconProps = {
  icon: React.ReactNode;
  isFocused: boolean;
};

const LeadingIcon: React.FC<LeadingIconProps> = ({ icon, isFocused }) => {
  if (!icon) return null;
  return (
    <div className={cls("ml-3 flex justify-center items-center", { "text-gray-300  focus:text-brand": isFocused })}>
      {icon}
    </div>
  );
};

type DumbInputProps = {
  inputProps: React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;
  text?: string | false;
  state?: "default" | "error" | "success";
  className?: string;

  leadingIcon?: React.ReactNode | undefined;
};

const useStyles = createStyles((theme) => {
  return {
    shadow: {
      boxShadow: theme.shadows.sm,
    },
  };
});

const DumbInputInline: React.FC<DumbInputProps> = ({ className = "", leadingIcon, text, state, inputProps }) => {
  const [isFocused, setIsFocused] = useState(false);
  const { classes } = useStyles();

  const handleFocus = (event: React.FocusEvent<HTMLInputElement>) => {
    inputProps.onFocus?.(event);
    setIsFocused(true);
  };

  const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    inputProps.onBlur?.(event);
    setIsFocused(false);
  };

  return (
    <>
      <div
        className={cls(
          "flex border rounded border-borderColors-1 transition-colors text-textColors-3",
          classes.shadow,
          className
        )}
      >
        <LeadingIcon icon={leadingIcon} isFocused={isFocused} />
        <input
          id={inputProps.name}
          autoComplete={inputProps.name}
          type="text"
          {...inputProps}
          onBlur={handleBlur}
          onFocus={handleFocus}
          className={cls("block w-full min-w-0 flex-1 rounded border-none sm:text-sm", inputProps.className)}
        />
      </div>
      {text && (
        <p
          className={cls("mt-2 text-sm ", {
            "text-gray-500": state === "default",
            "text-red-500": state === "error",
          })}
        >
          {text}
        </p>
      )}
    </>
  );
};

export default DumbInputInline;
