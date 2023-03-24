import { UserRoles } from "@/schemas/user.schema";

// field is object key in Permission type
export const accessRights = [
  { field: "homeDashboard", label: "Home Dashboard" },
  { field: "closerDashboard", label: "Closer Dashboard" },
  { field: "setterDashboard", label: "Setter Dashboard" },
  { field: "fbDashboard", label: "Facebook Ads Dashboard" },
] as const;

export type AccessRight = typeof accessRights[number];

export const FilterMatchTypes = [
  { label: "contains", value: "contains" },
  { label: "does not contain", value: "doesNotContain" },
  { label: "equal to", value: "equalTo" },
  { label: "not equal to", value: "notEqualTo" },
  { label: "is empty", value: "isEmpty" },
  { label: "is not empty", value: "isNotEmpty" },
] as const;

export type FilterMatchType = typeof FilterMatchTypes[number];

export const DEFAULT_AVATAR = "https://cdn.salesgod.dev/user/avatar/2.png";

export enum SingleRouteAction {
  ADD,
  EDIT,
  NONE,
}

export const userRoles = [
  { value: UserRoles.MEMBER, label: "Member" },
  { value: UserRoles.ADMIN, label: "Admin" },
];
