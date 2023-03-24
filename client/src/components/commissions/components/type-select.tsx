import { ErroredFieldLabel } from "@/utils/validation";
import React, { FC, FocusEventHandler } from "react";
import { ActionMeta, OnChangeValue } from "react-select";
import { CommissionOptions } from "../types";
import CommissionSelect from "@/components/ui-blocks/selects/commission-select";
import { commissions } from "@/data/commission/commission-types.data";

type Commission = typeof commissions[number];

interface CommissionTypeSelectProps extends CommissionOptions<true> {
  label?: string;
  isDisabled: boolean;
  value: Commission | undefined;
  onChange: (newValue: OnChangeValue<Commission, false>, actionMeta: ActionMeta<Commission>) => void;
  onBlur: FocusEventHandler<HTMLInputElement>;
}

const CommissionTypeSelect: FC<CommissionTypeSelectProps> = (props) => {
  const { name, label = "Type", isDisabled, value, onChange, onBlur } = props;

  return (
    <>
      <ErroredFieldLabel name={name} id={name}>
        {label}
      </ErroredFieldLabel>

      <CommissionSelect
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        isDisabled={isDisabled}
      />
    </>
  );
};

export default CommissionTypeSelect;
