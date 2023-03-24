import { ValidLimit } from "@/components/ui-blocks/selects/limit-select/types";

export interface PaginationOffsets {
  skip: number;
  take: number;
}

export interface PaginationControls {
  page: number;
  limit: ValidLimit;
}

export type FilterationOptions = { search: string };

export type FilterationParams = { filter: { [key: string]: string } };

export type PaginatedQueryData<T> = {
  skip: number;
  take: number;
  data: Array<T>;
  totalCount: number;
};

export enum SortOrder {
  ASC = "ASC",
  DESC = "DESC",
}

export type Sort = Record<string, SortOrder>;

export interface SortingOptions {
  sortField: string;
  sortOrder: SortOrder;
}

export interface SortingParams {
  orderBy: { [key: string]: string };
}

export type GridQueryParams<E = unknown> = PaginationOffsets & SortingParams & FilterationParams & E;

export type GridVariables<P> = P;
