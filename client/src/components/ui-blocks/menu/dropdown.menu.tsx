import React, { FC, PropsWithChildren } from "react";
import cls from "classnames";
import { createStyles } from "@mantine/core";

interface MenuDropdownProps {
  id: string;
  targetId: string;
  isSubmenu?: boolean;
  width?: number;
}

interface StyleProps {
  width: number;
}

const useStyles = createStyles<string, StyleProps>((theme, props) => {
  return {
    dropdown: {
      backgroundColor: theme.white,
      background: theme.white,
      border: "1px solid #e9ecef",
      borderRadius: 6,
      padding: "4px 0 !important",
      boxShadow: theme.shadows.sm,

      transitionProperty: "opacity",
      transitionDuration: "150ms",
      transitionTimingFunction: "ease",
      opacity: 1,
      zIndex: 300,
      width: props.width,
      marginTop: 4,
      marginLeft: 4,
      position: "relative",
    },
  };
});

const MenuDropdown: FC<PropsWithChildren<MenuDropdownProps>> = ({
  width = 128,
  id,
  targetId,
  children,
  isSubmenu = false,
}) => {
  const { classes } = useStyles({ width });

  return (
    <div
      className={cls(classes.dropdown, { "!mt-[-5px]": isSubmenu })}
      id={`${id}-dropdown`}
      aria-labelledby={targetId}
      role="menu"
      tabIndex={-1}
    >
      <div tabIndex={-1} data-menu-dropdown="true" data-autofocus="true" style={{ outline: 0 }}>
        {children}
      </div>
    </div>
  );
};

export default MenuDropdown;
