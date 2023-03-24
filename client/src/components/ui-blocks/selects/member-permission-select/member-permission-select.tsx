import dynamic from "next/dynamic";
import React, { FC } from "react";
import MemberPermissionSelectCSR from "./member-permission-select-csr";
import { MemberPermissionSelectProps } from "./types";

// const MemberPermissionSelectCSR = dynamic(() => import("./member-permission-select-csr"), { ssr: false });

const MemberPermissionSelect: FC<MemberPermissionSelectProps> = (props) => {
  return <MemberPermissionSelectCSR {...props} />;
};

export default MemberPermissionSelect;
