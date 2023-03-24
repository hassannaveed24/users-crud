import { getDefaultSelectClassNames, getDefaultSelectStyles } from "@/constants/select-styles";
import React, { FC } from "react";
import ReactSelect, {
  ValueContainerProps,
  components,
  MultiValueGenericProps,
  MultiValueProps,
  MultiValueRemoveProps,
} from "react-select";
import MiscUtils from "@/utils/misc-utils";
import { MemberRoleSelectProps } from "./types";
import { useWorkspaceRoles } from "@/data/role.data";
import { IWorkspaceRoleCommission } from "@/schemas/role.schema";
import cls from "classnames";

const MultiValueRemove: FC<MultiValueRemoveProps<IWorkspaceRoleCommission, true>> = ({ children, ...props }) => {
  return <components.MultiValueRemove {...props}>{children}</components.MultiValueRemove>;
};

const MultiValue: FC<MultiValueProps<IWorkspaceRoleCommission, true>> = ({ children, ...props }) => {
  return (
    <components.MultiValue
      className={cls("!inline-flex !px-1.5 !text-xs !font-semibold !leading-5 !rounded-full !cursor-pointer", {
        "!text-purple-5 !bg-purple-10": props.data.salesRole.roleType === "CLOSER",
        "!text-blue-7 !bg-blue-10": props.data.salesRole.roleType !== "CLOSER",
      })}
      {...props}
    >
      {children}
    </components.MultiValue>
  );
};

const MemberRoleSelectCSR: FC<MemberRoleSelectProps> = ({ classNames, value, onChange, ...selectProps }) => {
  const allRoles = useWorkspaceRoles();

  return (
    <ReactSelect
      isMulti
      // isSearchable={false}
      menuPortalTarget={document.body}
      classNames={getDefaultSelectClassNames(classNames)}
      styles={getDefaultSelectStyles()}
      placeholder="Roles"
      options={allRoles}
      getOptionLabel={(opt) => MiscUtils.capitalize(opt.salesRole.roleType)}
      getOptionValue={(opt) => opt.id}
      components={{ MultiValue, MultiValueRemove }}
      value={value?.(allRoles)}
      onChange={(opts) => onChange(opts, allRoles)}
      {...selectProps}
    />
  );
};

export default MemberRoleSelectCSR;
