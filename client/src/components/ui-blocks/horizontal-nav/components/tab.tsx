import { Text } from "@mantine/core";
import React, { FC, MouseEventHandler } from "react";
import GenericTab from "@/components/ui-blocks/buttons/tab";

const Tab: FC<{ onClick: MouseEventHandler<HTMLButtonElement>; children: string; active: boolean }> = ({
  active,
  onClick,
  children,
}) => {
  return (
    <GenericTab role="navigation" onClick={onClick} active={active}>
      <Text fw={500}>{children}</Text>
    </GenericTab>
  );
};

export default Tab;
