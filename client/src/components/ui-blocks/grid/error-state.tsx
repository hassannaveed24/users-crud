import { Title, Text } from "@mantine/core";
import React, { FC } from "react";
import { ErrorStateOptions } from "./types";

export type ErrorState = ErrorStateOptions | React.ReactElement;

const ErrorState: FC<ErrorStateOptions> = (props) => {
  const { title, description } = props;
  return (
    <div className="w-full h-[300px] flex flex-col justify-center items-center rounded-b-sm">
      <Title>{title}</Title>
      <Text>{description}</Text>
    </div>
  );
};

export default ErrorState;
