import { ConfigurableCommission } from "@/components/managers/account/commissions/validations";
import { ICommission } from "@/schemas/commission.schema";
import { IWorkspaceRoleCommission } from "@/schemas/role.schema";
import { IWorkspace } from "@/schemas/workspace.schema";
import store from "@/state/store";
import { ValidatedAPI } from "@/utils/api";
import { GetSelectedWorkspace } from "../workspace/get-workspaces.data";

export interface CreateWorkspaceCommissionPayload extends Pick<ICommission, "commissionTypeId" | "commissionValue"> {
  commissionId: string;
  workspaceRoleCommissionId: string;
  salesRoleId: string;
  workspaceId: string;
}

export const GetCreateWorkspaceCommissionPayload = (configurableCommission: ConfigurableCommission) => {
  const { selectedWorkspaceId, allWorkspaces } = store.getState().workspace;
  const selectedWorkspace = GetSelectedWorkspace(selectedWorkspaceId, { allWorkspaces });
  const allRoles = selectedWorkspace.workspaceRoleCommission;

  const currentRole = allRoles.find(
    (e) => e.id === configurableCommission.workspaceRoleCommissionId
  ) as IWorkspaceRoleCommission;

  const payload: CreateWorkspaceCommissionPayload = {
    commissionId: currentRole.commissionId,
    commissionTypeId: configurableCommission.type,
    commissionValue: configurableCommission.value,
    workspaceRoleCommissionId: currentRole.id,
    salesRoleId: currentRole.salesRoleId,
    workspaceId: selectedWorkspaceId as string,
  };

  return payload;
};

export const GetWorkspaceRoleCommissionFromConfigurableCommission = (e: ConfigurableCommission) => {
  const { selectedWorkspaceId, allWorkspaces } = store.getState().workspace;
  const selectedWorkspace = GetSelectedWorkspace(selectedWorkspaceId, { allWorkspaces }) as IWorkspace;

  const workspaceCommission = selectedWorkspace.workspaceRoleCommission.find(
    (r) => r.id === e.workspaceRoleCommissionId
  ) as IWorkspaceRoleCommission;

  const updatedCommission: IWorkspaceRoleCommission = {
    ...workspaceCommission,
    commission: { ...workspaceCommission.commission, commissionTypeId: e.type, commissionValue: e.value },
  };

  return updatedCommission;
};

export const CreateWorkspaceCommission = (payload: CreateWorkspaceCommissionPayload) =>
  ValidatedAPI.post<unknown, CreateWorkspaceCommissionPayload>("/workspace/create-workspace-commission", payload);
