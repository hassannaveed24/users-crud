import { useRouter } from "next/router";
import { ParsedUrlQuery } from "querystring";
import { IntegrationChannels } from "../integrations/components/integration-settings";
import HorizontalNav from "@/components/ui-blocks/horizontal-nav";

interface TabOption {
  name: string;
  href: string;
  query?: ParsedUrlQuery;
}

const tabs: readonly TabOption[] = [
  { name: "General", href: "/dashboard/account/general" },
  {
    name: "Integrations",
    href: `/dashboard/account/integrations`,
    query: { integration_channel: IntegrationChannels.CALENDLY.toLowerCase() },
  },
  { name: "Team Members", href: "/dashboard/account/team-members" },
  { name: "Commissions", href: "/dashboard/account/commissions" },
  { name: "Products", href: "/dashboard/account/products" },
  { name: "Notifications", href: "/dashboard/account/notifications" },
];

const AccountNav: React.FunctionComponent<Record<string, never>> = () => {
  const router = useRouter();
  const matchTab = (e: TabOption) => router.pathname.includes(e.href);
  const selectedTab = tabs.find(matchTab);

  return (
    <HorizontalNav
      label="Select integration settings channel"
      id="integration-channel-select"
      options={tabs}
      value={selectedTab}
      getOptionLabel={(opt) => opt?.name || ""}
      getOptionValue={(opt) => opt?.href.toString() || ""}
      onChange={(opt) => {
        if (opt.href === selectedTab?.href) return null;
        router.push({
          pathname: opt.href,
          query: { ...router.query, ...(opt.query || {}) },
        });
      }}
    />
  );
};

export default AccountNav;
