import React, { FC } from "react";
import Card from "@/components/ui-blocks/card";
import IntegrationSettingsNavbar from "./integration-settings-navbar";
import { Formik } from "formik";
import { ErroredFieldLabel } from "@/utils/validation";
import ReactSelect from "react-select";
import { getDefaultSelectClassNames, getDefaultSelectStyles } from "@/constants/select-styles";
import { Title, Button, Flex } from "@mantine/core";
export enum IntegrationChannels {
  CALENDLY = "Calendly",
  FACEBOOK = "Facebook",
  QUICKBOOKS = "Quickbooks",
  SLACK = "Slack",
  STRIPE = "Stripe",
  TIKTOK = "TikTok",
  ZOOM = "Zoom",
}

const callTypes = [
  { id: 1, type: "Sales Calls" },
  { id: 2, type: "Discovery Calls" },
] as const;

const eventListenerTypes = [
  { id: 1, type: "Contains" },
  { id: 2, type: "Equals" },
] as const;

type IntegrationChannelSettingsForm = {
  callType: typeof callTypes[number]["type"] | null;
  eventListenerType: typeof eventListenerTypes[number]["type"] | null;
};

const initialValues: IntegrationChannelSettingsForm = {
  callType: null,
  eventListenerType: null,
};

const IntegrationSettings: FC<object> = () => {
  return (
    <Formik initialValues={initialValues} onSubmit={console.log}>
      {(formik) => (
        <>
          <Card className="space-y-6">
            <Title>Integration settings</Title>
            <IntegrationSettingsNavbar />
            <div className="flex space-x-6">
              <div className="flex-1">
                <ErroredFieldLabel name="callType" id="call-type-select" className="h-[24px]">
                  Create a sales call in
                </ErroredFieldLabel>
                <ReactSelect
                  id="call-type-select"
                  placeholder="Select commission type"
                  classNames={getDefaultSelectClassNames()}
                  styles={getDefaultSelectStyles()}
                  menuPortalTarget={document?.body}
                  options={callTypes}
                  getOptionLabel={(opt) => opt.type}
                  getOptionValue={(opt) => opt.id.toString()}
                  isSearchable={false}
                  onBlur={() => formik.setFieldTouched("callType", true)}
                  onChange={(opt) => formik.setFieldValue("callType", opt?.type)}
                  value={callTypes.find((elm) => elm.type === formik.values.callType)}
                />
              </div>
              <div className="flex-1">
                <ErroredFieldLabel
                  name="eventType"
                  id="event-type-select"
                  className="h-[24px]"
                  append={
                    <ReactSelect
                      id="event-type-select"
                      placeholder="Contains"
                      controlShouldRenderValue={false}
                      classNames={getDefaultSelectClassNames({
                        placeholder: () => "!text-xs",
                        singleValue: () => "!text-xs",
                        control: () => "!min-h-[0] !rounded-[10px] !border-none !hover:border-none !bg-grey-10",
                        menu: () => "!w-[160px]",
                      })}
                      styles={getDefaultSelectStyles()}
                      menuPortalTarget={document?.body}
                      options={eventListenerTypes}
                      getOptionLabel={(opt) => opt.type}
                      getOptionValue={(opt) => opt.id.toString()}
                      isSearchable={false}
                      onBlur={() => formik.setFieldTouched("eventType", true)}
                      onChange={(opt) => formik.setFieldValue("eventType", opt?.type)}
                      value={eventListenerTypes.find((elm) => elm.type === formik.values.eventListenerType)}
                    />
                  }
                >
                  When the Calendly event title
                </ErroredFieldLabel>
                <ReactSelect
                  id="call-type-select"
                  placeholder="Select commission type"
                  classNames={getDefaultSelectClassNames()}
                  styles={getDefaultSelectStyles()}
                  menuPortalTarget={document?.body}
                  options={callTypes}
                  getOptionLabel={(opt) => opt.type}
                  getOptionValue={(opt) => opt.id.toString()}
                  isSearchable={false}
                  onBlur={() => formik.setFieldTouched("callType", true)}
                  onChange={(opt) => formik.setFieldValue("callType", opt?.type)}
                  value={callTypes.find((elm) => elm.type === formik.values.callType)}
                />
              </div>
            </div>
          </Card>
          <Flex justify="end" pb={48} gap={8}>
            <Button variant="default">Cancel</Button>
            <Button>Save</Button>
          </Flex>
        </>
      )}
    </Formik>
  );
};

export default IntegrationSettings;
