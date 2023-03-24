import { useFormikContext } from "formik";
import { DispatchWithoutAction, FC, PropsWithChildren, ReactNode } from "react";
import { SafeParseReturnType, ZodEffects, ZodError, ZodObject, ZodRawShape } from "zod";
import cls from "classnames";
import ErrorManager from "@/services/error-manager";
import { Text } from "@mantine/core";
import { get } from "lodash";

export const validateZodSchema = async <T,>(
  schema: ZodObject<ZodRawShape>,
  data: T,
  opts?: { onError?: (error: ZodError) => void }
) => {
  const { onError = ErrorManager.handleZodError } = opts || {};

  const result = await schema.safeParseAsync(data);
  if (!result.success) {
    onError?.(result.error);
    return { shouldTerminate: true, result: result as SafeParseReturnType<Required<T>, Required<T>> } as const;
  }

  return { shouldTerminate: false, result: result as SafeParseReturnType<Required<T>, Required<T>> } as const;
};

export const validateFromZod =
  (zodSchema: ZodObject<ZodRawShape> | ZodEffects<ZodObject<ZodRawShape>>) => (values: object) => {
    const errors: any = {};

    const zodResponse = zodSchema.safeParse(values);
    if (zodResponse.success) return errors;

    zodResponse.error.issues.forEach((issue) => {
      const errorPath = issue.path.join(".");
      errors[errorPath] = issue.message;
    });

    return errors;
  };

export const FieldError: FC<{
  name: string;
  children: (error: string | undefined, meta: { isError: boolean }) => React.ReactElement;
}> = ({ name, children }) => {
  const formik = useFormikContext();
  const isTouched = Boolean(get(formik.touched, name));
  const error = get(formik.errors, name);
  const isError = Boolean(error);
  const shouldShowError = isTouched && isError;

  return children(error, { isError: shouldShowError });
};

interface ErroredFieldLabelProps {
  name: string;
  id: string;
  className?: string;
  append?: ReactNode | undefined;
  onClick?: DispatchWithoutAction;
}

interface FieldLabelProps extends Omit<ErroredFieldLabelProps, "name"> {
  isError?: boolean;
  error?: string;
}

export const FieldLabel: FC<PropsWithChildren<FieldLabelProps>> = (props) => {
  const { id, className = "", onClick, isError = false, error = "", children, append } = props;
  return (
    <Text
      component="label"
      color={!isError ? "textColors.1" : "red"}
      htmlFor={id}
      mb={8}
      fw={500}
      display="inline-block"
      className={cls(className, { "cursor-pointer": onClick })}
      onClick={onClick}
    >
      {isError ? error : children} {append && <div className="inline-block">{append}</div>}
    </Text>
  );
};

export const ErroredFieldLabel: FC<PropsWithChildren<ErroredFieldLabelProps>> = (props) => {
  return (
    <FieldError name={props.name}>
      {(error, { isError }) => {
        return <FieldLabel {...props} isError={isError} error={error} />;
      }}
    </FieldError>
  );
};
