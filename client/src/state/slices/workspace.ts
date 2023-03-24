import { IWorkspaceMember } from "@/schemas/member.schema";
import { INotification } from "@/schemas/notification.schema";
import { IWorkspaceRoleCommission } from "@/schemas/role.schema";
import { ITask } from "@/schemas/task.schema";
import { IWorkspace, WorkspaceType } from "@/schemas/workspace.schema";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type WorkspaceSlice = {
  allWorkspaces: IWorkspace[];
  masterWorkspaceId: string | null;
  selectedWorkspaceId: string | null;
  mockedWorkspaceMembers: IWorkspaceMember[];
  mockedTasks: ITask[];
};

const initialState: WorkspaceSlice = {
  allWorkspaces: [],
  masterWorkspaceId: null,
  selectedWorkspaceId: null,
  mockedWorkspaceMembers: [],
  mockedTasks: [],
};

const slice = createSlice({
  name: "workspace",
  initialState,
  reducers: {
    setWorkspaces: (state, action: PayloadAction<IWorkspace[]>) => {
      const allWorkspaces = action.payload;
      state.allWorkspaces = allWorkspaces;
      const masterWorkspace = allWorkspaces.find((_workspace) => _workspace.workspaceType === WorkspaceType.MASTER);
      state.masterWorkspaceId = masterWorkspace?.id || null;
      state.selectedWorkspaceId = masterWorkspace?.id || null;
    },
    setWorkspaceRoleCommissions: (state, action: PayloadAction<IWorkspaceRoleCommission[]>) => {
      const selectedWorkspace = state.allWorkspaces.find((e) => e.id === state.selectedWorkspaceId) as IWorkspace;
      selectedWorkspace.workspaceRoleCommission = action.payload;
    },
    selectWorkspace: (state, action: PayloadAction<string>) => {
      state.selectedWorkspaceId = action.payload;
    },
    mockWorkspaceData: (state, action: PayloadAction<{ members?: IWorkspaceMember[]; tasks?: ITask[] }>) => {
      const { members = [], tasks = [] } = action.payload;
      if (members.length > 0) state.mockedWorkspaceMembers = members;
      if (tasks.length > 0) state.mockedTasks = tasks;
    },
    updateWorkspaceNotifications: (
      state,
      action: PayloadAction<{ notification: INotification; workspaceId: string }>
    ) => {
      const workspace = state.allWorkspaces.find((e) => e.id === action.payload.workspaceId) as IWorkspace;
      workspace.notification = action.payload.notification;
    },
  },
});

export const workspaceActions = slice.actions;

export const { reducer } = slice;
