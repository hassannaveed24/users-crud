import React from "react";
import { Card, Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Formik, Form as FormikForm } from 'formik';
import * as Yup from "yup";
import FormData from "./FormData";
import { useMutation } from "react-query";
import { post } from "../../utils/server";
import AlertService from "../../services/Alert";


const Form = () => {

    const loginMutation = useMutation(
        (payload) => {
            const response = post(`/auth/login`, payload);
            return response;
        },
        {
            onSuccess: (data) => {
                
            },
            onError: (err) => {
                AlertService.error(err, { heading: "Unable to register" });
            },
        },
    );

    const handleSubmit = (values) => {
        console.log(values)
        loginMutation.mutate(values)
    }
    return (
        <Formik
        initialValues={{
            
            email: "",
            password: ''
        }}
        validationSchema={Yup.object({
            password: Yup.string().required('Enter password')
                ,
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
