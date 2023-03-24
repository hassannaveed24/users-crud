import React, { FC } from "react";

import NotificationRow from "./notification-row";
import Grid from "@/components/ui-blocks/grid";
import Toggle from "@/components/ui-blocks/toggle";
import { useFormikContext } from "formik";
import { NotificationsFormValues } from "../types";

export const dealNotifications = [
  { name: "Won Deals", description: "News, announcements, and product updates." },
  { name: "Lost Deals", description: "Important notifications about your account security." },
] as const;

const NotificationsGrid: FC<Record<string, never>> = () => {
  // const { page, limit, sort, debouncedSearch } = useGridContext();
  // const query = useTeamMembers({
  //   page,
  //   limit,
  //   sort,
  //   search: debouncedSearch,
  // });

  // const { pages = [], data = [] } = query.data || {};

  const { values, setFieldValue } = useFormikContext<NotificationsFormValues>();

  return (
    <>
      <Grid.Base className="min-w-[660px]" context={{ isEmpty: false }}>
        <Grid.Header>
          <Grid.Heading className="flex-[6]"></Grid.Heading>
          <Grid.Heading className="flex-1">Email</Grid.Heading>
          <Grid.Heading className="flex-1">Phone</Grid.Heading>
          <Grid.Heading className="flex-1">Web</Grid.Heading>
        </Grid.Header>
        <Grid.Body>
          <Grid.Row>
            <Grid.Cell className="flex-[6]">
              <p className="font-medium text-blue-1">Won Deals</p>
              <p className="text-grey-5">News, announcements, and product updates.</p>
            </Grid.Cell>
            <Grid.Cell className="flex-1">
              <Toggle
                label={`Toggle won deals email notification`}
                isChecked={values.wdEmail}
                onChange={(checked) => {
                  setFieldValue("wdEmail", checked);
                }}
              />
            </Grid.Cell>
            <Grid.Cell className="flex-1">
              <Toggle
                label={`Toggle won deals phone notification`}
                isChecked={values.wdPhone}
                onChange={(checked) => {
                  setFieldValue("wdPhone", checked);
                }}
              />
            </Grid.Cell>
            <Grid.Cell className="flex-1">
              <Toggle
                label={`Toggle won deals web notification`}
                isChecked={values.wdWeb}
                onChange={(checked) => {
                  setFieldValue("wdWeb", checked);
                }}
              />
            </Grid.Cell>
          </Grid.Row>
          <Grid.Row>
            <Grid.Cell className="flex-[6]">
              <p className="font-medium text-blue-1">Lost Deals</p>
              <p className="text-grey-5">Important notifications about your account security.</p>
            </Grid.Cell>
            <Grid.Cell className="flex-1">
              <Toggle
                label={`Toggle lost deals email notification`}
                isChecked={values.ldEmail}
                onChange={(checked) => {
                  setFieldValue("ldEmail", checked);
                }}
              />
            </Grid.Cell>
            <Grid.Cell className="flex-1">
              <Toggle
                label={`Toggle lost deals phone notification`}
                isChecked={values.ldPhone}
                onChange={(checked) => {
                  setFieldValue("ldPhone", checked);
                }}
              />
            </Grid.Cell>
            <Grid.Cell className="flex-1">
              <Toggle
                label={`Toggle lost deals web notification`}
                isChecked={values.ldWeb}
                onChange={(checked) => {
                  setFieldValue("ldWeb", checked);
                }}
              />
            </Grid.Cell>
          </Grid.Row>
        </Grid.Body>
      </Grid.Base>
    </>
  );
};

export default NotificationsGrid;
