import { AxiosError } from "axios";
import { ZodError } from "zod";
import ToastClient, { ErrorToastOptions } from "./toast-client";

class ErrorManagerClient {
  handleError(error: Error | AxiosError, opts?: ErrorToastOptions) {
    let messages: string | string[] = error.message;
    if (error instanceof AxiosError) {
      messages =
        error.response?.data.message || typeof error.response?.data === "string"
          ? error.response?.data.message
          : error.message;
    }

    ToastClient.error(messages, opts);
  }

  handleZodError(error: ZodError, opts?: ErrorToastOptions) {
    const mappedErrorPaths: string[] = [];
    const messages: string[] = [];
    error.errors.forEach((e) => {
      const normalizedPath = e.path.join(".");
      if (mappedErrorPaths.includes(normalizedPath)) return;

      mappedErrorPaths.push(normalizedPath);
      messages.push(e.message);
    });
    ToastClient.error(messages, opts);
  }
}

const ErrorManager = new ErrorManagerClient();

export default ErrorManager;
