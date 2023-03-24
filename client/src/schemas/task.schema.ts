import { z } from "zod";
import { WorkspaceMemberSchema } from "./member.schema";
import { WorkspaceSchema } from "./workspace.schema";

export enum TaskStatus {
  INCOMPLETE = "INCOMPLETE",
  COMPLETE = "COMPLETE",
}

export const TaskSchema = z.object({
  id: z.string(),
  customer: z.any(),
  customerId: z.string(),
  workspaceMember: WorkspaceMemberSchema,
  workspaceMemberId: z.string(),
  workspace: WorkspaceSchema,
  workspaceId: z.string(),
  source: z.string(),
  status: z.nativeEnum(TaskStatus),
  isMarkedDone: z.boolean(),
  timeZone: z.string(),
  scheduledDate: z.string(),
  callUrl: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export type ITask = z.infer<typeof TaskSchema>;
