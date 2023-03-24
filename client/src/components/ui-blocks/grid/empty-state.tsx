import { Text, Button } from "@mantine/core";
import React, { FC } from "react";
import { INITIAL_INTERNAL_CONTEXT_VALUE } from "./context";
import { EmptyStateOptions } from "./types";

export type EmptyState = EmptyStateOptions | React.ReactElement;

const emptyState = INITIAL_INTERNAL_CONTEXT_VALUE.emptyState as EmptyStateOptions;

const EmptyState: FC<EmptyStateOptions> = (props) => {
  const { text = emptyState.text, onClick = emptyState.onClick, label = emptyState.label } = props;
  return (
    <div className="w-full h-[300px] flex flex-col gap-4 justify-center items-center rounded-b-sm">
      <Text>{text}</Text>
      <Button type="button" onClick={onClick}>
        {label}
      </Button>
    </div>
  );
};

export default EmptyState;
