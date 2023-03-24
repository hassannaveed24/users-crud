import type { AppProps } from "next/app";
import Head from "next/head";
import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.min.css";
import { Hydrate, QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider } from "react-redux";
import store, { useSelector } from "@/state/store";
import { FC } from "react";
import { EnhancedNextPage } from "@/types/next";
import { Router, useRouter } from "next/router";
import nprogress from "nprogress";
import "react-loading-skeleton/dist/skeleton.css";
import "react-perfect-scrollbar/dist/css/styles.css";

import "../assets/styles/tailwind.css";

import { MantineWrapper } from "@/utils/mantine";
import { GetSelectedWorkspace } from "@/data/workspace/get-workspaces.data";
import { ModalsProvider } from "@mantine/modals";

export const qc = new QueryClient({
  defaultOptions: {
    mutations: {
      retry: 0,
    },
    queries: {
      retry: 0,
      staleTime: Infinity,
      cacheTime: Infinity,
    },
  },
});

interface EnhancedAppProps extends AppProps {
  Component: EnhancedNextPage;
}

Router.events.on("routeChangeStart", nprogress.start);
Router.events.on("routeChangeError", nprogress.done);
Router.events.on("routeChangeComplete", nprogress.done);

const RTKApp: FC<EnhancedAppProps> = ({ Component, pageProps }) => {
  const router = useRouter();
  const getLayout = Component.getLayout ?? ((page) => page);

  const selectedWorkspace = useSelector((state) => {
    const { allWorkspaces, selectedWorkspaceId } = state.workspace;
    if (allWorkspaces.length <= 0 || !selectedWorkspaceId) return null;
    return GetSelectedWorkspace(selectedWorkspaceId, { allWorkspaces });
  });

  const workspaceFavicon = selectedWorkspace?.workspaceFavicon || "/favicon.ico";
  const faviconURL = workspaceFavicon.includes(".ico") ? workspaceFavicon : "/favicon.ico";

  return (
    <>
      <Head>
        <title>Users CRUD</title>
        <meta content="width=device-width, initial-scale=1" name="viewport" />
        <link rel="icon" href={faviconURL} />
      </Head>

      <MantineWrapper>
        <ModalsProvider labels={{ confirm: "Submit", cancel: "Cancel" }}>
          <QueryClientProvider client={qc}>
            <Hydrate state={pageProps.dehydratedState}>
              {getLayout(<Component {...pageProps} />, { router })}
              <ToastContainer toastClassName="!p-4" hideProgressBar />
            </Hydrate>
          </QueryClientProvider>
        </ModalsProvider>
      </MantineWrapper>
    </>
  );
};

const EnhancedApp: FC<EnhancedAppProps> = (props) => {
  return (
    <Provider store={store}>
      <RTKApp {...props} />
    </Provider>
  );
};

export default EnhancedApp;
