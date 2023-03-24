import DashboardLayout from "@/layouts/dashboard.layout";
import { EnhancedNextPage } from "@/types/next";
import AuthGaurd from "@/utils/auth-gaurd";

const HomePage: EnhancedNextPage = () => {
  return <h1>Welcome To Users CRUD</h1>;
};

HomePage.getLayout = (page) => (
  <AuthGaurd>
    <DashboardLayout>{page}</DashboardLayout>
  </AuthGaurd>
);

export default HomePage;
