import React, { FC } from "react";
import Card from "@/components/ui-blocks/card";
import IntegrationSettings from "./components/integration-settings";
import Head from "next/head";
import { useSelector } from "@/state/store";
import { Button, Title, Text } from "@mantine/core";

const IntegrationsManager: FC<Record<string, never>> = () => {
  const selectedWorkspace = useSelector((state) => state.workspace.selectedWorkspaceId as string);

  return (
    <>
      <Head>
        <script
          src="https://labs.pathfix.com/helper.js"
          data-user-id={selectedWorkspace}
          id="pinc.helper"
          modules="pinc.oauth.min"
          data-public-key="F4A11EDF-83B4-47CB-BDBD-16E691BFE2A0"
          async
        />
      </Head>

      <section className="space-y-6">
        <Card className="space-y-6">
          <div>
            <Title>Connect Your Tools</Title>
            <Text color="textColors.2">Sync data in from any platfrom</Text>
          </div>
          <div
            data-oauth-ui="list-columns"
            data-oauth-ui-switches="statusOn,disconnect"
            data-oauth-icon-size="Medium"
            data-oauth-button-color="#000000"
            data-oauth-ui-providers=""
            data-oauth-ui-providerTypes=""
          />
        </Card>
        <div className="flex justify-end w-full gap-2">
          <Button variant="default">Cancel</Button>
          <Button>Save</Button>
        </div>
        <IntegrationSettings />
      </section>
    </>
  );
};

export default IntegrationsManager;
