import React, { FC, useMemo, useState } from "react";
import MemberRow from "./member-row";
import useGridContext from "@/state/contexts/grid-context";
import GridPagination from "@/components/grid-pagination";
import Grid from "@/components/ui-blocks/grid";
import EditMemberModal from "../modals/edit-member.modal";
import { ModalProps } from "@/components/ui-blocks/grid/context";
import { useWorkspaceMembers } from "@/data/members/get-members.data";
import { IWorkspaceMember } from "@/schemas/member.schema";
import { Nullable } from "@/types/misc.type";

type MembersGridProps = object;

const MembersGrid: FC<MembersGridProps> = () => {
  const { page, limit, sortField, sortOrder, debouncedSearch } = useGridContext();
  const query = useWorkspaceMembers({
    page,
    limit,
    sortField,
    sortOrder,
    search: debouncedSearch,
  });

  const [isEditModal, setIsEditModal] = useState(false);
  const [editModalData, setEditModalData] = useState<IWorkspaceMember>();

  const { totalCount = 0, data = [] } = query.data || {};

  const editModal = useMemo<ModalProps<IWorkspaceMember>>(
    () => ({
      isVisible: isEditModal,
      setVisibility: setIsEditModal,
      data: editModalData,
      setData: setEditModalData,
    }),
    [editModalData, isEditModal]
  );

  return (
    <>
      <Grid.Base
        className="min-w-[790px]"
        context={{
          isLoading: query.isPlaceholderData || query.isFetching,
          isError: Boolean(query.error),
          isEmpty: data.length <= 0,
          editModal,
          emptyState: {
            onClick: () => {
              const inviteEmailInput = document.querySelector("input[name='email']") as HTMLElement | null;
              if (!inviteEmailInput) return;
              inviteEmailInput.focus();
            },
          },
        }}
      >
        <Grid.Header>
          <div className="pl-10"></div>
          <Grid.Heading className="flex-[11]">Name</Grid.Heading>
          <Grid.Heading className="w-[200px]">Roles</Grid.Heading>
          <Grid.Heading className="flex-[4]">Permissions</Grid.Heading>
          <Grid.Heading className="flex-1" />
        </Grid.Header>
        <Grid.Body>
          {data.map((elm) => (
            <MemberRow key={`member-row-${elm.id}`} data={elm} />
          ))}
        </Grid.Body>
      </Grid.Base>
      <EditMemberModal {...editModal} />
      {query.isSuccess && !query.isPlaceholderData && (
        <GridPagination totalCount={totalCount} scrollQuery="input#email" />
      )}
    </>
  );
};

export default MembersGrid;
