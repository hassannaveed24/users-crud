import { EnhancedNextPage } from "@/types/next";
import AuthGaurd from "@/utils/auth-gaurd";
import SettingsLayout from "@/components/layouts/settings-layout";
import NotificationsManager from "@/components/managers/account/notifications/notifications-manager";

const NotificationsPage: EnhancedNextPage = () => {
  return <NotificationsManager />;
};

NotificationsPage.getLayout = (page) => (
  <AuthGaurd>
    <SettingsLayout headTitle="Notifications">{page}</SettingsLayout>
  </AuthGaurd>
);

export default NotificationsPage;
