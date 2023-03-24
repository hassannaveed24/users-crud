import DumbInputInline from "@/components/inputs/dumb/dumb-input-inline";
import React from "react";
import { Field, Form, Formik } from "formik";
import { InviteMembersSchema } from "../validations";
import ErrorManager from "@/services/error-manager";
import { FieldProps } from "@/types/formik";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";

import MemberRoleSelect from "@/components/ui-blocks/selects/member-role-select";
import { Title, Text, Button } from "@mantine/core";
import { Nullable } from "@/types/misc.type";
import { IWorkspacePermission } from "@/schemas/permission.schema";
import {
  GetInviteMemberRequest,
  GetMemberFromInviteMemberAPI,
  InviteMember,
  InviteMemberRequest,
  InviteMemberRespose,
} from "@/data/members/invite-member.data";
import ToastClient from "@/services/toast-client";
import { QueryKeys } from "@/constants/query-keys";
import { useSelectedWorkspace } from "@/data/workspace/get-workspaces.data";
import useGridContext from "@/state/contexts/grid-context";
import { UpdatePaginatedCache } from "@/data/cache.data";
import MemberPermissionSelect from "@/components/ui-blocks/selects/member-permission-select";

type InviteMembersFormValues = {
  email: string;
  roles: string[];
  permission: Nullable<IWorkspacePermission>;
};

const initialValues: InviteMembersFormValues = {
  email: "",
  roles: [],
  permission: null,
};

const InviteMembers = () => {
  const { mutate, isLoading } = useMutation<InviteMemberRespose, AxiosError, InviteMemberRequest>(InviteMember);
  const workspace = useSelectedWorkspace();
  const { setPage } = useGridContext();

  return (
    <div className="flex flex-col items-center justify-between gap-8 min-[1400px]:flex-row">
      <div className="text-center min-[1400px]:text-left shrink-0">
        <Title>Invite Members</Title>
        <Text color="textColors.1">You currently pay for 6 seats</Text>
      </div>
      <Formik
        initialValues={initialValues}
        onSubmit={async (values, { resetForm }) => {
          const result = await InviteMembersSchema.safeParseAsync(values);
          if (!result.success) {
            ErrorManager.handleZodError(result.error, { heading: "Error inviting member" });
            return;
          }

          const { email, roles, permission } = result.data;

          const payload = GetInviteMemberRequest({
            memberEmail: email,
            workspacePermissionId: permission.id,
            activeRoleIds: roles,
          });

          mutate(payload, {
            onSuccess: (data) => {
              const newlyAddedMember = GetMemberFromInviteMemberAPI(payload, data, {
                permission: permission.permission,
              });

              UpdatePaginatedCache([QueryKeys.WORKSPACE_MEMBERS, { workspaceId: workspace.id }], newlyAddedMember, {
                strategy: "increment",
                onDeleteCurrentPage: () => setPage((prev) => prev - 1),
              });

              ToastClient.success("Member has been invited to the workspace");

              resetForm();
            },
            onError: (error) => {
              ErrorManager.handleError(error, { heading: "Unable to invite team member" });
            },
          });
        }}
      >
        {(formik) => {
          return (
            <Form className="flex flex-wrap items-center justify-center flex-shrink-0 w-full gap-3 xl:w-auto">
              <div className="w-full md:w-auto">
                <Field name="email">
                  {({ field }: FieldProps) => (
                    <DumbInputInline
                      inputProps={{
                        className: "min-w-[320px]",
                        placeholder: "Enter the member's email here",
                        ...field,
                      }}
                    />
                  )}
                </Field>
              </div>

              <MemberRoleSelect
                classNames={{ control: () => "!w-[275px]" }}
                value={(roles) => roles.filter((e) => formik.values.roles.includes(e.id))}
                onChange={(opts) => {
                  formik.setFieldValue(
                    "roles",
                    opts.map((e) => e.id)
                  );
                }}
              />

              <MemberPermissionSelect
                classNames={{ control: () => "!w-[120px]" }}
                value={(permissions) => permissions.find((e) => e.id === formik.values.permission?.id)}
                onChange={(opt) => formik.setFieldValue("permission", opt)}
              />

              <Button type="submit" loading={isLoading}>
                Send Invite
              </Button>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default InviteMembers;
