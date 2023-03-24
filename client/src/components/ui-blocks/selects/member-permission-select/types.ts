import { IWorkspacePermission } from "@/schemas/permission.schema";
import { Nullable } from "@/types/misc.type";
import { ClassNamesConfig, SingleValue } from "react-select";
import { Dispatch } from "react";

export interface MemberPermissionSelectProps {
  classNames: ClassNamesConfig<IWorkspacePermission>;
  value: (permissions: IWorkspacePermission[]) => Nullable<IWorkspacePermission>;
  onChange: Dispatch<SingleValue<IWorkspacePermission>>;
}
