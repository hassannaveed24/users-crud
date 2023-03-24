import { QueryKeys } from "@/constants/query-keys";
import { IWorkspaceMember } from "@/schemas/member.schema";
import { useSelector } from "@/state/store";
import {
  GridQueryParams,
  GridVariables,
  PaginatedQueryData,
  PaginationControls,
  PaginationOffsets,
} from "@/types/grid";
import { EnhancedUseQueryOptions } from "@/types/query";
import { AuthAPI } from "@/utils/api";
import GridFactory from "@/utils/grid-factory";
import PaginationFactory from "@/utils/pagination-factory";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

interface GetWorkspaceMembersVariables {
  workspaceId: string;
}

export const GetWorkspaceMembers = async (
  variables: GridVariables<PaginationControls, GetWorkspaceMembersVariables>
) => {
  const { workspaceId, ...gridVariables } = variables;

  const members = await AuthAPI.get<
    PaginatedQueryData<IWorkspaceMember>,
    GridQueryParams<GetWorkspaceMembersVariables>
  >("/workspace/fetch-members", {
    params: { ...GridFactory.getPaginatedQueryParams(gridVariables, { filterKey: "memberEmail" }), workspaceId },
  });

  return members;
};

export const useWorkspaceMembers = (
  gridVariables: GridVariables<PaginationControls>,
  options?: EnhancedUseQueryOptions<PaginatedQueryData<IWorkspaceMember>, AxiosError>
) => {
  const mockedMembers = useSelector((store) => store.workspace.mockedWorkspaceMembers);
  const workspaceId = useSelector((store) => store.workspace.selectedWorkspaceId as string);

  const queryVariables = {
    ...gridVariables,
    workspaceId,
  };

  return useQuery<PaginatedQueryData<IWorkspaceMember>, AxiosError>(
    [QueryKeys.WORKSPACE_MEMBERS, queryVariables],
    () => GetWorkspaceMembers(queryVariables),
    {
      keepPreviousData: true,
      refetchOnWindowFocus: false,
      placeholderData: { pages: [], totalCount: 3, data: mockedMembers, skip: 0, take: 15 },
      ...options,
    }
  );
};
