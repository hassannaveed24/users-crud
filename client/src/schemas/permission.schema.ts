import { z } from "zod";

export const PermissionSchema = z.object(
  {
    id: z.string(),
    permissionType: z.string(),
    homeDashboard: z.boolean(),
    setterDashboard: z.boolean(),
    closerDashboard: z.boolean(),
    fbDashboard: z.boolean(),
    createdAt: z.string(),
    updatedAt: z.string(),
  },
  { required_error: "Please select member permissions", invalid_type_error: "Please select member permissions" }
);

export type IPermission = z.infer<typeof PermissionSchema>;

export const WorkspacePermissionSchema = z.object(
  {
    id: z.string(),
    workspaceId: z.string(),
    permissionId: z.string(),
    permission: PermissionSchema,
    createdAt: z.string(),
    updatedAt: z.string(),
  },
  { required_error: "Please select member permission", invalid_type_error: "Please select member permission" }
);

export type IWorkspacePermission = z.infer<typeof WorkspacePermissionSchema>;

export const ClaimSecurityPermissionSchema = z.object({
  id: z.string(),
  workspaceId: z.string(),
  claimSecurityId: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export type IClaimSecurityPermission = z.infer<typeof ClaimSecurityPermissionSchema>;
