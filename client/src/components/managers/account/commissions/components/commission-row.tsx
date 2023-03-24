import React, { FC, useMemo } from "react";
import { ErroredFieldLabel } from "@/utils/validation";
import { useFormikContext } from "formik";
import Commission from "@/components/commissions";
import CommissionSelect from "@/components/ui-blocks/selects/commission-select";
import { commissions } from "@/data/commission/commission-types.data";
import { CommissionsFormValues } from "../types";
import { ConfigurableCommission } from "../validations";
import { IWorkspaceRoleCommission } from "@/schemas/role.schema";

interface CommissionRowType {
  role: IWorkspaceRoleCommission;
}

const CommissionRow: FC<CommissionRowType> = ({ role }) => {
  const formik = useFormikContext<CommissionsFormValues>();

  const commission = formik.values.commissions[role.id] as ConfigurableCommission;

  const selectedCommission = useMemo(() => commissions.find((e) => e.id === commission.type), [commission.type]);

  const roleName = role.salesRole.roleName.toLowerCase();

  return (
    <div className="flex flex-wrap items-end gap-4 md:gap-8">
      <div className="flex w-full min-[1100px]:w-auto gap-8">
        <div className="w-full min-[1100px]:w-[350px]">
          <ErroredFieldLabel id={`${roleName}-commission-type`} name={`commissions.${role.id}.type`}>
            Type
          </ErroredFieldLabel>
          <CommissionSelect
            id={`${roleName}-commission-type`}
            name={`commissions.${role.id}.type`}
            value={selectedCommission}
            onBlur={() => formik.setFieldTouched(`commissions.${role.id}.type`, true, true)}
            onChange={(opt) => {
              if (!opt) return;
              formik.setFieldValue(`commissions.${role.id}.type`, opt.id);
            }}
          />
        </div>
        <div className="w-full min-[1100px]:w-[350px]">
          <Commission.RateField
            id={`${roleName}-commission-value`}
            name={`commissions.${role.id}.value`}
            value={commission.value}
            onChange={(value) => {
              formik.setFieldValue(`commissions.${role.id}.value`, value.toString());
            }}
            onBlur={() => formik.setFieldTouched(`commissions.${role.id}.value`, true, true)}
            commissionUnit={selectedCommission?.commissionUnit || "$"}
          />
        </div>
      </div>
    </div>
  );
};

export default CommissionRow;
