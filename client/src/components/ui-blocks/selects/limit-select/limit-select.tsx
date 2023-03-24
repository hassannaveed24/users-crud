import dynamic from "next/dynamic";
import { FC } from "react";
import { LimitSelectProps } from "./types";

const LimitSelectCSR = dynamic(() => import("./limit-select-csr"), { ssr: false });

const LimitSelect: FC<LimitSelectProps> = (props) => {
  return <LimitSelectCSR {...props} />;
};

export default LimitSelect;
