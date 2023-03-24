import { z } from "zod";
import { NotificationSchema } from "./notification.schema";
import { ClaimSecurityPermissionSchema, WorkspacePermissionSchema } from "./permission.schema";
import { WorkspaceRoleCommissionSchema } from "./role.schema";

export enum WorkspaceType {
  MASTER = "MASTER",
  MEMBER = "MEMBER",
}

export const WorkspaceSchema = z.object({
  id: z.string(),
  workspaceName: z.string(),
  workspaceType: z.union([z.nativeEnum(WorkspaceType), z.literal(null)]),
  workspaceOwnerId: z.string(),
  workspaceLogo: z.string(),
  workspaceFavicon: z.string(),
  workspaceRoleCommission: z.array(WorkspaceRoleCommissionSchema),
  workspacePermission: z.array(WorkspacePermissionSchema),
  notification: NotificationSchema.nullish(),
  workspaceClaimSecurity: ClaimSecurityPermissionSchema.nullish(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export type IWorkspace = z.infer<typeof WorkspaceSchema>;
