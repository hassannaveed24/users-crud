import { QueryKeys } from "@/constants/query-keys";
import { qc } from "@/pages/_app";
import { IProduct } from "@/schemas/product.schema";
import store from "@/state/store";
import { GridQueryParams, GridVariables, PaginatedQueryData, PaginationControls } from "@/types/grid";
import { ValidatedAPI } from "@/utils/api";
import GridFactory from "@/utils/grid-factory";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { GetFlattenedPaginatedCache } from "../cache.data";
import { useSelectedWorkspace } from "../workspace/get-workspaces.data";

interface GetProductsVariables {
  workspaceId: string;
}

export const GetProducts = ({ workspaceId, ...variables }: GridVariables<PaginationControls, GetProductsVariables>) =>
  ValidatedAPI.get<PaginatedQueryData<IProduct>, GridQueryParams<GetProductsVariables>>("/product/list-products", {
    params: {
      ...GridFactory.getPaginatedQueryParams(variables, { filterKey: "productTitle" }),
      workspaceId,
    },
  });

export const useProducts = (variables: GridVariables<PaginationControls>) => {
  const workspace = useSelectedWorkspace();

  const queryVariables: GridVariables<PaginationControls, GetProductsVariables> = {
    ...variables,
    workspaceId: workspace.id,
  };

  return useQuery<PaginatedQueryData<IProduct>, AxiosError>(
    [QueryKeys.PRODUCTS, queryVariables],
    () => GetProducts(queryVariables),
    {
      keepPreviousData: true,
      refetchOnWindowFocus: false,
    }
  );
};

export const GetCachedProducts = () => {
  return GetFlattenedPaginatedCache<IProduct>([
    QueryKeys.PRODUCTS,
    { workspaceId: store.getState().workspace.selectedWorkspaceId },
  ]);
};
