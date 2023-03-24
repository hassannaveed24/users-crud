import React from "react";
import { Components } from ".";
import { HorizontalNavSelectProps } from "./components/select";
import { useMediaQuery } from "@mantine/hooks";
import { Box } from "@mantine/core";

type HorizontalNavProps<T> = Omit<HorizontalNavSelectProps<T>, "show">;

const HorizontalNav = <T,>(props: HorizontalNavProps<T>) => {
  const { value, getOptionLabel, getOptionValue, onChange } = props;
  const sm = useMediaQuery("(max-width: 640px)");

  return (
    <>
      <Components.Select show={sm} {...props} />
      <Components.Container show={!sm}>
        {props.options.map((opt, i) => {
          const optionLabel = getOptionLabel(opt);
          const active = value ? getOptionValue(value) === getOptionValue(opt) : false;
          const isLastOption = i >= props.options.length - 1;
          return (
            <React.Fragment key={`${optionLabel}-${i}`}>
              <Components.Tab active={active} onClick={() => onChange(opt)}>
                {props.getOptionLabel(opt)}
              </Components.Tab>
              <Box
                sx={(theme) => ({
                  flex: isLastOption ? 1 : undefined,
                  width: !isLastOption ? 40 : undefined,
                  height: 2,
                  backgroundColor: theme.colors.borderColors[1],
                })}
              ></Box>
            </React.Fragment>
          );
        })}
      </Components.Container>
    </>
  );
};

export default HorizontalNav;
