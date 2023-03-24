import { isNil } from "lodash";
import React, { Dispatch, FC } from "react";
import cls from "classnames";

interface CheckboxProps {
  className?: string;
  label: string;
  isChecked: boolean;
  onChange?: Dispatch<boolean>;
}

const Checkbox: FC<CheckboxProps> = ({ className = "", isChecked, label, onChange }) => {
  return (
    <input
      role="checkbox"
      aria-checked={isChecked}
      aria-describedby={label}
      type="checkbox"
      className={cls(
        "w-4 h-4 border-gray-300 rounded-full cursor-pointer text-blue-1 focus:ring-indigo-500",
        className
      )}
      checked={isChecked}
      onChange={(e) => onChange?.(e.target.checked)}
    />
  );
};

export default Checkbox;
