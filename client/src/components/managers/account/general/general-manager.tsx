import React, { FC } from "react";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import ErrorManager from "@/services/error-manager";
import { Form, Formik } from "formik";
import { getInitialValues } from "./utils";
import { validateFromZod } from "@/utils/validation";
import { User } from "@auth0/auth0-spa-js";
import ProfilePhoto from "./components/profile-photo";
import Input from "@/components/inputs/Input";
import Card from "@/components/ui-blocks/card";
import { AxiosError } from "axios";
import { Button, Title, Text } from "@mantine/core";
import { useLoggedInUser } from "@/data/user/auth.data";
import {
  RequestNewPassword,
  UpdateUserDetails,
  UpdateUserFormSchema,
  UpdateUserFormValues,
} from "@/data/user/update-user.data";

const GeneralManager: FC<Record<string, never>> = () => {
  const user = useLoggedInUser();
  const passwordMutation = useMutation<void, AxiosError, void>(RequestNewPassword);

  const updateUserMutation = useMutation<void, AxiosError, UpdateUserFormValues>(UpdateUserDetails);

  return (
    <Formik
      initialValues={getInitialValues(user as User)}
      validate={validateFromZod(UpdateUserFormSchema)}
      onSubmit={(values, _actions) => {
        updateUserMutation.mutate(values, {
          onSuccess: () => {
            toast.success("User details have been updated successfully");
          },
          onError: (error) => ErrorManager.handleError(error),
        });
      }}
    >
      <div className="space-y-6">
        <Form className="space-y-6">
          <Card className="space-y-[68px]">
            <div className="flex flex-col gap-8 lg:flex-row">
              <div className="w-[400px]">
                <Title>Details</Title>
                <Text color="textColors.2">Select your profile image and name here</Text>
              </div>

              <div className="space-y-6" style={{ flex: 1 }}>
                <ProfilePhoto />

                <Input name="name" label="Full name" placeholder="Alexander James" isRequired />

                <Input name="email" label="Email address" placeholder="alex@email.com" />
              </div>
            </div>
            <div className="flex flex-col items-end gap-8 min-[865px]:flex-row">
              <div className="w-[400px]">
                <Title>Your Password</Title>
                <Text color="textColors.2">Request a magic password reset link via email</Text>
              </div>

              <Button
                variant="default"
                loading={passwordMutation.isLoading}
                onClick={() =>
                  passwordMutation.mutate(undefined, {
                    onSuccess: () => {
                      toast.success("Magic link has been sent to reset your password, please check your inbox");
                    },
                    onError: (error) => ErrorManager.handleError(error),
                  })
                }
              >
                {passwordMutation.isLoading ? "Requesting reset " : "Reset "} password
              </Button>
            </div>
          </Card>
          <div className="flex justify-end w-full gap-2 pb-6">
            <Button type="button" variant="default">
              Cancel
            </Button>
            <Button type="submit">Save</Button>
          </div>
        </Form>

        <Card className="flex items-end gap-8">
          <div className="w-[400px]">
            <Title>Delete Account</Title>
            <Text color="textColors.2">
              Caution when deleting your account. This action deletes your account and all of your data. This is
              irreversible.
            </Text>
          </div>
          <div className="flex-1">
            <Button color="red" className="float-right">
              Delete account
            </Button>
          </div>
        </Card>
      </div>
    </Formik>
  );
};

export default GeneralManager;
