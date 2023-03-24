import { IWorkspaceRoleCommission } from "@/schemas/role.schema";
import { Nullable } from "@/types/misc.type";
import { Dispatch } from "react";
import { ClassNamesConfig, MultiValue } from "react-select";
import { StateManagerProps } from "react-select/dist/declarations/src/useStateManager";

export interface MemberRoleSelectProps {
  value: (roles: IWorkspaceRoleCommission[]) => IWorkspaceRoleCommission[];
  onChange: (opts: MultiValue<IWorkspaceRoleCommission>, roles: IWorkspaceRoleCommission[]) => void;
  classNames?: ClassNamesConfig<IWorkspaceRoleCommission>;
}
