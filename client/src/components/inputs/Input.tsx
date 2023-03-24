import React, { ChangeEvent } from "react";
import cls from "classnames";
import { useFormikContext } from "formik";
import Typography from "../ui-blocks/typography";
import { UpdateUserFormValues } from "@/data/user/update-user.data";
import { ErroredFieldLabel } from "@/utils/validation";

type AddonType = string | ((defautlClasses: string) => React.ReactNode);

type InputProps = {
  label?: string;
  name: string;
  autoCompleteId?: string;
  placeholder?: string;
  isRequired?: boolean;
  containerClassName?: string;
  prepend?: AddonType;
  prependClassName?: string;
  append?: AddonType;
  appendClassName?: string;
  type?: "text" | "number" | "email" | "password";
  as?: "input" | "textarea";
  text?: string | false;
  state?: "default" | "error" | "success";
  shouldValidate?: boolean;
  className?: string;
  value?: any;
  displayErrorOnLabel?: boolean;
  onChange?: () => void;
  onBlur?: () => void;
};

const defaultAddonClasses =
  "inline-flex items-center rounded-l-md border border-r-0 border-gray-300 bg-gray-50 px-3 text-gray-500 sm:text-sm";

export const InputClassNames =
  "block w-full min-w-0 flex-1 rounded bg-white border border-borderColors-1 focus:border-borderColors-1 py-2.5 px-3.5 sm:text-sm";

const Input = ({
  containerClassName = "",
  label,
  name,
  autoCompleteId,
  prepend,
  append,
  isRequired = false,
  placeholder = "",
  type = "text",
  as: CustomTag = "input",
  text,
  state = "default",
  className = "",
  displayErrorOnLabel = false,
}: InputProps) => {
  const formik = useFormikContext<UpdateUserFormValues>();

  const isTouched = (formik.touched as any)[name];

  const error = (formik.errors as any)[name];
  const isError = Boolean(error);

  const value = (formik.values as any)[name];
  const onChange = (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    event.preventDefault();
    const v = event.target.value;
    formik.setFieldValue(name, v);
  };

  const onBlur = () => {
    formik.setFieldTouched(name, true, true);
  };

  const fieldId = autoCompleteId || name;

  const commonAttributes = {
    name,
    id: fieldId,
    placeholder,
    autoComplete: autoCompleteId,
    value,
    onChange,
    onBlur,
    className: cls(
      InputClassNames,
      { "rounded-l-none": prepend },
      { "rounded-r-none": append },
      { "h-[38px]": CustomTag === "input" },
      className
    ),
  };
  const inputAttributes = {
    type,
  };
  const textareaAttributes = {};

  let attributes = { ...commonAttributes };

  if (CustomTag === "input") attributes = { ...attributes, ...inputAttributes };
  else if (CustomTag === "textarea") attributes = { ...attributes, ...textareaAttributes };

  const shouldShowError = !!isError && !!isTouched;

  return (
    <div className={cls(containerClassName)}>
      {label ? (
        <ErroredFieldLabel
          id={fieldId}
          name={name}
          append={isRequired ? <span className="text-textColors-red">*</span> : undefined}
        >
          {label}
        </ErroredFieldLabel>
      ) : null}
      <div className="flex rounded-md shadow-sm">
        {typeof prepend === "string" ? (
          <span className={defaultAddonClasses}>{prepend}</span>
        ) : (
          prepend?.(defaultAddonClasses)
        )}
        <CustomTag {...attributes} />
        {typeof append === "string" ? (
          <span className={defaultAddonClasses}>{append}</span>
        ) : (
          append?.(defaultAddonClasses)
        )}
      </div>
      {Boolean(shouldShowError && !displayErrorOnLabel) && Boolean(text) && (
        <p
          className={cls("mt-2 text-sm ", {
            "text-gray-500": state === "default" && !isError,
            "text-red-500": isError,
          })}
        >
          {shouldShowError ? error : text}
        </p>
      )}
    </div>
  );
};

export default Input;
