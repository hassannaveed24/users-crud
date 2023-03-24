import React, { FC } from "react";
import cls from "classnames";
import { useFormikContext } from "formik";
import { CommissionsFormValues } from "../../commissions/types";

const permissions = [
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
      {permissions.map((elm) => {
        const isSelected = formik.values.permission === elm.id;
        return (
          <div
            key={elm.id}
            className={cls(
              "flex items-center w-full p-4 space-x-12 border rounded cursor-pointer border-grey-9 hover:bg-grey-10 transition-colors",
              { "bg-grey-10": isSelected }
            )}
            onClick={() => formik.setFieldValue("permission", elm.id)}
          >
            <input
              role="checkbox"
              aria-checked={isSelected}
              aria-describedby="comments-description"
              type="checkbox"
              className="w-4 h-4 border-gray-300 rounded-full cursor-pointer text-blue-1 focus:ring-indigo-500"
              checked={isSelected}
            />
            <div>
              <h2 className="text-sm font-medium leading-5 text-blue-1">{elm.permissionName}</h2>
              <p className="text-sm leading-5 text-grey-5">{elm.permissionTypeDescription}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Permissions;
