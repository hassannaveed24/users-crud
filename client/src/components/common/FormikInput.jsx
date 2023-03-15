import { ErrorMessage, Field } from "formik";
import React from "react";
import { Form, InputGroup } from "react-bootstrap";
import cls from "classnames";
import { When } from "react-if";
import Loader from "./Loader.jsx";

const FormikInput = ({
    isRequired = false,
    label = "",
    name = "",
    className = "",
    isLoading = false,
    ...inputProps
}) => {
    return (
        <>
            <Field name={name}>
                {({ field, meta }) => {
                    return (
                        <>
                            <Form.Group className="mb-3">
                                <Form.Label>
                                    {label} {isRequired && <span className="text-danger">*</span>}
                                </Form.Label>
                                <InputGroup>
                                    <Form.Control
                                        {...field}
                                        {...inputProps}
                                        className={cls("form-control", className, {
                                            "border-danger": meta.touched && meta.error,
                                            "border-gray-300": !(meta.touched && meta.error),
                                        })}
                                    />

                                    <When condition={isLoading}>
                                        <InputGroup.Text>
                                            <Loader size="sm" />
                                        </InputGroup.Text>
                                    </When>
                                </InputGroup>
                                <ErrorMessage name={field.name}>
                                    {(msg) => <span className="text-danger">{msg}</span>}
                                </ErrorMessage>
                            </Form.Group>
                        </>
                    );
                }}
            </Field>
        </>
    );
};

export default FormikInput;
