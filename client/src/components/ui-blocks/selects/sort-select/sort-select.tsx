import React, { FC } from "react";
import dynamic from "next/dynamic";
import { SortSelectProps } from "./types";

const SortSelectCSR = dynamic(() => import("./sort-select-csr"), { ssr: false });

const SortSelect: FC<SortSelectProps> = (props) => {
  return <SortSelectCSR {...props} />;
};

export default SortSelect;
