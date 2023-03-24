import React, { FC } from "react";
import cls from "classnames";
import { useFormikContext } from "formik";
import { CommissionsFormValues } from "../types";
import Checkbox from "@/components/ui-blocks/checkbox";
import { Text } from "@mantine/core";

export const claimSecurities = [
  {
    id: "clc5y85ep000008lbeg83ayon",
    permissionName: "Instantly approve all commission claims and order updates",
    permissionTypeDescription:
      "Automatically approve commissions tracked by the system, as well as commissions claimed by sales reps.",
  },
  {
    id: "clc5y8r2s000108lb96jv91gp",
    permissionName: "Require manual approval only for sales-rep change requests (reccomended)",
    permissionTypeDescription:
      "Automatically approve system tracked commissions, and only require approval for manual claims submitted by sales reps.",
  },
  {
    id: "clc5y987a000208lb9ia42iip",
    permissionName: "Require manual approval always",
    permissionTypeDescription:
      "Manually review all claimed commissions, both system tracked & manual claims made by reps.",
  },
];

const Permissions: FC<object> = () => {
  const formik = useFormikContext<CommissionsFormValues>();

  return (
    <div className="space-y-3">
      {claimSecurities.map((elm) => {
        const isChecked = formik.values.permission === elm.id;
        const handleCheck = () => formik.setFieldValue("permission", elm.id);
        return (
          <div
            key={elm.id}
            className={cls(
              "flex items-center w-full p-4 space-x-12 border rounded cursor-pointer border-borderColors-1 hover:bg-grey-10 transition-colors",
              { "bg-grey-10": isChecked }
            )}
            onClick={handleCheck}
          >
            <Checkbox label={`Enable ${elm.permissionName}`} isChecked={isChecked} />
            <div>
              <Text color="textColors.0" fw={500}>
                {elm.permissionName}
              </Text>
              <Text color="textColors.2">{elm.permissionTypeDescription}</Text>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Permissions;
