import { getIsPercentageCommission } from "@/data/commission/commission-types.data";
import {
  CreateWorkspaceCommission,
  CreateWorkspaceCommissionPayload,
  GetCreateWorkspaceCommissionPayload,
} from "@/data/commission/create-workspace-commission.data";
import { GetSelectedWorkspace } from "@/data/workspace/get-workspaces.data";
import { IWorkspaceRoleCommission } from "@/schemas/role.schema";
import store from "@/state/store";
import cuid from "cuid";
import { z } from "zod";

export const ConfigurableCommissionSchema = z
  .object({
    workspaceRoleCommissionId: z.string(),
    type: z.string(),
    value: z.string().refine((arg) => arg !== "", { message: "Please enter commission rate" }),
  })
  .refine(
    ({ type, value }) => {
      if (!getIsPercentageCommission(type)) return true;
      return Number(value) <= 100;
    },
    { message: "Invalid commission percentage", path: ["value"] }
  );

export type ConfigurableCommission<T = string> = Omit<z.infer<typeof ConfigurableCommissionSchema>, "value"> & {
  value: T;
};

export const SelectRoleCommissionsSchema = z.object({
  commissions: z
    .array(ConfigurableCommissionSchema, {
      required_error: "Workspace roles are required",
      invalid_type_error: "Workspace roles are invalid",
    })
    .min(1, { message: "Please attach workspace roles" }),
  permission: z.string({
    required_error: "Please select team permissions",
    invalid_type_error: "Please select team permissions",
  }),
});

export type SelectRoleCommissionsInput = z.infer<typeof SelectRoleCommissionsSchema>;

export interface SelectRoleCommissionsPayload {
  commissions: CreateWorkspaceCommissionPayload[];
  permission: { id: string; workspaceId: string; claimSecurityId: string } | undefined;
}

export const GetSelectRoleCommissionsPayload = (data: SelectRoleCommissionsInput) => {
  const { selectedWorkspaceId, allWorkspaces } = store.getState().workspace;
  const { workspaceRoleCommission, workspaceClaimSecurity } = GetSelectedWorkspace(selectedWorkspaceId, {
    allWorkspaces,
  });

  const matchUpdatedCommission = (e: ConfigurableCommission) => {
    const role = workspaceRoleCommission.find((r) => r.id === e.workspaceRoleCommissionId) as IWorkspaceRoleCommission;

    if (role.commission.commissionTypeId === e.type && role.commission.commissionValue === e.value) return false;

    return true;
  };

  const commissions = data.commissions.filter(matchUpdatedCommission).map(GetCreateWorkspaceCommissionPayload);

  const permission =
    workspaceClaimSecurity?.claimSecurityId !== data.permission
      ? {
          id: data.permission,
          workspaceId: selectedWorkspaceId,
          claimSecurityId: workspaceClaimSecurity?.claimSecurityId || cuid(),
        }
      : undefined;

  return {
    commissions,
    permission,
  } as SelectRoleCommissionsPayload;
};
