import { Switch } from "@headlessui/react";
import React, { FC, useState } from "react";
import _isNil from "lodash/isNil";
import cls from "classnames";

type OnChange = (_checked: boolean) => void;

type ToggleProps = {
  className?: string;
  label: string;
  isChecked?: boolean;
  onChange?: OnChange;
};

const Toggle: FC<ToggleProps> = ({ label, className = "", ...props }) => {
  const [$checked, $setChecked] = useState(false);

  const isChecked = _isNil(props.isChecked) ? $checked : props.isChecked;
  const handleChange = (_checked: boolean) => {
    if (!_isNil(props.onChange)) {
      props.onChange(_checked);
      return;
    }

    $setChecked(_checked);
  };

  return (
    <Switch
      checked={isChecked}
      onChange={handleChange}
      className={cls(
        "relative inline-flex items-center justify-center flex-shrink-0 w-10 h-5 rounded-full cursor-pointer group focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2",
        className
      )}
    >
      <span className="sr-only">{label}</span>
      <span aria-hidden="true" className="absolute w-full h-full bg-white rounded-md pointer-events-none" />
      <span
        aria-hidden="true"
        className={cls(
          "pointer-events-none absolute mx-auto h-4 w-9 rounded-full transition-colors duration-200 ease-in-out",
          { "bg-slate-7": isChecked, "bg-grey-9": !isChecked }
        )}
      />
      <span
        aria-hidden="true"
        className={cls(
          "pointer-events-none absolute left-0 inline-block h-5 w-5 transform rounded-full border border-grey-9 shadow ring-0 duration-200 ease-in-out transition-all",
          { "translate-x-5 bg-slate-1": isChecked, "translate-x-0 bg-white": !isChecked }
        )}
      />
    </Switch>
  );
};

export default Toggle;
