import ContactsLayout from "@/components/layouts/contacts-layout";
import AllContactsManager from "@/components/managers/contacts/all-contacts/all-contacts-manager";
import { EnhancedNextPage } from "@/types/next";
import React from "react";

const AllContactsPage: EnhancedNextPage = () => {
  return <AllContactsManager />;
};

AllContactsPage.getLayout = (page) => {
  return <ContactsLayout headTitle="Contacts">{page}</ContactsLayout>;
};

export default AllContactsPage;
