import { IntegrationChannels } from "@/components/managers/account/integrations/components/integration-settings";
import { IWorkspaceMember } from "@/schemas/member.schema";
import { IWorkspacePermission } from "@/schemas/permission.schema";
import { IWorkspaceMemberRoleCommission } from "@/schemas/role.schema";
import { ITask, TaskStatus } from "@/schemas/task.schema";
import { IWorkspace } from "@/schemas/workspace.schema";
import MiscUtils from "@/utils/misc-utils";
import cuid from "cuid";

interface MemberMeta {
  roles: IWorkspaceMemberRoleCommission[];
  permissions: IWorkspacePermission[];
}

interface TaskMeta {
  workspace: IWorkspace;
  workspaceMembers: IWorkspaceMember[];
}

class Core {
  public getValidLength(length: number, array: Array<unknown>) {
    return length > array.length ? array.length : length;
  }
}

class MembersClient extends Core {
  private mockedMembers: Array<IWorkspaceMember> = [];

  constructor(private names: Array<string>) {
    super();
  }

  private createMockMember(name: string, index: number, meta: MemberMeta) {
    const { permissions, roles } = meta;
    const randomWorkspacePermission = permissions[MiscUtils.getRandomNumberBetween(0, permissions.length)];

    const mockMember: IWorkspaceMember = {
      id: cuid(),
      memberId: cuid(),
      workspacePermissionId: cuid(),
      permissionId: cuid(),
      isCustomPermission: false,
      member: {
        id: cuid(),
        memberAvatar:
          "https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
        memberEmail: `${name.toLowerCase().replace(" ", ".")}@email${index}.com`,
        memberName: name,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      workspaceMemberRole: Array(MiscUtils.getRandomNumberBetween(1, roles.length))
        .fill(null)
        .map((_, index) => roles[index]),
      permission: randomWorkspacePermission.permission,
    };
    return mockMember;
  }

  public mock(length: number, meta: MemberMeta) {
    const validLength = this.getValidLength(length, this.names);
    const members: Array<IWorkspaceMember> = Array(validLength)
      .fill(null)
      .map((elm, index) => {
        return this.createMockMember(this.names[index], index, meta);
      });

    return members;
  }

  public get() {
    return this.mockedMembers;
  }
}

class TasksClient {
  private mockedTasks: Array<ITask> = [];

  private createMockTask(meta: TaskMeta) {
    const { workspace, workspaceMembers } = meta;

    const randomWorkspaceMember = workspaceMembers[MiscUtils.getRandomNumberBetween(0, workspaceMembers.length)];

    const randomTaskStatus =
      Object.values(TaskStatus)[MiscUtils.getRandomNumberBetween(0, Object.values(TaskStatus).length)];

    const mockedTask: ITask = {
      id: cuid(),
      customer: null,
      customerId: cuid(),
      workspaceMember: randomWorkspaceMember,
      workspaceMemberId: randomWorkspaceMember.id,
      workspace,
      workspaceId: workspace.id,
      source: IntegrationChannels.CALENDLY,
      status: randomTaskStatus,
      isMarkedDone: MiscUtils.getRandomNumberBetween(0, 1) === 0,
      timeZone: "asia",
      scheduledDate: new Date().toString(),
      callUrl: "https://google.com/",
      createdAt: new Date().toString(),
      updatedAt: new Date().toString(),
    };

    return mockedTask;
  }

  public mock(length: number, meta: TaskMeta) {
    const allTasks: ITask[] = [];

    for (let i = 0; i < length; i++) {
      allTasks.push(this.createMockTask(meta));
    }

    return allTasks;
  }

  public get() {
    return this.mockedTasks;
  }
}

const MockClient = {
  Members: new MembersClient([
    "Mack Angrock",
    "Kent Barley",
    "Juditha Hallwood",
    "Pearle Dewdney",
    "Enriqueta Ashment",
    "Mathias Huburn",
    "Auria Frick",
    "Germaine Blant",
    "Oswell Baudouin",
    "Corilla Bristo",
    "Ailis Lowther",
    "Ingram Comerford",
    "Isabelita Foskett",
    "Aundrea Normand",
    "Devonne Chape",
    "Rance Boosey",
    "Wilmar Brennon",
    "Josepha Toovey",
    "Griz Smitherham",
    "Rolph Conachy",
  ]),
  Tasks: new TasksClient(),
};

export default MockClient;
