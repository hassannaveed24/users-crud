import { createStyles, UnstyledButton } from "@mantine/core";
import React, { AriaRole, FC, PropsWithChildren, MouseEventHandler } from "react";

interface TabProps {
  active?: boolean;
  role?: AriaRole;
  onClick: MouseEventHandler<HTMLButtonElement>;
  className?: string;
}

const useTabStyles = createStyles((theme) => {
  return {
    root: {
      padding: "16px 4px",

      position: "relative",
      // marginBottom: "-2px",

      "& > div": {
        color: theme.colors.textColors[2],
      },
      borderBottom: `2px solid ${theme.colors.borderColors[1]}`,

      "&:hover, &[aria-current='true']": {
        "& > div": {
          color: theme.colors.textColors[0],
        },
        borderBottom: `2px solid ${theme.colors.textColors[0]}`,
      },
    },
  };
});

const Tab: FC<PropsWithChildren<TabProps>> = ({ active = false, children, role = "tab", onClick, className = "" }) => {
  const { cx, classes } = useTabStyles();
  return (
    <UnstyledButton
      className={cx(classes.root, "transition", "mt-1", className)}
      role={role}
      onClick={onClick}
      type="button"
      aria-current={active}
    >
      {children}
    </UnstyledButton>
  );
};

export default Tab;
