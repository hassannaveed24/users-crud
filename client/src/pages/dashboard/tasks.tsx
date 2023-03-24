import React from "react";
import { EnhancedNextPage } from "@/types/next";
import DashboardLayout from "@/components/layouts/dashboard-layout";
import AllTasksManager from "@/components/managers/tasks/all-tasks-manager";

const AllTasksPage: EnhancedNextPage = () => {
  return <AllTasksManager />;
};

AllTasksPage.getLayout = (page) => {
  return <DashboardLayout pageTitle="">{page}</DashboardLayout>;
};

export default AllTasksPage;
