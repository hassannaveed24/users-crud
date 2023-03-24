import { useFormikContext } from "formik";
import React, { FC } from "react";
import { NotificationsFormValues } from "../types";
import { dealNotifications } from "./notificiations-grid";
import _cloneDeep from "lodash/cloneDeep";
import Toggle from "@/components/ui-blocks/toggle";
import Grid from "@/components/ui-blocks/grid";
type NotificationRowProps = {
  data: typeof dealNotifications[number];
};

const NotificationChannelToggle: FC<{ name: keyof NotificationsFormValues }> = ({ name }) => {
  const { values, setFieldValue } = useFormikContext<NotificationsFormValues>();

  return (
    <Toggle
      label={`Toggle notification`}
      isChecked={values[name]}
      onChange={(checked) => {
        setFieldValue(name, checked);
      }}
    />
  );
};

const NotificationRow: FC<NotificationRowProps> = (props) => {
  const { data } = props;

  return (
    <>
      <Grid.Row>
        <Grid.Cell className="flex-[6]">
          <p className="font-medium text-blue-1">{data.name}</p>
          <p className="text-grey-5">{data.description}</p>
        </Grid.Cell>
        <Grid.Cell className="flex-1">
          <NotificationChannelToggle deal={data} channel={NotificationChannels.EMAIL} />
        </Grid.Cell>
        <Grid.Cell className="flex-1">
          <NotificationChannelToggle deal={data} channel={NotificationChannels.PHONE} />
        </Grid.Cell>
        <Grid.Cell className="flex-1">
          <NotificationChannelToggle deal={data} channel={NotificationChannels.WEB} />
        </Grid.Cell>
      </Grid.Row>
    </>
  );
};

export default NotificationRow;
