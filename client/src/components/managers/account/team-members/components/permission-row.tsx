import Typography from "@/components/ui-blocks/typography";
import React, { FC, PropsWithChildren } from "react";

interface PermissionRowProps {
  test: string;
}

const PermissionRow: FC<PropsWithChildren<PermissionRowProps>> = ({ children }) => {
  return (
    <div className="w-full flex justify-between items-center">
      <Typography.Title className="!text-sm">{children}</Typography.Title>
    </div>
  );
};

export default PermissionRow;
