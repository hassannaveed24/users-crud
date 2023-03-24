import { Container, TextInput, SimpleGrid, NativeSelect } from "@mantine/core";
import { FC } from "react";
import DetailModal from "@/components/ui-blocks/modal";
import { Formik, Field } from "formik";
import { IUser, UserDto, UserRoles } from "@/schemas/user.schema";
import { FieldProps } from "@/types/formik";
import { userRoles } from "@/constants/data";
import { IconUserExclamation } from "@tabler/icons-react";
import { useUser } from "@/data/users/get-user.data";
import { init } from "@paralleldrive/cuid2";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import ToastClient from "@/services/toast-client";
import ErrorManager from "@/services/error-manager";
import { AddUser } from "@/data/users/add-user.data";
import { QueryKeys } from "@/constants/query-keys";

export enum FormMode {
  "VIEW" = "VIEW",
  "EDIT" = "EDIT",
  "ADD" = "ADD",
}

const Form: FC<{ opened: boolean; close: () => void; mode: FormMode; userId?: string }> = ({
  opened = false,
  close,
  mode = FormMode.VIEW,
  userId,
}) => {
  const queryClient = useQueryClient();

  const user = useUser({ _id: userId });
  const addUserMutation = useMutation<undefined, AxiosError, IUser>((payload) => AddUser(payload), {
    onSuccess: async (data, payload) => {
      switch (mode) {
        case FormMode.EDIT:
          await Promise.all([
            queryClient.invalidateQueries([QueryKeys.USER_BY_ID, { _id: payload._id }]),
            queryClient.invalidateQueries([QueryKeys.USERS]),
          ]);
          ToastClient.success("User edited");

          break;
        case FormMode.ADD:
          await queryClient.invalidateQueries([QueryKeys.USERS]);
          ToastClient.success("User added");

          break;

        default:
          break;
      }
      close();
    },
    onError: (error) => {
      ErrorManager.handleError(error);
    },
  });

  const handleSubmit = (values: IUser) => {
    addUserMutation.mutate(values);
  };
  let title;
  switch (mode) {
    case FormMode.VIEW:
      title = "User Details";
      break;
    case FormMode.EDIT:
      title = "Edit User";
      break;
    case FormMode.ADD:
      title = "Add User";
      break;

    default:
      break;
  }
  return (
    <>
      {opened && (
        <Formik
          enableReinitialize={true}
          initialValues={{
            _id: user.data?._id || init({ length: 12 })(),
            name: user.data?.name || "",
            address: {
              _id: user.data?.address?._id || init({ length: 12 })(),
              addressLine1: user.data?.address?.addressLine1 || "",
              addressLine2: user.data?.address?.addressLine2 || "",
              city: user.data?.address?.city || "",
              country: user.data?.address?.country || "",
              state: user.data?.address?.state || "",
            },
            email: user.data?.email || "",
            phoneNo: user.data?.phoneNo || "",
            role: user.data?.role || UserRoles.MEMBER,
          }}
          onSubmit={handleSubmit}
          validate={UserDto.createValidator()}
        >
          <DetailModal
            onClose={close}
            opened={opened}
            title={title}
            footer={mode == FormMode.VIEW && <></>}
            withFormik={true}
            size={"xl"}
            loading={addUserMutation.isLoading}
          >
            <Container>
              <SimpleGrid cols={2} spacing="lg" breakpoints={[{ maxWidth: "xs", cols: 1, spacing: "sm" }]}>
                <Field name={"name"}>
                  {({ field, meta }: FieldProps) => {
                    return (
                      <>
                        <TextInput
                          readOnly={mode == FormMode.VIEW}
                          label="Name"
                          placeholder="Enter name"
                          {...field}
                          withAsterisk
                          error={meta.error}
                        />
                      </>
                    );
                  }}
                </Field>
                <Field name={"email"}>
                  {({ field, meta }: FieldProps) => {
                    return (
                      <>
                        <TextInput
                          readOnly={mode == FormMode.VIEW}
                          label="Email"
                          placeholder="Enter email"
                          {...field}
                          withAsterisk
                          error={meta.error}
                        />
                      </>
                    );
                  }}
                </Field>
                <Field name={"phoneNo"}>
                  {({ field, meta }: FieldProps) => {
                    return (
                      <>
                        <TextInput
                          readOnly={mode == FormMode.VIEW}
                          label="Phone No."
                          placeholder="Enter phone no."
                          {...field}
                          error={meta.error}
                        />
                      </>
                    );
                  }}
                </Field>
                <Field name={"role"}>
                  {({ field, meta }: FieldProps) => {
                    return (
                      <>
                        <NativeSelect
                          disabled={mode == FormMode.VIEW}
                          data={userRoles}
                          label="Role"
                          placeholder="Select a role"
                          icon={<IconUserExclamation size="1rem" />}
                          {...field}
                          withAsterisk
                          error={meta.error}
                        />
                      </>
                    );
                  }}
                </Field>

                <Field name={"address.addressLine1"}>
                  {({ field, meta }: FieldProps) => {
                    return (
                      <>
                        <TextInput
                          readOnly={mode == FormMode.VIEW}
                          label="Address Line 1"
                          placeholder="Enter address line 1"
                          {...field}
                          error={meta.error}
                        />
                      </>
                    );
                  }}
                </Field>
                <Field name={"address.addressLine2"}>
                  {({ field, meta }: FieldProps) => {
                    return (
                      <>
                        <TextInput
                          readOnly={mode == FormMode.VIEW}
                          label="Address Line 2"
                          placeholder="Enter address line 2"
                          {...field}
                          error={meta.error}
                        />
                      </>
                    );
                  }}
                </Field>

                <Field name={"address.city"}>
                  {({ field, meta }: FieldProps) => {
                    return (
                      <>
                        <TextInput
                          readOnly={mode == FormMode.VIEW}
                          label="City"
                          placeholder="Enter city"
                          {...field}
                          error={meta.error}
                        />
                      </>
                    );
                  }}
                </Field>
                <Field name={"address.state"}>
                  {({ field, meta }: FieldProps) => {
                    return (
                      <>
                        <TextInput
                          readOnly={mode == FormMode.VIEW}
                          label="State"
                          placeholder="Enter state"
                          {...field}
                          error={meta.error}
                        />
                      </>
                    );
                  }}
                </Field>
                <Field name={"address.country"}>
                  {({ field, meta }: FieldProps) => {
                    return (
                      <>
                        <TextInput
                          readOnly={mode == FormMode.VIEW}
                          label="Country"
                          placeholder="Enter country"
                          {...field}
                          error={meta.error}
                        />
                      </>
                    );
                  }}
                </Field>
              </SimpleGrid>
            </Container>
          </DetailModal>
        </Formik>
      )}
    </>
  );
};
export default Form;
