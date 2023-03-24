import { createEmotionCache } from "@mantine/core";

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { createStylesServer, ServerStyles } from "@mantine/next";
import { FC, PropsWithChildren } from "react";
import { MantineProvider } from "@mantine/core";

export const mantineCache = createEmotionCache({
  key: "mantine",
});

export const stylesServer = createStylesServer(mantineCache);

export const extractMantineStyles = ({ styles, ...nextProps }: any) => {
  return { ...nextProps, styles: [styles, <ServerStyles html={nextProps.html} server={stylesServer} key="styles" />] };
};

export const MantineWrapper: FC<PropsWithChildren> = ({ children }) => {
  return (
    <MantineProvider withGlobalStyles withNormalizeCSS emotionCache={mantineCache}>
      {children}
    </MantineProvider>
  );
};
