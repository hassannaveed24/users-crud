import { z } from "zod";
import { CommissionSchema } from "./commission.schema";

const RoleCommissionSchema = z.object({
  id: z.string(),
  salesRoleId: z.string(),
  commissionId: z.string(),
  commission: CommissionSchema,
  salesRole: z.object({
    id: z.string(),
    roleType: z.string(),
    roleName: z.string(),
    createdAt: z.string(),
    updatedAt: z.string(),
  }),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export const WorkspaceRoleCommissionSchema = RoleCommissionSchema.extend({
  workspaceId: z.string(),
});

export type IWorkspaceRoleCommission = z.infer<typeof WorkspaceRoleCommissionSchema>;

export const WorkspaceMemberRoleCommissionSchema = RoleCommissionSchema.extend({
  isActive: z.boolean(),
  workspaceMemberId: z.string(),
  isCustomCommission: z.boolean(),
});

export type IWorkspaceMemberRoleCommission = z.infer<typeof WorkspaceMemberRoleCommissionSchema>;
