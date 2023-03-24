import { EnhancedNextPage } from "@/types/next";
import AuthGaurd from "@/utils/auth-gaurd";
import TeamMembersManager from "@/components/managers/account/team-members";
import SettingsLayout from "@/components/layouts/settings-layout";

const TeamMembersPage: EnhancedNextPage = () => {
  return <TeamMembersManager />;
};

TeamMembersPage.getLayout = (page) => (
  <AuthGaurd>
    <SettingsLayout headTitle="Team Members">{page}</SettingsLayout>
  </AuthGaurd>
);

export default TeamMembersPage;
