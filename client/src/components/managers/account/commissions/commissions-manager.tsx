import React, { useMemo } from "react";
import Card from "@/components/ui-blocks/card";
import CommissionRow from "./components/commission-row";
import { Form, Formik } from "formik";
import { CommissionsFormValues } from "./types";
import {
  ConfigurableCommission,
  GetSelectRoleCommissionsPayload,
  SelectRoleCommissionsSchema,
  SelectRoleCommissionsPayload,
} from "./validations";
import Permissions, { claimSecurities } from "./components/permssions";
import { Title, Text, Divider, Button, Flex, LoadingOverlay } from "@mantine/core";
import { useWorkspaceRoles } from "@/data/role.data";
import MiscUtils from "@/utils/misc-utils";
import ToastClient from "@/services/toast-client";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import {
  CreateWorkspaceCommission,
  CreateWorkspaceCommissionPayload,
  GetWorkspaceRoleCommissionFromConfigurableCommission,
} from "@/data/commission/create-workspace-commission.data";
import { useDispatch } from "@/state/store";
import { workspaceActions } from "@/state/slices/workspace";
import ErrorManager from "@/services/error-manager";
import { useSelectedWorkspace } from "@/data/workspace/get-workspaces.data";
import { ValidatedAPI } from "@/utils/api";

const CommissionsManager = () => {
  const allRoles = useWorkspaceRoles();
  const dispatch = useDispatch();
  const workspace = useSelectedWorkspace();

  const initialValues = useMemo<CommissionsFormValues>(() => {
    const configurableCommissions = allRoles.map((e) => ({
      workspaceRoleCommissionId: e.id,
      type: e.commission.commissionTypeId,
      value: e.commission.commissionValue,
    }));

    return {
      commissions: MiscUtils.ArrayToHashMap(configurableCommissions, "workspaceRoleCommissionId"),
      permission: workspace.workspaceClaimSecurity?.claimSecurityId || claimSecurities[0].id,
    };
  }, [allRoles, workspace.workspaceClaimSecurity?.claimSecurityId]);

  const { mutate, isLoading } = useMutation<unknown, AxiosError, SelectRoleCommissionsPayload>(
    (payload: SelectRoleCommissionsPayload) => {
      const { commissions, permission } = payload;

      const apis = commissions.map((e) => CreateWorkspaceCommission(e));

      if (permission) apis.push(ValidatedAPI.post("/workspace/workspace-security", permission));

      return Promise.all(apis);
    }
  );

  return (
    <Formik
      enableReinitialize
      initialValues={initialValues}
      onSubmit={(values, { setFieldError }) => {
        const commissions = Object.values(values.commissions) as ConfigurableCommission[];
        const result = SelectRoleCommissionsSchema.safeParse({ ...values, commissions });

        if (!result.success) {
          const roleErrors = result.error.errors.filter((e) => e.path.includes("commissions"));

          roleErrors.forEach((e, i) => {
            const path = e.path
              .map((e) => (typeof e === "number" ? commissions[i].workspaceRoleCommissionId : e))
              .join(".");
            setFieldError(path, e.message);
          });

          ToastClient.error(
            result.error.errors.filter((e) => e.path.includes("permission")).map((e) => e.message),
            { heading: "Error updating default commissions" }
          );
          return;
        }

        mutate(GetSelectRoleCommissionsPayload(result.data), {
          onSuccess: () => {
            const updatedRoleCommissions = result.data.commissions.map((e) =>
              GetWorkspaceRoleCommissionFromConfigurableCommission(e)
            );

            dispatch(workspaceActions.setWorkspaceRoleCommissions(updatedRoleCommissions));

            ToastClient.success("Default commissions have been updated");
          },
          onError: (error) => {
            ErrorManager.handleError(error, { heading: "Error updating default commissions" });
          },
        });
      }}
    >
      {({ dirty }) => {
        return (
          <>
            {isLoading && (
              <div className="fixed inset-0 w-screen h-screen z-[500] !mt-0">
                <LoadingOverlay visible />
              </div>
            )}
            <Form>
              <section className="space-y-6">
                <Card className="space-y-6">
                  <div>
                    <Title>Commissions</Title>
                    <Text color="textColors.2">Setup the default commission rates for each role on your team</Text>
                  </div>
                  <Divider />
                  <div className="space-y-6">
                    {allRoles.map((e) => (
                      <CommissionRow key={e.id} role={e} />
                    ))}
                  </div>
                  <Divider />
                  <div>
                    <Title>Permissions</Title>
                    <Text color="textColors.2">
                      Decide how much approval you want to require when your team is claiming commissions
                    </Text>
                  </div>
                  <Divider />
                  <Permissions />
                </Card>
                <Flex justify="end" pb={48} gap={8}>
                  <Button variant="default" type="button">
                    Cancel
                  </Button>
                  <Button type="submit" disabled={!dirty}>
                    Save
                  </Button>
                </Flex>
              </section>
            </Form>
          </>
        );
      }}
    </Formik>
  );
};

export default CommissionsManager;
