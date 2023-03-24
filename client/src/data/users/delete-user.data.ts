import { ValidatedAPI } from "@/utils/api";
import { DeleteUserVariable } from "@/types/table";

export const DeleteUserById = async (variables: DeleteUserVariable) => {
  return ValidatedAPI.delete<undefined>(`/users/${variables._id}`, {
    headers: { Authorization: `Bearer ${localStorage.getItem("accessToken")}` },
  });
};
