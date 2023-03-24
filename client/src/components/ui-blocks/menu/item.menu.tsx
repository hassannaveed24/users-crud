import React, { FC, PropsWithChildren, DispatchWithoutAction } from "react";
import { createStyles } from "@mantine/core";
import cls from "classnames";

const useStyles = createStyles((theme) => {
  return {
    item: {
      fontSize: theme.fontSizes.sm,
      border: 0,
      backgroundColor: "transparent",
      outline: 0,
      width: "100%",
      textAlign: "left",
      textDecoration: "none",
      boxSizing: "border-box",
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      padding: "8px 12px",
      borderRadius: 0,
      color: theme.colors.textColors[2],
      ":hover, &[data-active='true']": {
        backgroundColor: theme.colors.grey[9],
      },
    },
  };
});

interface MenuItemProps {
  active?: boolean;
  id?: string;
  className?: string;
  onClick?: DispatchWithoutAction;
}

const MenuItem: FC<PropsWithChildren<MenuItemProps>> = ({ id, children, active = false, className = "", onClick }) => {
  const { classes } = useStyles();

  return (
    <div className="relative">
      <button
        id={id}
        type="button"
        tabIndex={-1}
        role="menuitem"
        data-menu-item="true"
        data-active={active}
        className={cls("relative", classes.item)}
        onClick={onClick}
      >
        <div className={cls("flex-1", className)}>{children}</div>
      </button>
    </div>
  );
};

export default MenuItem;
