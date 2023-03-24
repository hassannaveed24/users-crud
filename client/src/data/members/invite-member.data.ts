import { DEFAULT_AVATAR } from "@/constants/data";
import { IWorkspaceMember } from "@/schemas/member.schema";
import { IPermission } from "@/schemas/permission.schema";
import store from "@/state/store";
import { ValidatedAPI } from "@/utils/api";
import cuid from "cuid";
import { GetSelectedWorkspace } from "../workspace/get-workspaces.data";

export interface InviteMemberRequest {
  memberId: string;
  memberName: string;
  memberEmail: string;
  memberAvatar: string;
  workspaceMemberId: string;
  workspacePermissionId: string;
  permissionId: string;
  isCustomPermission: boolean;
  workspaceId: string;
  roles: {
    isActive: boolean;
    isCustomCommission: boolean;
    workspaceMemberRoleId: string;
    commissionId: string;
    salesRoleId: string;
    commissionTypeId: string;
    commissionValue: string;
  }[];
}

export interface InviteMemberRespose {
  id: string;
  memberId: string;
  workspacePermissionId: string;
  permissionId: string;
  isCustomPermission: boolean;
  createdAt: string;
  updatedAt: string;
  workspaceId: string;
}

const getMemberName = (email: string) => email.split("@")[0];

export const GetInviteMemberRequest = (variables: {
  memberEmail: string;
  workspacePermissionId: string;
  activeRoleIds: string[];
}) => {
  const { selectedWorkspaceId, allWorkspaces } = store.getState().workspace;
  const selectedWorkspace = GetSelectedWorkspace(selectedWorkspaceId, { allWorkspaces });
  const allRoles = selectedWorkspace.workspaceRoleCommission;
  const { memberEmail, workspacePermissionId, activeRoleIds } = variables;

  const payload: InviteMemberRequest = {
    memberEmail,
    memberName: getMemberName(memberEmail),
    workspacePermissionId: workspacePermissionId,
    memberId: cuid(),
    memberAvatar: DEFAULT_AVATAR,
    workspaceMemberId: cuid(),
    permissionId: cuid(),
    isCustomPermission: false,
    workspaceId: selectedWorkspace.id,
    roles: allRoles.map((e) => ({
      isActive: activeRoleIds.includes(e.id),
      isCustomCommission: false,
      workspaceMemberRoleId: cuid(),
      salesRoleId: e.salesRoleId,
      commissionId: cuid(),
      commissionTypeId: e.commission.commissionTypeId,
      commissionValue: e.commission.commissionValue,
    })),
  };

  return payload;
};

export const GetMemberFromInviteMemberAPI = (
  payload: InviteMemberRequest,
  response: InviteMemberRespose,
  meta: { permission: IPermission }
) => {
  const { createdAt, updatedAt } = response;

  const { selectedWorkspaceId, allWorkspaces } = store.getState().workspace;
  const selectedWorkspace = GetSelectedWorkspace(selectedWorkspaceId, { allWorkspaces });
  const allRoles = selectedWorkspace.workspaceRoleCommission;

  const member: IWorkspaceMember = {
    id: response.id,
    memberId: response.memberId,
    workspacePermissionId: response.workspacePermissionId,
    permissionId: response.permissionId,
    isCustomPermission: response.isCustomPermission,
    member: {
      id: response.memberId,
      memberName: payload.memberName,
      memberEmail: payload.memberEmail,
      memberAvatar: payload.memberAvatar,
      createdAt,
      updatedAt,
    },
    permission: meta.permission,
    workspaceMemberRole: allRoles.map((e) => ({
      ...e,
      workspaceMemberId: response.memberId,
      isActive: payload.roles.find((r) => r.salesRoleId === e.salesRoleId)?.isActive || false,
      isCustomCommission: false,
    })),
  };

  return member;
};

export const InviteMember = async (payload: InviteMemberRequest) =>
  ValidatedAPI.post<InviteMemberRespose, InviteMemberRequest>("/workspace/add-member", payload);
