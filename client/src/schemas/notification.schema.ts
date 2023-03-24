import { z } from "zod";

export const NotificationSchema = z.object({
  id: z.string(),
  workspaceId: z.string(),
  wdEmail: z.boolean(),
  wdPhone: z.boolean(),
  wdWeb: z.boolean(),
  ldEmail: z.boolean(),
  ldPhone: z.boolean(),
  ldWeb: z.boolean(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export type INotification = z.infer<typeof NotificationSchema>;
