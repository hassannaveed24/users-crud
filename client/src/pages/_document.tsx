import { extractMantineStyles } from "@/utils/mantine";
import Document, { Html, Head, Main, NextScript, DocumentContext, DocumentInitialProps } from "next/document";
import Script from "next/script";
import { FC } from "react";

const EnhancedDocument: FC<DocumentInitialProps> = () => {
  return (
    <Html>
      <Head>
        {/* eslint-disable-next-line @next/next/no-css-tags */}
        <link rel="stylesheet" href="/css/nprogress.css" />

        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </Head>
      <body>
        <Main />
        <div id="portal" />
        <NextScript />
        <Script src="nprogress.js"></Script>
      </body>
    </Html>
  );
};

export const getInitialProps = async (ctx: DocumentContext) => {
  const initialProps = await Document.getInitialProps(ctx);
  return extractMantineStyles(initialProps);
};

export default EnhancedDocument;
