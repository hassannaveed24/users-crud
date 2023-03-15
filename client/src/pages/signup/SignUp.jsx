import React from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import Form from "./Form";

const SignUp = () => {
    return (
        <>
            <Helmet>
                <title>{`Sign Up | ${import.meta.env.VITE_APP_NAME}`}</title>
            </Helmet>
            <Container>
                <Row className="justify-content-center">
                    <Col md={8} lg={6} xl={5}>
                        <Card className="mt-4">
                            <Card.Body className="p-4">
                                <div className="text-center mt-2">
                                    <h5 className="text-primary">Create New Account</h5>
                                    <p className="text-muted">
                                        Get your free {import.meta.env.VITE_APP_NAME} account now
                                    </p>
                                </div>
                                <div className="p-2 mt-4">
                                    <Form />
                                </div>
                            </Card.Body>
                        </Card>
                        <div className="mt-4 text-center">
                            <p className="mb-0">
                                Already have an account ?{" "}
                                <Link to="/login" className="fw-semibold text-primary text-decoration-underline">
                                    {" "}
                                    Signin{" "}
                                </Link>{" "}
                            </p>
                        </div>
                    </Col>
                </Row>
            </Container>
        </>
    );
};

export default SignUp;
