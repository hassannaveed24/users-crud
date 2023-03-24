import { FormikProps } from "formik";
import { ChangeEvent } from "react";

export type FieldProps = {
  field: {
    value: any;
    name: string;
    onBlur: (event?: ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | unknown) => void;
    onChange: (event?: ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | unknown) => void;
  };
  form: FormikProps<object>;
  meta: {
    value: any;
    error: string;
    touched: boolean;
    initialValue: unknown;
    initialTouched: boolean;
  };
};
