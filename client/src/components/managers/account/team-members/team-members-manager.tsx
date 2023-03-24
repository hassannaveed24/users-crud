import React from "react";
import MembersGrid from "./components/members-grid";
import { GridContext, GridContextWrapper } from "@/state/contexts/grid-context";
import InviteMembers from "./components/invite-members";
import Card from "@/components/ui-blocks/card";

import SearchInput from "@/components/ui-blocks/inputs/search-input";
import { Title, Text, Flex, Button } from "@mantine/core";
import SortSelect from "@/components/ui-blocks/selects/sort-select";
import LimitSelect from "@/components/ui-blocks/selects/limit-select";

const TeamMembersManager = () => {
  return (
    <>
      <GridContextWrapper>
        <GridContext.Consumer>
          {({ search, setSearch, sortOrder, setSortOrder, limit, setLimit, setPage }) => {
            return (
              <Card className="space-y-6">
                <InviteMembers />
                <div className="w-full border-t border-borderColors-2" />
                <div className="text-center min-[1400px]:text-left">
                  <Title>Active Members</Title>
                  <Text color="textColors.1">View all members and change their info</Text>
                </div>

                <div className="flex justify-center min-[1400px]:justify-start flex-wrap gap-3">
                  <SearchInput
                    id="search-workspace-members"
                    placeholder="Search members"
                    className="min-w-[400px]"
                    value={search}
                    onChange={setSearch}
                  />

                  <SortSelect
                    value={sortOrder}
                    onChange={(order) => {
                      setSortOrder(order);
                    }}
                  />

                  <LimitSelect
                    value={limit}
                    onChange={(limit) => {
                      setPage(1);
                      setLimit(limit);
                    }}
                  />
                </div>

                <MembersGrid />
              </Card>
            );
          }}
        </GridContext.Consumer>
      </GridContextWrapper>
      <Flex justify="end" pb={48} gap={8}>
        <Button variant="default">Cancel</Button>
        <Button>Save</Button>
      </Flex>
    </>
  );
};

export default TeamMembersManager;
