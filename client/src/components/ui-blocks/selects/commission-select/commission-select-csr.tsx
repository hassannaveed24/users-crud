import { getDefaultSelectClassNames, getDefaultSelectStyles } from "@/constants/select-styles";
import React, { FC } from "react";
import ReactSelect from "react-select";

import { CommissionSelectProps } from "./types";
import CommissionSelectOption from "./commission-select-option";
import { commissions } from "@/data/commission/commission-types.data";

const CommissionSelect: FC<CommissionSelectProps> = (props) => {
  const { id, name, isDisabled = false, value, onChange, onBlur } = props;

  return (
    <ReactSelect
      id={id}
      placeholder="Select commission type"
      name={name}
      classNames={getDefaultSelectClassNames({
        menu: () => "min-w-[300px]",
        menuList: () => "!max-h-[none]",
      })}
      styles={getDefaultSelectStyles()}
      menuPortalTarget={document?.body}
      getOptionLabel={(opt) => opt.commissionName}
      getOptionValue={(opt) => opt.id}
      options={commissions}
      isSearchable={false}
      onBlur={onBlur}
      value={value}
      onChange={onChange}
      isDisabled={isDisabled}
      components={{ Option: CommissionSelectOption }}
    />
  );
};

export default CommissionSelect;
