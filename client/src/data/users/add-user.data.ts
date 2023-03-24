import { ValidatedAPI } from "@/utils/api";

import { IUser } from "@/schemas/user.schema";

export const AddUser = async (payload: IUser) => {
  const res = await ValidatedAPI.post<undefined>(`/users`, payload, {
    headers: { Authorization: `Bearer ${localStorage.getItem("accessToken")}` },
  });

  return res;
};
