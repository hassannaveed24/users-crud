import { When } from "react-if";
import { toast } from "react-toastify";

export default class AlertService {
    static success(message, opts) {
        const { heading = "" } = opts || {};

        toast.success(
            <>
                <When condition={heading}>
                    <b>{heading}</b>
                    <br />
                </When>
                <When condition={message}>
                    <p>{message}</p>
                </When>
            </>,
        );
    }
    static error(error, opts) {
        const { heading = "" } = opts || {};
        let messages = [];
        if (error instanceof Error) {
            if (error.response?.data?.data) {
                if (Array.isArray(error.response.data.data)) {
                    messages = error.response.data.data;
                } else {
                    messages = [error.response.data.data];
                }
            } else {
                messages = [error.message];
            }
        } else if (typeof error === "string") {
            //single error message in form of string
            messages = [error];
        } else if (Array.isArray(error)) {
            // Array of strings
            messages = error;
        } else {
            throw new Error("Invalid Error type");
        }

        toast.error(
            <>
                <When condition={heading}>
                    <b>{heading}</b>
                    <br />
                </When>

                {messages.map((message, index) => (
                    <p key={`message-${index}`}>{message}</p>
                ))}
            </>,
        );
    }
}
