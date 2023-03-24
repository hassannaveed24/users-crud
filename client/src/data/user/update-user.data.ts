import { authActions } from "@/state/slices/auth";
import store from "@/state/store";
import { ValidatedAPI } from "@/utils/api";
import { AxiosError } from "axios";
import isEmail from "validator/lib/isEmail";
import { z } from "zod";

export interface UpdateUserFormValues {
  name: string | undefined;
  picture: string | undefined;
  email: string | undefined;
}

export interface NewPasswordRequest {
  email: string;
}

export const UpdateUserFormSchema = z.object({
  name: z
    .string({ invalid_type_error: "Please enter your full name", required_error: "Please enter your full name" })
    .refine((name) => /^[a-z ,.'-]+$/i.test(name), { message: "Invalid name" }),
  picture: z.string({
    invalid_type_error: "Please select a profile photo",
    required_error: "Please select a profile photo",
  }),
  email: z
    .string({
      invalid_type_error: "Please enter your email",
      required_error: "Please enter your email",
    })
    .refine(isEmail, { message: "Please enter a valid email" }),
});

export const UpdateUserDetails = async (variables: UpdateUserFormValues) => {
  const userId = store.getState().auth.user?.sub;

  if (!userId) throw new AxiosError("Your session has expired, please login again");

  const body = {
    userId,
    data: variables,
  };

  await ValidatedAPI.post<void, typeof body>("/users/update-user", body);

  store.dispatch(authActions.login(variables));
};

export const RequestNewPassword = () => {
  const email = store.getState().auth.user?.email as string;
  const variables: NewPasswordRequest = { email };
  return ValidatedAPI.post<void, NewPasswordRequest>("/users/change-password", variables);
};
