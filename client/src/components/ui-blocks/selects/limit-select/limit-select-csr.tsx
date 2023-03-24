import { getDefaultSelectClassNames, getDefaultSelectStyles } from "@/constants/select-styles";
import React, { FC } from "react";
import ReactSelect from "react-select";
import { Button } from "@mantine/core";
import { LimitOption, LimitSelectProps } from "./types";
import { allLimitOptions } from "./constants";

const LimitSelectCSR: FC<LimitSelectProps> = ({ value, onChange }) => {
  const matchLimit = (e: LimitOption) => e.value === value;
  return (
    <div className="inline-flex">
      <Button variant="default" className="!rounded-r-none !h-[38px]" fw={500}>
        Rows per page
      </Button>
      <ReactSelect
        menuPortalTarget={document.body}
        isSearchable={false}
        styles={getDefaultSelectStyles()}
        classNames={getDefaultSelectClassNames({
          control: () => "!rounded-l-none !h-[38px] !border-l-transparent",
        })}
        options={allLimitOptions}
        getOptionValue={(opt) => opt.id.toString()}
        getOptionLabel={(opt) => opt.value.toString()}
        value={allLimitOptions.find(matchLimit)}
        onChange={(opt) => {
          if (!opt) return;
          onChange(opt.value);
        }}
      />
    </div>
  );
};

export default LimitSelectCSR;
