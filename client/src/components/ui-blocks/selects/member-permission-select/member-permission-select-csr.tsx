import { getDefaultSelectClassNames, getDefaultSelectStyles } from "@/constants/select-styles";
import React, { FC } from "react";
import ReactSelect from "react-select";
import MiscUtils from "@/utils/misc-utils";
import { MemberPermissionSelectProps } from "./types";
import { useWorkspacePermissions } from "@/data/permission.data";

const MemberPermissionSelectCSR: FC<MemberPermissionSelectProps> = ({ classNames, value, onChange }) => {
  const allPermissions = useWorkspacePermissions();

  return (
    <ReactSelect
      isSearchable={false}
      menuPortalTarget={document.body}
      classNames={getDefaultSelectClassNames(classNames)}
      styles={getDefaultSelectStyles()}
      placeholder="Access"
      options={allPermissions}
      getOptionLabel={(opt) => MiscUtils.capitalize(opt.permission.permissionType)}
      getOptionValue={(opt) => opt.id}
      value={value(allPermissions)}
      onChange={onChange}
    />
  );
};

export default MemberPermissionSelectCSR;
