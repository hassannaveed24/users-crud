import { IWorkspace } from "@/schemas/workspace.schema";
import { Nullable } from "@/types/misc.type";
import { useSelectedWorkspace } from "./workspace/get-workspaces.data";

export const GetWorkspaceRoles = (workspace: Nullable<IWorkspace>) => workspace?.workspaceRoleCommission || [];

export const useWorkspaceRoles = () => {
  const workspace = useSelectedWorkspace();
  return GetWorkspaceRoles(workspace);
};
