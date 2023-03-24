import { IWorkspace } from "@/schemas/workspace.schema";
import { Nullable } from "@/types/misc.type";
import { useSelectedWorkspace } from "./workspace/get-workspaces.data";

export const GetWorkspacePermissions = (workspace: Nullable<IWorkspace>) => workspace?.workspacePermission || [];

export const useWorkspacePermissions = () => {
  const workspace = useSelectedWorkspace();
  return GetWorkspacePermissions(workspace);
};
