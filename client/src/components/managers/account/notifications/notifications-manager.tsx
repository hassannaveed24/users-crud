import React, { FC, useMemo } from "react";
import Card from "@/components/ui-blocks/card";
import { Form, Formik } from "formik";
import { validateFromZod } from "@/utils/validation";
import { NotificationsFormValues } from "./types";
import { SelectRoleCommissionsSchema } from "../commissions/validations";
import NotificationsGrid from "./components/notificiations-grid";
import { Title, Text, Flex, Button } from "@mantine/core";
import { useSelectedWorkspace } from "@/data/workspace/get-workspaces.data";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { ValidatedAPI } from "@/utils/api";
import cuid from "cuid";
import { useDispatch } from "@/state/store";
import { workspaceActions } from "@/state/slices/workspace";
import { INotification } from "@/schemas/notification.schema";
import ToastClient from "@/services/toast-client";
import ErrorManager from "@/services/error-manager";

interface CreateNotificationPayload extends NotificationsFormValues {
  workspaceId: string;
  notificationId: string;
}

const NotificationsManager = () => {
  const workspace = useSelectedWorkspace();

  const initialValues = useMemo<NotificationsFormValues>(() => {
    const {
      wdEmail = false,
      wdPhone = false,
      wdWeb = false,
      ldEmail = false,
      ldPhone = false,
      ldWeb = false,
    } = workspace.notification || {};
    return {
      wdEmail,
      wdPhone,
      wdWeb,
      ldEmail,
      ldPhone,
      ldWeb,
    };
  }, [workspace.notification]);

  const dispatch = useDispatch();

  const { mutate, isLoading } = useMutation<INotification, AxiosError, CreateNotificationPayload>((payload) =>
    ValidatedAPI.post<INotification, CreateNotificationPayload>("/workspace/workspace-notification", payload)
  );

  return (
    <Formik
      enableReinitialize
      initialValues={initialValues}
      validate={validateFromZod(SelectRoleCommissionsSchema)}
      onSubmit={(values) => {
        const payload = { ...values, notificationId: workspace.notification?.id || cuid(), workspaceId: workspace.id };
        return mutate(payload, {
          onSuccess: (data) => {
            dispatch(workspaceActions.updateWorkspaceNotifications({ notification: data, workspaceId: workspace.id }));
            ToastClient.success("Workspace notifications have been updated");
          },
          onError: (err) => {
            ErrorManager.handleError(err, { heading: "Error updating workspace notifications" });
          },
        });
      }}
    >
      <Form>
        <section className="space-y-6">
          <Card className="space-y-6">
            <div>
              <Title>Notification Settings</Title>
              <Text color="textColors.2">
                Choose where you want to get notified when key results happen in your sales team
              </Text>
            </div>
            <div className="border-t border-grey-9"></div>
            <NotificationsGrid />
          </Card>
          <Flex justify="end" pb={48} gap={8}>
            <Button variant="default">Cancel</Button>
            <Button>Save</Button>
          </Flex>
        </section>
      </Form>
    </Formik>
  );
};

export default NotificationsManager;
