import { QueryKeys } from "@/constants/query-keys";
import { useInfiniteQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { ValidatedAPI } from "@/utils/api";
import { IUser } from "@/schemas/user.schema";
import { PaginatedQueryData, PaginationOffsets, TableVariables } from "@/types/table";

const GetUsers = async (variables: TableVariables<PaginationOffsets>) => {
  const res = await ValidatedAPI.get<PaginatedQueryData<IUser>, PaginationOffsets>("/users", {
    headers: { Authorization: `Bearer ${localStorage.getItem("accessToken")}` },
    params: { skip: variables.skip, take: variables.take },
  });
  res.data = res.data.map((user, index) => ({ ...user, index: variables.skip + index }));
  return res;
};

export const useUsers = () => {
  return useInfiniteQuery<PaginatedQueryData<IUser>, AxiosError>(
    [QueryKeys.USERS],
    ({ pageParam = { skip: 0, take: 1000 } }) => {
      const queryVariables: TableVariables<PaginationOffsets> = {
        ...pageParam,
      };
      return GetUsers(queryVariables);
    },
    {
      getNextPageParam: (lastPage, allPages) => {
        const maxPages = Math.ceil(lastPage.totalCount / 1000);
        const nextPage = allPages.length + 1;
        return nextPage <= maxPages ? nextPage : undefined;
      },
      keepPreviousData: true,
    }
  );
};
