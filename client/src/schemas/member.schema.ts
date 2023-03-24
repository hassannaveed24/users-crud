import { z } from "zod";
import { PermissionSchema } from "./permission.schema";
import { WorkspaceMemberRoleCommissionSchema } from "./role.schema";

const MemberSchema = z.object({
  id: z.string(),
  memberName: z.string(),
  memberEmail: z.string(),
  memberAvatar: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export const WorkspaceMemberSchema = z.object({
  id: z.string(),
  memberId: z.string(),
  workspacePermissionId: z.string(),
  permissionId: z.string(),
  isCustomPermission: z.boolean(),
  member: MemberSchema,
  workspaceMemberRole: z.array(WorkspaceMemberRoleCommissionSchema),
  permission: PermissionSchema,
});

export type IWorkspaceMember = z.infer<typeof WorkspaceMemberSchema>;
