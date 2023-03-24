import Card from "@/components/ui-blocks/card";
import React, { FC, useState } from "react";
import { GridContext, GridContextWrapper } from "@/state/contexts/grid-context";
import SearchInput from "@/components/ui-blocks/inputs/search-input";
import SortingSelect from "@/components/ui-blocks/selects/sort-select/sort-select";
import LimitSelect from "@/components/ui-blocks/selects/limit-select";
import { Title, Divider } from "@mantine/core";
import HorizontalNav from "@/components/ui-blocks/horizontal-nav";
import FilterSelect from "@/components/ui-blocks/selects/filter-select";
import AppliedFiltersGroup from "@/components/ui-blocks/selected-filters-group";
import TasksGrid from "./components/tasks-grid";

const taskNavigationOptions = [
  { label: "All Tasks", value: "all" },
  { label: "Completed", value: "completed" },
  { label: "Incomplete", value: "incomplete" },
] as const;

type TaskNavigation = typeof taskNavigationOptions[number];

const AllTasksManager: FC = () => {
  const [selectedTab, setSelectedTab] = useState<TaskNavigation>(taskNavigationOptions[0]);

  return (
    <GridContextWrapper>
      <GridContext.Consumer>
        {({ search, setSearch, sortOrder, setSortOrder, limit, setLimit, appliedFilters, setAppliedFilters }) => (
          <>
            <div className="mt-8 space-y-8">
              <Title fw={700} fz={24}>
                Tasks
              </Title>

              <HorizontalNav
                id="tasks-navigation"
                label="Task navigation"
                options={taskNavigationOptions}
                value={selectedTab}
                getOptionLabel={(opt) => opt.label}
                getOptionValue={(opt) => opt.value}
                onChange={(opt) => {
                  if (!opt) return;
                  setSelectedTab(opt);
                }}
              />

              <Card className="space-y-6">
                <Title fw={600}>Sales Call</Title>
                <Divider />
                <div className="flex flex-wrap gap-3">
                  <SearchInput
                    id="search-all-tasks"
                    className="min-w-[400px]"
                    placeholder="Search tasks"
                    value={search}
                    onChange={setSearch}
                  />

                  <SortingSelect
                    value={sortOrder}
                    onChange={(order) => {
                      setSortOrder(order);
                    }}
                  />

                  <FilterSelect
                    filters={[
                      { field: "name", label: "Name" },
                      { field: "contactOwner", label: "Contact Owner" },
                    ]}
                    appliedFilters={appliedFilters}
                    onApplyFilters={setAppliedFilters}
                  />

                  <LimitSelect value={limit} onChange={setLimit} />
                </div>
                <AppliedFiltersGroup
                  data={appliedFilters}
                  onDelete={(e) =>
                    setAppliedFilters((prev) => prev.filter((p) => e.property.field !== p.property.field))
                  }
                />
                <TasksGrid />
              </Card>
            </div>
          </>
        )}
      </GridContext.Consumer>
    </GridContextWrapper>
  );
};

export default AllTasksManager;
