import React, { FC } from "react";
import dynamic from "next/dynamic";
import { FilterSelectProps } from "./types";

const FilterSelectCSR = dynamic(() => import("./filter-select-csr"), { ssr: false });

const FilterSelect: FC<FilterSelectProps> = (props) => {
  return <FilterSelectCSR {...props} />;
};

export default FilterSelect;
