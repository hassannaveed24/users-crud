import { getDefaultSelectClassNames, getDefaultSelectStyles } from "@/constants/select-styles";
import ReactSelect, { GetOptionLabel, GetOptionValue } from "react-select";
import { Box } from "@mantine/core";
import { createStyles } from "@mantine/core";
import { Dispatch } from "react";

export interface HorizontalNavSelectProps<T> {
  show: boolean;
  id: string;
  label: string;
  options: T[] | readonly T[];
  value: T | undefined;
  onChange: Dispatch<T>;
  getOptionLabel: GetOptionLabel<T>;
  getOptionValue: GetOptionValue<T>;
}

const useStyles = createStyles(() => {
  return {
    root: {
      display: "block",
      width: "100%",
      "&[aria-hidden='true']": {
        display: "none",
      },
    },
  };
});

const TabSelect = <T,>({ label, show, onChange, ...props }: HorizontalNavSelectProps<T>) => {
  const { classes } = useStyles();

  return (
    <Box aria-hidden={!show} className={classes.root}>
      <label className="sr-only">{label}</label>
      <ReactSelect
        isSearchable={false}
        isMulti={false}
        isClearable={false}
        classNames={getDefaultSelectClassNames()}
        styles={getDefaultSelectStyles()}
        onChange={(opt) => {
          if (!opt) return null;
          onChange(opt);
        }}
        {...props}
      />
    </Box>
  );
};

export default TabSelect;
