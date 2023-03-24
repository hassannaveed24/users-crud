import { EnhancedNextPage } from "@/types/next";
import AuthGaurd from "@/utils/auth-gaurd";
import SettingsLayout from "@/components/layouts/settings-layout";
import CommissionsManager from "@/components/managers/account/commissions";

const CommissionsPage: EnhancedNextPage = () => {
  return <CommissionsManager />;
};

CommissionsPage.getLayout = (page) => (
  <AuthGaurd>
    <SettingsLayout headTitle="Commissions">{page}</SettingsLayout>
  </AuthGaurd>
);

export default CommissionsPage;
