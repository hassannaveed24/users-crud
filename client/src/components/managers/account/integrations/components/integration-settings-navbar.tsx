import { useRouter } from "next/router";
import React, { FC } from "react";
import { IntegrationChannels } from "./integration-settings";
import HorizontalNav from "@/components/ui-blocks/horizontal-nav";

interface ChannelOption {
  id: number;
  value: IntegrationChannels;
}

const IntegrationSettingsNavbar: FC<object> = () => {
  const router = useRouter();

  const allChannels: readonly ChannelOption[] = Object.values(IntegrationChannels).map((e, i) => ({
    id: i + 1,
    value: e,
  }));

  const matchChannel = (opt: ChannelOption) => router.query.integration_channel === opt.value.toLowerCase();
  const selectedChannel = allChannels.find(matchChannel);

  return (
    <HorizontalNav
      label="Select integration settings channel"
      id="integration-channel-select"
      options={allChannels}
      value={selectedChannel}
      getOptionLabel={(opt) => opt?.value || ""}
      getOptionValue={(opt) => opt?.id.toString() || ""}
      onChange={(opt) => {
        if (opt.id === selectedChannel?.id) return null;
        router.push(
          {
            pathname: router.pathname,
            query: {
              ...router.query,
              integration_channel: opt.value.toLowerCase(),
            },
          },
          undefined,
          { shallow: true }
        );
      }}
    />
  );
};

export default IntegrationSettingsNavbar;
