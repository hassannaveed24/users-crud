import { HashMap } from "@/types/misc.type";
import { ConfigurableCommission } from "./validations";

export type CommissionsFormValues = {
  commissions: HashMap<ConfigurableCommission>;
  permission: string;
};
