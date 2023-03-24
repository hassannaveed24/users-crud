import { INITIAL_PAGE } from "@/constants/navigation";
import AuthClient from "@/services/auth-client";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";

const AuthenticationCallbackPage: NextPage = () => {
  const router = useRouter();
  useEffect(() => {
    (async () => {
      const query = window.location.search;

      const isCleanURL = query.includes("code=") && query.includes("state=");

      if (!isCleanURL) return router.replace("/");

      const appState = await AuthClient.Provider.loginCallback();

      const returnUrl = appState?.return_url || INITIAL_PAGE;
      router.replace(returnUrl);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <></>;
};

export default AuthenticationCallbackPage;
