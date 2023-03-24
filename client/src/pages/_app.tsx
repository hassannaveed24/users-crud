import type { AppProps } from "next/app";
import Head from "next/head";
import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.min.css";
import { Hydrate, QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider } from "react-redux";
import store from "@/state/store";
import { FC } from "react";
import { EnhancedNextPage } from "@/types/next";
import { Router, useRouter } from "next/router";
import nprogress from "nprogress";
import "react-loading-skeleton/dist/skeleton.css";
import "react-perfect-scrollbar/dist/css/styles.css";

import "../assets/styles/tailwind.css";

import { MantineWrapper } from "@/utils/mantine";

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

  return (
    <>
      <Head>
        <title>Users CRUD</title>
        <meta content="width=device-width, initial-scale=1" name="viewport" />
        <link rel="icon" href={"/favicon.ico"} />
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
