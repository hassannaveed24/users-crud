import { ValidLimit } from "@/components/ui-blocks/selects/limit-select/types";

export type PaginatedQueryData<T> = {
  skip: number;
  take: number;
  data: Array<T>;
  totalCount: number;
};

export interface PaginationOffsets {
  skip: number;
  take: number;
}
export interface PaginationControls {
  limit: ValidLimit;
}

export type TableVariables<P, E = unknown> = P & E;

export interface DeleteUserVariable {
  _id: string;
}
