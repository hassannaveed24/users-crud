import { createStyles } from "@mantine/core";
import { Box } from "@mantine/core";
import React, { FC, PropsWithChildren } from "react";

const useStyles = createStyles(() => {
  return {
    root: {
      overflowX: "auto",
      minWidth: 650,
      width: "100%",
      display: "inline-flex",
      alignItems: "end",

      "&[aria-hidden='true']": {
        display: "none",
      },
    },
  };
});

const TabsContainer: FC<PropsWithChildren<{ show: boolean }>> = ({ show, children }) => {
  const { classes } = useStyles();

  return (
    <Box aria-hidden={!show} className={classes.root}>
      {children}
    </Box>
  );
};

export default TabsContainer;
