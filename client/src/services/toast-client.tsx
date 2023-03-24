import { toast } from "react-toastify";

import { Title, Text } from "@mantine/core";

export interface ErrorToastOptions {
  heading?: string;
}

class ToastClient {
  public static success(message: string, opts?: { heading?: string }) {
    const { heading = "Action dispatched successfully" } = opts || {};
    toast.success(
      <div className="ml-4">
        {heading && <Title fz="md">{heading}</Title>}
        <Text>{message}</Text>
      </div>
    );
  }

  public static error(messages: string | string[], opts?: ErrorToastOptions) {
    const { heading } = opts || {};
    if (typeof messages === "string" && !messages) return;
    if (Array.isArray(messages) && messages.length <= 0) return;

    toast.error(
      <div className="ml-4">
        {heading && <Title fz="md">{heading}</Title>}
        {typeof messages === "string" ? (
          <Text>{messages}</Text>
        ) : (
          <div className="mt-1">
            {messages.map((elm) => (
              <Text key={`${elm}-1`} mb={2}>
                {elm}
              </Text>
            ))}
          </div>
        )}
      </div>
    );
  }
}

export default ToastClient;
