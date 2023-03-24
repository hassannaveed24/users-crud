import { ReactNode } from "react";
import AuthGaurd from "@/utils/auth-gaurd";
import SettingsLayout from "@/components/layouts/settings-layout";
import { EnhancedNextPage } from "@/types/next";
import IntegrationsManager from "@/components/managers/account/integrations";

const IntegrationsPage: EnhancedNextPage = () => {
  return <IntegrationsManager />;
};

IntegrationsPage.getLayout = (page: ReactNode) => {
  return (
    <AuthGaurd>
      <SettingsLayout headTitle="Integrations">{page}</SettingsLayout>
    </AuthGaurd>
  );
};

export default IntegrationsPage;
