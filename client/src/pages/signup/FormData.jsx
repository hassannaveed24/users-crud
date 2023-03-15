import { Button } from "react-bootstrap";
import FormikInput from "../../components/common/FormikInput";

const FormData = () => {
    return (
        <>
            <FormikInput isRequired={true} name={"name"} label={"Name"} placeholder="Enter Full Name" />
            <FormikInput isRequired={true} name={"email"} label={"Email Address"} placeholder="Enter email" />
            <div className="mt-4">
                <Button type="submit" variant="success" className="w-100">
                    Sign Up
                </Button>
            </div>
        </>
    );
};

export default FormData;
