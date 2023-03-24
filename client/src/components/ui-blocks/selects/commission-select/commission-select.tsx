import dynamic from "next/dynamic";
import React, { FC } from "react";
import { CommissionSelectProps } from "./types";
const CommissionSelectCSR = dynamic(() => import("./commission-select-csr"), { ssr: false });

const CommissionSelect: FC<CommissionSelectProps> = (props) => {
  return <CommissionSelectCSR {...props} />;
};

export default CommissionSelect;
