import { Title, Flex, Grid, Text, Divider, ActionIcon, Group, Tooltip, LoadingOverlay } from "@mantine/core";
import { IconTrash, IconPencil, IconEye, IconPlus } from "@tabler/icons-react";
import { CSSProperties, FC, useState } from "react";
import { modals } from "@mantine/modals";
import { useDisclosure } from "@mantine/hooks";
import { useUsers } from "@/data/users/get-users.data";
import DashboardLayout from "@/layouts/dashboard.layout";
import { EnhancedNextPage } from "@/types/next";
import AuthGaurd from "@/utils/auth-gaurd";
import { FixedSizeList as List } from "react-window";
import InfiniteLoader from "react-window-infinite-loader";
import AutoSizer from "react-virtualized-auto-sizer";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { DeleteUserById } from "@/data/users/delete-user.data";
import { DeleteUserVariable } from "@/types/table";
import ToastClient from "@/services/toast-client";
import ErrorManager from "@/services/error-manager";
import { QueryKeys } from "@/constants/query-keys";

import Form, { FormMode } from "./Form";

const UsersPage: EnhancedNextPage = () => {
  const [formMode, setFormMode] = useState(FormMode.VIEW);
  const [userId, setUserId] = useState<string>();
  const [opened, { open, close }] = useDisclosure(false);

  const {
    data: usersData,
    hasNextPage: usersHasNextPage,
    isFetching: usersIsFetching,
    fetchNextPage: usersFetchNextPage,
  } = useUsers();
  const queryClient = useQueryClient();
  const deleteUserMutation = useMutation<undefined, AxiosError, DeleteUserVariable>(
    (variables) => DeleteUserById(variables),
    {
      onSuccess: async () => {
        await queryClient.invalidateQueries([QueryKeys.USERS]);
        ToastClient.success("User deleted");
      },
      onError: (error) => {
        ErrorManager.handleError(error);
      },
    }
  );

  const Row: FC<{ index: number; style: CSSProperties }> = ({ index, style }) => {
    const user = usersData?.pages
      .find((element) => {
        return element.data.some((d) => d.index == index);
      })
      ?.data.find((e) => e.index === index);
    const openDeleteModal = () =>
      modals.openConfirmModal({
        title: "Delete user",
        centered: true,
        children: (
          <Text size="sm">
            Are you sure you want to delete user: {user?.name}? This action is destructive and can&apos;t be undo.
          </Text>
        ),
        labels: { confirm: "Delete user", cancel: "No don't delete it" },
        confirmProps: { color: "red" },

        onConfirm: () => {
          deleteUserMutation.mutate({ _id: user?._id || "" });
        },
      });

    if (user) {
      return (
        <div style={style} className="bg-slate-50">
          <Grid>
            <Grid.Col span={2}>
              <Text>{user._id}</Text>
            </Grid.Col>
            <Grid.Col span={3}>
              <Text>{user.name}</Text>
            </Grid.Col>
            <Grid.Col span={4}>
              <Text>{user.email}</Text>
            </Grid.Col>

            <Grid.Col span={3}>
              <Group>
                <Tooltip label="View">
                  <ActionIcon
                    onClick={() => {
                      setFormMode(FormMode.VIEW);
                      setUserId(user._id);
                      open();
                    }}
                  >
                    <IconEye size="1.125rem" />
                  </ActionIcon>
                </Tooltip>
                <Tooltip label="Edit">
                  <ActionIcon
                    onClick={() => {
                      setFormMode(FormMode.EDIT);
                      setUserId(user._id);
                      open();
                    }}
                  >
                    <IconPencil size="1.125rem" />
                  </ActionIcon>
                </Tooltip>
                <Tooltip label="Delete">
                  <ActionIcon onClick={openDeleteModal}>
                    <IconTrash size="1.125rem" />
                  </ActionIcon>
                </Tooltip>
              </Group>
            </Grid.Col>
          </Grid>
        </div>
      );
    } else {
      return <div style={style}></div>;
    }
  };

  return (
    <>
      {opened && <Form close={close} opened={opened} mode={formMode} userId={userId} />}
      <div className="w-full">
        <LoadingOverlay visible={usersIsFetching || deleteUserMutation.isLoading} overlayBlur={3} />
        <Flex justify="space-evenly" align="center" direction="row" wrap="wrap">
          <Title order={2}>Users</Title>
          <Title order={3}>Total Users: {usersData?.pages[0].totalCount ?? 0}</Title>
        </Flex>
        <Grid>
          <Grid.Col span={2}>
            <Title order={4}>Id</Title>
          </Grid.Col>
          <Grid.Col span={3}>
            <Title order={4}>Name</Title>
          </Grid.Col>
          <Grid.Col span={4}>
            <Title order={4}>Email</Title>
          </Grid.Col>
          <Grid.Col span={3}>
            <Tooltip label="Add User">
              <ActionIcon
                onClick={() => {
                  setFormMode(FormMode.ADD);
                  setUserId(undefined);
                  open();
                }}
              >
                <IconPlus size="1.125rem" />
              </ActionIcon>
            </Tooltip>
          </Grid.Col>
        </Grid>
        <Divider />
        <AutoSizer>
          {({ height, width }) => {
            return (
              <>
                <InfiniteLoader
                  isItemLoaded={(index) => {
                    return (
                      usersData?.pages
                        .find((element) => {
                          return element.data.some((d) => d.index == index);
                        })
                        ?.data.some((e) => e.index === index) || false
                    );
                  }}
                  itemCount={usersData?.pages[0].totalCount ?? 0}
                  loadMoreItems={async (startIndex) => {
                    if (!usersHasNextPage || usersIsFetching) {
                      return;
                    }

                    await usersFetchNextPage({ pageParam: { skip: startIndex - 1, take: 1000 } });
                  }}
                >
                  {({ onItemsRendered, ref }) => (
                    <>
                      <List
                        className="List"
                        height={height}
                        itemCount={10001}
                        itemSize={30}
                        onItemsRendered={onItemsRendered}
                        ref={ref}
                        width={width}
                      >
                        {Row}
                      </List>
                    </>
                  )}
                </InfiniteLoader>
              </>
            );
          }}
        </AutoSizer>
      </div>
    </>
  );
};

UsersPage.getLayout = (page) => (
  <AuthGaurd>
    <DashboardLayout>{page}</DashboardLayout>
  </AuthGaurd>
);

export default UsersPage;
