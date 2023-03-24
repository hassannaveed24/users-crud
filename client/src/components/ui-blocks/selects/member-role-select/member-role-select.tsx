import React, { FC } from "react";
import dynamic from "next/dynamic";
import { MemberRoleSelectProps } from "./types";

const MemberRoleSelectCSR = dynamic(() => import("./member-role-select-csr"), { ssr: false });

const MemberRoleSelect: FC<MemberRoleSelectProps> = (props) => {
  return <MemberRoleSelectCSR {...props} />;
};

export default MemberRoleSelect;
