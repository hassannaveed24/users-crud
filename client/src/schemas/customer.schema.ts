import { z } from "zod";

export const CustomerSchema = z.object({
  id: z.string(),
  workspaceId: z.string(),
  fullName: z.string().nullish(),
  avatar: z.string().nullish(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export type ICustomer = z.infer<typeof CustomerSchema>;
