import RoleBadge from "@/components/role-badge";
import Toggle from "@/components/ui-blocks/toggle";
import MiscUtils from "@/utils/misc-utils";
import { Dispatch, FC } from "react";

interface CommissionToggleProps {
  roleType: string;
  isChecked: boolean;
  onChange: Dispatch<boolean>;
}

const CommissionToggle: FC<CommissionToggleProps> = ({ roleType, isChecked, onChange }) => {
  const roleName = MiscUtils.capitalize(roleType);
  return (
    <div className="flex gap-8 mb-2">
      <Toggle label={`Enable ${roleName} commissions`} isChecked={isChecked} onChange={onChange} />
      <RoleBadge roleType={roleType}>{roleName}</RoleBadge>
    </div>
  );
};

export default CommissionToggle;
