import Commission from "@/components/commissions";
import CommissionSelect from "@/components/ui-blocks/selects/commission-select";
import { commissions } from "@/data/commission/commission-types.data";
import { ConfigurableRole, EditWorkspaceMemberFormValues } from "@/data/members/edit-member.data";
import { useWorkspaceRoles } from "@/data/role.data";
import { IWorkspaceMemberRoleCommission, IWorkspaceRoleCommission } from "@/schemas/role.schema";
import { ErroredFieldLabel } from "@/utils/validation";
import { useFormikContext } from "formik";
import React, { FC } from "react";

interface CommissionRowProps {
  configurableRole: ConfigurableRole;
}

const CommissionRow: FC<CommissionRowProps> = ({ configurableRole }) => {
  const formik = useFormikContext<EditWorkspaceMemberFormValues>();

  const allRoles = useWorkspaceRoles();

  const isEnabled = configurableRole.isCustomCommission;

  const selectedCommission = commissions.find((e) => e.id === configurableRole.commissionTypeId);
  const salesRole = (allRoles.find((e) => e.salesRoleId === configurableRole.salesRoleId) as IWorkspaceRoleCommission)
    .salesRole;

  return (
    <>
      <Commission.Toggle
        roleType={salesRole.roleType}
        isChecked={isEnabled}
        onChange={(checked) =>
          formik.setFieldValue(`roles.${configurableRole.salesRoleId}.isCustomCommission`, checked)
        }
      />

      {isEnabled && (
        <div className="flex items-center gap-4">
          <div className="flex-1">
            <ErroredFieldLabel
              id={`${salesRole.roleName.toLowerCase()}-commission-type`}
              name={`roles.${configurableRole.salesRoleId}.commissionType`}
            >
              Type
            </ErroredFieldLabel>
            <CommissionSelect
              id={`${salesRole.roleName.toLowerCase()}-commission-type`}
              name={`roles.${configurableRole.salesRoleId}.commissionTypeId`}
              value={selectedCommission}
              onBlur={() => {}}
              onChange={(opt) => {
                if (!opt) return;
                formik.setFieldValue(`roles.${configurableRole.salesRoleId}.commissionTypeId`, opt.id);
              }}
            />
          </div>
          <div className="flex-1">
            <Commission.RateField
              id={`${salesRole.roleName.toLowerCase()}-commission-value`}
              name={`roles.${configurableRole.salesRoleId}.commissionValue`}
              value={configurableRole.commissionValue}
              onChange={(value) => formik.setFieldValue(`roles.${configurableRole.salesRoleId}.commissionValue`, value)}
              commissionUnit={selectedCommission?.commissionUnit || "$"}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default CommissionRow;
