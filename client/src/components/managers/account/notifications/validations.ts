import { z } from "zod";
import { NotificationChannels } from "./types";

export const SelectNotificationsSchema = (() => {
  const dealNotificationsSchema = z.array(z.nativeEnum(NotificationChannels), {
    invalid_type_error: "Please select notifications for deals lost",
    required_error: "Please select notifications for deals lost",
  });
  return z.object({
    won: dealNotificationsSchema,
    lost: dealNotificationsSchema,
  });
})();
