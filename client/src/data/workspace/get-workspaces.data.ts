import { IWorkspace, WorkspaceType } from "@/schemas/workspace.schema";
import { useSelector } from "@/state/store";
import { Nullable } from "@/types/misc.type";
import { AuthAPI } from "@/utils/api";

export interface GetWorkspaceRequest {
  workspaceOwnerId: string;
}

export const GetWorkspaces = async (variables: GetWorkspaceRequest) =>
  AuthAPI.post<IWorkspace[], GetWorkspaceRequest>("/workspace/get-workspace-recursive", variables);

export const useWorkspaces = () => {
  return useSelector((store) => store.workspace.allWorkspaces);
};

export const GetMasterWorkspace = (
  masterWorkspaceId: string | null | undefined,
  opts: { allWorkspaces: IWorkspace[] }
) => {
  if (!masterWorkspaceId) return null;

  const masterWorkspace = opts.allWorkspaces.find((e) => e.workspaceType === WorkspaceType.MASTER);

  if (!masterWorkspace) throw new Error("No master workspace found");

  return masterWorkspace;
};

export const useMasterWorkspace = () => {
  const { allWorkspaces, masterWorkspaceId } = useSelector((store) => store.workspace);
  return GetMasterWorkspace(masterWorkspaceId, { allWorkspaces });
};

export const GetSelectedWorkspace = (selectedWorkspaceId: Nullable<string>, opts: { allWorkspaces: IWorkspace[] }) => {
  const { allWorkspaces } = opts;

  const selectedWorkspace = allWorkspaces.find((_workspace) => _workspace.id === selectedWorkspaceId) as IWorkspace;

  return selectedWorkspace;
};

export const useSelectedWorkspace = (): IWorkspace => {
  const { selectedWorkspaceId, allWorkspaces } = useSelector((store) => store.workspace);
  return GetSelectedWorkspace(selectedWorkspaceId, { allWorkspaces });
};
