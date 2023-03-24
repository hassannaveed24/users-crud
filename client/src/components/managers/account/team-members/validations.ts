import { WorkspacePermissionSchema } from "@/schemas/permission.schema";
import { z } from "zod";

export const InviteMembersSchema = z.object({
  email: z
    .string({
      required_error: "Please enter the member's email",
      invalid_type_error: "Please enter the member's email",
    })
    .trim()
    .min(1, "Please enter the member's email")
    .email("Please enter a valid email"),
  permission: WorkspacePermissionSchema,
  roles: z.array(z.string()).min(1, { message: "Please select member roles" }),
});
