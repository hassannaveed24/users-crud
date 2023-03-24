import { getDefaultSelectClassNames, getDefaultSelectStyles } from "@/constants/select-styles";
import React, { FC } from "react";
import ReactSelect from "react-select";
import { SortIcons } from "@/utils/sorting-factory";
import IconControl from "@/components/ui-blocks/selects/components/controls/icon-control";
import { SortOption, SortSelectProps } from "./types";
import { allSortOptions } from "./constants";

const SortSelectCSR: FC<SortSelectProps> = ({ value, onChange }) => {
  const matchSortOption = (e: SortOption) => e.value === value;
  return (
    <ReactSelect
      isMulti={false}
      menuPortalTarget={document.body}
      styles={getDefaultSelectStyles()}
      classNames={getDefaultSelectClassNames({
        menu: () => "min-w-[150px]",
      })}
      components={{
        Control: IconControl,
      }}
      isSearchable={false}
      placeholder="Sort"
      options={allSortOptions}
      controlShouldRenderValue={false}
      value={allSortOptions.find(matchSortOption)}
      onChange={(opt) => {
        if (!opt) return;
        onChange(opt.value);
      }}
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      leadingIcon={SortIcons[value]}
    />
  );
};

export default SortSelectCSR;
