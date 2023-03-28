import { QueryKeys } from "@/constants/query-keys";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { ValidatedAPI } from "@/utils/api";
import { IUser } from "@/schemas/user.schema";
import _isNil from "lodash/isNil";

interface Variables {
  _id?: string;
}

const GetUser = async (variables: Variables) => {
  return ValidatedAPI.get<IUser | null>(`/users/${variables._id}`, {
    headers: { Authorization: `Bearer ${localStorage.getItem("accessToken")}` },
  });
};

export const useUser = (variables: Variables) => {
  return useQuery<IUser | null, AxiosError>([QueryKeys.USER_BY_ID, variables], () => GetUser(variables), {
    keepPreviousData: true,
    enabled: !_isNil(variables._id),
  });
};
