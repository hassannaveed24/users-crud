import { NextPage } from "next";
import { NextRouter } from "next/router";
import { ReactElement } from "react";

export type EnhancedNextPage = NextPage & {
  getLayout?: (page: ReactElement, meta: { router: NextRouter }) => ReactElement;
};
