import { QueryKeys } from "@/constants/query-keys";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { ValidatedAPI } from "@/utils/api";
import { IUser } from "@/schemas/user.schema";

interface Variables {
  _id?: string;
}

const GetUser = async (variables: Variables) => {
  if (variables._id) {
    return ValidatedAPI.get<IUser>(`/users/${variables._id}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("accessToken")}` },
    });
  }
  return;
};

export const useUser = (variables: Variables) => {
  return useQuery<IUser | undefined, AxiosError>([QueryKeys.USER_BY_ID, variables], () => GetUser(variables), {
    keepPreviousData: true,
  });
};
