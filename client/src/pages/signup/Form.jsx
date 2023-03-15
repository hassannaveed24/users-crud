import React from "react";
import { Formik, Form as FormikForm } from "formik";
import * as Yup from "yup";
import FormData from "./FormData";
import { useMutation } from "react-query";
import { post } from "../../utils/server";

import AlertService from "../../services/Alert";

const Form = () => {
    const registerMutation = useMutation(
        (payload) => {
            const response = post(`/auth/register`, payload);
            return response;
        },
        {
            onSuccess: (data) => {
                AlertService.success('Successfully registered, please check your email to continue')
            },
            onError: (err) => {
                AlertService.error(err, { heading: "Unable to register" });
            },
        },
    );
    const handleSubmit = (values) => {
        registerMutation.mutate(values);
    };
    return (
        <Formik
            initialValues={{
                name: "",
                email: "",
            }}
            validationSchema={Yup.object({
                name: Yup.string()
                    .required("Name is Required")
                    .matches(/^[a-zA-Z ]*$/, "Invalid name")
                    .max(25, "Maximum 25 characters are allowed"),
                email: Yup.string().email("Invalid email").required("Email is required"),

                // .test(
                //     'Unique Email',
                //     'Email already exists', // <- key, message
                //     function (value) {
                //         return new Promise((resolve, reject) => {
                //             get(`/member/check-email/${value}`).then((data) => {
                //                 if (data?.exists) {
                //                     resolve(false);
                //                 } else {
                //                     resolve(true);
                //                 }
                //             });
                //         });
                //     },
                // ),
            })}
            onSubmit={handleSubmit}>
            <FormikForm>
                <FormData />
            </FormikForm>
        </Formik>
    );
};

export default Form;
