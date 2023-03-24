import { ErroredFieldLabel } from "@/utils/validation";
import React, { Dispatch, FC, FocusEventHandler } from "react";
import cls from "classnames";
import DumbInputInline from "@/components/inputs/dumb/dumb-input-inline";
import Typography from "@/components/ui-blocks/typography";

interface CommissionRateInputProps {
  id: string;
  name: string;
  label?: string;
  commissionUnit: "$" | "%";
  isDisabled?: boolean;
  value: string;
  onChange: Dispatch<string>;
  onBlur?: FocusEventHandler<HTMLInputElement>;
}

const CommissionRateInput: FC<CommissionRateInputProps> = (props) => {
  const { id, name, label = "Rate", commissionUnit, isDisabled, value, onChange, onBlur } = props;

  return (
    <>
      <ErroredFieldLabel id={id} name={name}>
        {label}
      </ErroredFieldLabel>
      <div className={cls("relative", { "opacity-25": isDisabled })}>
        <Typography.Body className="absolute pl-3 py-[9px]">{commissionUnit}</Typography.Body>
        <DumbInputInline
          inputProps={{
            style: { paddingLeft: "calc(18px + 1ch)" },
            type: "number",
            name,
            value,
            onBlur,
            disabled: isDisabled,
            onChange: (e) => {
              onChange(e.target.value);
            },
          }}
        />
      </div>
    </>
  );
};

export default CommissionRateInput;
