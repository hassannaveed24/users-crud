import { QueryKeys } from "@/constants/query-keys";
import { ITask } from "@/schemas/task.schema";
import store, { useSelector } from "@/state/store";
import { GridVariables, PaginatedQueryData, PaginationControls } from "@/types/grid";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useSelectedWorkspace } from "../workspace/get-workspaces.data";

interface TasksQueryInternalVariables {
  workspaceId: string;
}

const GetMockedTasks = () => {
  const tasks = store.getState().workspace.mockedTasks;
  return {
    data: tasks,
    pages: [],
    skip: 0,
    take: 15,
    totalCount: tasks.length,
  } satisfies PaginatedQueryData<ITask>;
};

const GetTasks = (variables: GridVariables<PaginationControls, TasksQueryInternalVariables>) => {
  return GetMockedTasks();
};

export const useTasks = (variables: GridVariables<PaginationControls>) => {
  const workspace = useSelectedWorkspace();

  const queryVariables: GridVariables<PaginationControls, TasksQueryInternalVariables> = {
    ...variables,
    workspaceId: workspace.id,
  };

  return useQuery<PaginatedQueryData<ITask>, AxiosError>(
    [QueryKeys.TASKS, queryVariables],
    () => GetTasks(queryVariables),
    { keepPreviousData: true, placeholderData: GetMockedTasks() }
  );
};
