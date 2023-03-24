import React, { FC } from "react";
import RoleBadge from "@/components/role-badge";
import Image from "next/image";
import Skeleton from "@/components/skeleton";
import Grid from "@/components/ui-blocks/grid";
import { useInternalGridContext } from "@/components/ui-blocks/grid/context";
import { IWorkspaceMember } from "@/schemas/member.schema";
import { useWorkspacePermissions } from "@/data/permission.data";

type MemberRowProps = {
  data: IWorkspaceMember;
};

const MemberRow: FC<MemberRowProps> = (props) => {
  const { data } = props;

  const { editModal } = useInternalGridContext();

  const toggleEditModal = () => {
    const { setData, setVisibility } = editModal;
    setData(data);
    setVisibility(true);
  };

  const allPermissions = useWorkspacePermissions();

  const memberWorkspacePermission = allPermissions.find((e) => e.id === data.workspacePermissionId);

  return (
    <>
      <Grid.Row>
        {({ isLoading }) => {
          return (
            <>
              <div className="pl-10"></div>
              <Grid.Cell className="flex-[11]" skeletonProps={{ count: 1.7 }}>
                <div className="flex items-center">
                  <Image
                    className="flex-shrink-0 rounded-full"
                    alt={data.member.memberName}
                    src={data.member.memberAvatar}
                    width={40}
                    height={40}
                  />
                  <div className="ml-4 ">
                    <p className="inline-block overflow-hidden font-medium text-textColors-1 max-w-[300px] whitespace-nowrap text-ellipsis">
                      {data.member.memberName}
                    </p>
                    <p className="text-textColors-3 overflow-hidden block max-w-[250px] whitespace-nowrap text-ellipsis">
                      {data.member.memberEmail}
                    </p>
                  </div>
                </div>
              </Grid.Cell>

              <Grid.Cell
                className="w-[200px] flex gap-2"
                skeletonProps={{ count: 1 }}
                showSkeletonOnLoading={false}
                isLoading={false}
              >
                {data.workspaceMemberRole.map((e) => {
                  if (!e.isActive) return null;
                  return (
                    <Skeleton isLoading={isLoading} key={e.id} width={50} height={14}>
                      <RoleBadge key={e.id} roleType={e.salesRole.roleType}>
                        {e.salesRole.roleName}
                      </RoleBadge>
                    </Skeleton>
                  );
                })}
              </Grid.Cell>

              <Grid.Cell className="flex-[4]">
                <p className="max-w-[140px] overflow-hidden whitespace-nowrap text-ellipsis capitalize">
                  {(data.isCustomPermission
                    ? data.permission.permissionType
                    : memberWorkspacePermission?.permission.permissionType || "CORRUPT"
                  ).toLowerCase()}
                </p>
              </Grid.Cell>

              <Grid.Cell className="flex-1 ">
                <button type="button" className="text-sm font-medium text-textColors-1" onClick={toggleEditModal}>
                  Edit<span className="sr-only">, {data.member.memberName}</span>
                </button>
              </Grid.Cell>
            </>
          );
        }}
      </Grid.Row>
    </>
  );
};

export default MemberRow;
