import { QueryKeys } from "@/constants/query-keys";
import { IWorkspaceMember } from "@/schemas/member.schema";
import { IWorkspacePermission, WorkspacePermissionSchema } from "@/schemas/permission.schema";
import store from "@/state/store";
import { HashMap, Nullable } from "@/types/misc.type";
import { ValidatedAPI } from "@/utils/api";
import { z } from "zod";
import { UpdatePaginatedCache } from "../cache.data";
import { getIsPercentageCommission } from "../commission/commission-types.data";
import { GetSelectedWorkspace } from "../workspace/get-workspaces.data";

export interface EditWorkspaceMemberFormValues {
  permission: Nullable<IWorkspacePermission>;
  roles: HashMap<ConfigurableRole>;
  isCustomPermission: boolean;
  homeDashboard: boolean;
  setterDashboard: boolean;
  closerDashboard: boolean;
  fbDashboard: boolean;
}

export const ConfigurableRoleSchema = z
  .object({
    salesRoleId: z.string(),
    commissionTypeId: z.string(),
    commissionValue: z.string().refine((arg) => arg !== "", { message: "Please enter commission rate" }),
    isCustomCommission: z.boolean(),
  })
  .refine(
    ({ commissionTypeId, commissionValue }) => {
      if (!getIsPercentageCommission(commissionTypeId)) return true;
      return Number(commissionValue) <= 100;
    },
    { message: "Invalid commission percentage", path: ["value"] }
  );

export type ConfigurableRole = z.infer<typeof ConfigurableRoleSchema>;

export const EditMemberSchema = z.object({
  permission: WorkspacePermissionSchema,
  roles: z.array(ConfigurableRoleSchema).min(1, { message: "Please attach atleast one role" }),
  isCustomPermission: z.boolean({
    required_error: "Please configure custom permission",
    invalid_type_error: "Please configure custom permission",
  }),
  homeDashboard: z.boolean({
    required_error: "Please configure home dashboard permissions",
    invalid_type_error: "Please configure home dashboard permissions",
  }),
  setterDashboard: z.boolean({
    required_error: "Please configure setter dashboard permissions",
    invalid_type_error: "Please configure setter dashboard permissions",
  }),
  closerDashboard: z.boolean({
    required_error: "Please configure closer dashboard permissions",
    invalid_type_error: "Please configure closer dashboard permissions",
  }),
  fbDashboard: z.boolean({
    required_error: "Please configure facebook ads dashboard permissions",
    invalid_type_error: "Please configure facebook ads dashboard permissions",
  }),
});

export type EditMemberInput = z.infer<typeof EditMemberSchema>;

export interface EditMemberRequest extends Omit<IWorkspaceMember, "member"> {
  workspaceId: string;
}

export interface EditMemberResponse {
  id: string;
  memberId: string;
  permissionId: string;
  workspaceId: string;
  workspacePermissionId: string;
  createdAt: string;
  updatedAt: string;
}

export const GetEditMemberRequest = (values: EditMemberInput, member: IWorkspaceMember) => {
  const { allWorkspaces, selectedWorkspaceId } = store.getState().workspace;
  const selectedWorkspace = GetSelectedWorkspace(selectedWorkspaceId, { allWorkspaces });

  const activeRoleIds = values.roles.map((e) => e.salesRoleId);
  const activeRoles = member.workspaceMemberRole.filter((e) => activeRoleIds.includes(e.salesRoleId));

  activeRoles.forEach((e) => {
    const configurableRole = values.roles.find((c) => c.salesRoleId === e.salesRoleId) as ConfigurableRole;
    e.commission.commissionTypeId = configurableRole.commissionTypeId;
    e.commission.commissionValue = configurableRole.commissionValue;
    e.isCustomCommission = configurableRole.isCustomCommission;
    e.isActive = true;
  });

  const inactiveRoles = member.workspaceMemberRole
    .filter((e) => !activeRoleIds.includes(e.salesRoleId))
    .map((e) => ({ ...e, isActive: false }));

  const updatedWorkspacePermission = values.permission as IWorkspacePermission;

  const request: EditMemberRequest = {
    id: member.id,
    memberId: member.memberId,
    permissionId: member.permissionId,

    workspacePermissionId: updatedWorkspacePermission.id,
    isCustomPermission: values.isCustomPermission,
    workspaceId: selectedWorkspace.id,
    workspaceMemberRole: [...inactiveRoles, ...activeRoles],
    permission: {
      ...member.permission,
      homeDashboard: values.homeDashboard,
      setterDashboard: values.setterDashboard,
      closerDashboard: values.closerDashboard,
      fbDashboard: values.fbDashboard,
    },
  };

  return request;
};

export const EditMember = (payload: EditMemberRequest) =>
  ValidatedAPI.post<unknown, EditMemberRequest>("/workspace/update-member", payload);

export const UpdateEditedMemberCache = (payload: EditMemberRequest, meta: { selectedMember: IWorkspaceMember }) => {
  const updatedMember: IWorkspaceMember = {
    ...payload,
    member: meta.selectedMember.member,
  };

  UpdatePaginatedCache([QueryKeys.WORKSPACE_MEMBERS, { workspaceId: payload.workspaceId }], updatedMember, {
    strategy: "persist",
  });
};
