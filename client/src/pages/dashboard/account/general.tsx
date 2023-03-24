import React, { ReactNode } from "react";
import { EnhancedNextPage } from "@/types/next";
import AuthGaurd from "@/utils/auth-gaurd";
import SettingsLayout from "@/components/layouts/settings-layout";
import GeneralManager from "@/components/managers/account/general";

const GeneralPage: EnhancedNextPage = () => {
  return <GeneralManager />;
};

GeneralPage.getLayout = (page: ReactNode) => {
  return (
    <AuthGaurd>
      <SettingsLayout headTitle="General">{page}</SettingsLayout>
    </AuthGaurd>
  );
};

export default GeneralPage;
