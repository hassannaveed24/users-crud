import { Spinner } from "react-bootstrap";

const Loader = ({ size = "", variant = "primary", ...spinnerProps }) => {
    return (
        <Spinner size={size} variant={variant} {...spinnerProps}>
            <span className="visually-hidden">Loading...</span>
        </Spinner>
    );
};

export default Loader;
