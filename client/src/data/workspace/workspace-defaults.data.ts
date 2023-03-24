import { AuthAPI } from "@/utils/api";

export type CreateWorkspaceDefaultsRequest = { workspaceId: string };

export const CreateWorkspaceDefaults = async (variables: CreateWorkspaceDefaultsRequest) =>
  AuthAPI.post<void, CreateWorkspaceDefaultsRequest>("/workspace/create-workspace-defaults", variables);
