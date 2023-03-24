import { Formik } from "formik";
import React, { DispatchWithoutAction, FC, useMemo } from "react";

import MemberPermissionSelect from "@/components/ui-blocks/selects/member-permission-select";
import MemberRoleSelect from "@/components/ui-blocks/selects/member-role-select";
import Toggle from "@/components/ui-blocks/toggle";
import { accessRights } from "@/constants/data";
import CommissionRow from "../components/commission-row";
import Checkbox from "@/components/ui-blocks/checkbox";
import { ModalProps } from "@/components/ui-blocks/grid/context";
import { Title, Stack, Text, Flex, Divider } from "@mantine/core";
import { IWorkspaceMember } from "@/schemas/member.schema";
import { useWorkspacePermissions } from "@/data/permission.data";
import MiscUtils from "@/utils/misc-utils";
import {
  EditMemberSchema,
  EditWorkspaceMemberFormValues,
  GetEditMemberRequest,
  EditMember,
  EditMemberRequest,
  UpdateEditedMemberCache,
  ConfigurableRole,
} from "@/data/members/edit-member.data";
import ErrorManager from "@/services/error-manager";
import cls from "classnames";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import ToastClient from "@/services/toast-client";
import Modal from "@/components/ui-blocks/modal";

const EditMemberModal: FC<ModalProps<IWorkspaceMember>> = (modalProps) => {
  const { isVisible, setVisibility, data: selectedMember, setData } = modalProps;

  const allPermissions = useWorkspacePermissions();

  const initialValues = useMemo<EditWorkspaceMemberFormValues>(
    () => ({
      permission: allPermissions.find((e) => e.id === selectedMember?.workspacePermissionId),
      roles: MiscUtils.ArrayToHashMap<ConfigurableRole>(
        (selectedMember?.workspaceMemberRole || [])
          .filter((e) => e.isActive)
          .map((e) => ({
            salesRoleId: e.salesRoleId,
            commissionTypeId: e.commission.commissionTypeId,
            commissionValue: e.commission.commissionValue,
            isCustomCommission: e.isCustomCommission,
          })),
        "salesRoleId"
      ),
      isCustomPermission: Boolean(selectedMember?.isCustomPermission),
      homeDashboard: selectedMember?.permission.homeDashboard || false,
      setterDashboard: selectedMember?.permission.setterDashboard || false,
      closerDashboard: selectedMember?.permission.closerDashboard || false,
      fbDashboard: selectedMember?.permission.fbDashboard || false,
    }),
    [
      allPermissions,
      selectedMember?.isCustomPermission,
      selectedMember?.permission.closerDashboard,
      selectedMember?.permission.fbDashboard,
      selectedMember?.permission.homeDashboard,
      selectedMember?.permission.setterDashboard,
      selectedMember?.workspaceMemberRole,
      selectedMember?.workspacePermissionId,
    ]
  );

  const { mutate, isLoading } = useMutation<unknown, AxiosError, EditMemberRequest>(EditMember);

  const toggleModal = (reset: DispatchWithoutAction) => {
    reset();
    setData(undefined);
    setVisibility((prev) => !prev);
  };

  return (
    <Formik
      enableReinitialize
      initialValues={initialValues}
      onSubmit={async ({ roles: rolesMap, ...values }, { resetForm }) => {
        const result = await EditMemberSchema.safeParseAsync({
          ...values,
          roles: Object.values(rolesMap),
        });

        if (!result.success) {
          ErrorManager.handleZodError(result.error, { heading: "Error editing the member" });
          return;
        }

        const payload = GetEditMemberRequest(result.data, selectedMember as IWorkspaceMember);

        mutate(payload, {
          onSuccess: () => {
            UpdateEditedMemberCache(payload, { selectedMember: selectedMember as IWorkspaceMember });
            toggleModal(resetForm);
            ToastClient.success("Member has been edited");
          },
          onError: (error) => {
            ErrorManager.handleError(error, { heading: "Error editing member" });
          },
        });
      }}
    >
      {({ values, setFieldValue, resetForm }) => {
        return (
          <Modal
            opened={isVisible}
            onClose={() => toggleModal(resetForm)}
            loading={isLoading}
            title="User Settings"
            maxHeight={550}
          >
            <Stack spacing={24}>
              <div>
                <Title weight={600} fz="sm" color="textColors.1">
                  Access Rights
                </Title>
                <MemberPermissionSelect
                  classNames={{}}
                  value={() => values.permission}
                  onChange={(opt) => setFieldValue("permission", opt)}
                />
              </div>

              <div>
                <Title weight={600} fz="sm" color="textColors.1">
                  Sales Role
                </Title>
                <MemberRoleSelect
                  value={(roles) => {
                    const roleIds = Object.keys(values.roles);
                    return roles.filter((e) => roleIds.includes(e.salesRoleId));
                  }}
                  onChange={(opts) => {
                    const updatedActiveRoles = opts.map((e) => {
                      const persistedRole = values.roles[e.salesRoleId];

                      if (persistedRole) return persistedRole;

                      const constructedRole: ConfigurableRole = {
                        salesRoleId: e.salesRoleId,
                        commissionTypeId: e.commission.commissionTypeId,
                        commissionValue: e.commission.commissionValue,
                        isCustomCommission: false,
                      };

                      return constructedRole;
                    });

                    setFieldValue(
                      "roles",
                      MiscUtils.ArrayToHashMap<ConfigurableRole>(updatedActiveRoles, "salesRoleId")
                    );
                  }}
                />
              </div>

              <Divider />

              <Title weight={600} fz="sm" color="textColors.1">
                Custom Commissions
              </Title>

              {Object.values(values.roles).map((e) => (
                <CommissionRow key={e!.salesRoleId} configurableRole={e as ConfigurableRole} />
              ))}

              <Divider />

              <div className={cls("w-full flex justify-between items-center", { "pb-4": !values.isCustomPermission })}>
                <Title weight={600} fz="sm" color="textColors.1">
                  Custom Access Rights
                </Title>
                <Toggle
                  label="Enable custom access rights"
                  isChecked={values.isCustomPermission}
                  onChange={(checked) => setFieldValue("isCustomPermission", checked)}
                />
              </div>

              {values.isCustomPermission && (
                <Stack spacing={16} pb={48}>
                  {accessRights.map((e) => (
                    <Flex key={e.label} w="100%">
                      <Text weight={500} color="textColors.1" sx={{ flexGrow: 1 }}>
                        {e.label}
                      </Text>
                      <Checkbox
                        label={`Enable ${e.label}`}
                        className="!rounded-[4px] !inline-block float-right"
                        isChecked={Boolean(values[e.field])}
                        onChange={(checked) => setFieldValue(e.field, checked)}
                      />
                    </Flex>
                  ))}
                </Stack>
              )}
            </Stack>
          </Modal>
        );
      }}
    </Formik>
  );
};

export default EditMemberModal;
