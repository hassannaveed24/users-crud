import { Helmet } from "react-helmet";
import { Container, Row, Col , Card} from "react-bootstrap";
import Form from "./Form";
import { Link } from "react-router-dom";

const Login = () => {
    return (
        <>
            <Helmet>
                <title>{`Login | ${import.meta.env.VITE_APP_NAME}`}</title>
            </Helmet>
            <Container>
                <Row className="justify-content-center">
                    <Col lg={12}>
                        <p className="mt-3 fs-15 fw-medium">{`Welcome to ${import.meta.env.VITE_APP_NAME}`}</p>
                    </Col>
                </Row>
                <Row className="justify-content-center">
            <Col md={8} lg={6} xl={5}>
                <Card className="mt-4">
                    <Card.Body className="p-4">
                        <div className="text-center mt-2">
                            <h5 className="text-primary">Welcome Back !</h5>
                            <p className="text-muted">Sign in to continue to {import.meta.env.VITE_APP_NAME}.</p>
                        </div>
                        <div className="p-2 mt-4">
                                    <Form />
                                </div>
                    </Card.Body>
                </Card>
                <div className="mt-4 text-center">
                    <p className="mb-0">
                        Don't have an account ?{" "}
                        <Link to="/register" className="fw-semibold text-primary text-decoration-underline">
                            {" "}
                            Signup{" "}
                        </Link>{" "}
                    </p>
                </div>
            </Col>
        </Row>
            </Container>
        </>
    );
};

export default Login;
