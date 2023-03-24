import DumbInputInline from "@/components/inputs/dumb/dumb-input-inline";
import Card from "@/components/ui-blocks/card";
import React, { FC } from "react";
import SearchIcon from "@/assets/icons/search.svg";
import { Formik } from "formik";
import { GridContext, GridContextWrapper } from "@/state/contexts/grid-context";
import SearchInput from "@/components/ui-blocks/inputs/search-input";
import SortingSelect from "@/components/ui-blocks/selects/sort-select/sort-select";
import LimitSelect from "@/components/ui-blocks/selects/limit-select";
import FilterSelect from "@/components/ui-blocks/selects/filter-select/filter-select";
import { Group } from "@mantine/core";
import { XMarkIcon } from "@heroicons/react/20/solid";
import AppliedFiltersGroup from "@/components/ui-blocks/selected-filters-group";

const AllContactsManager: FC<Record<string, never>> = () => {
  return (
    <GridContextWrapper>
      <GridContext.Consumer>
        {({ search, setSearch, sortOrder, setSortOrder, limit, setLimit, appliedFilters, setAppliedFilters }) => {
          return (
            <>
              <Card className="space-y-6">
                <div className="flex flex-wrap gap-3">
                  <SearchInput
                    id="search-all-contacts"
                    className="min-w-[400px]"
                    placeholder="Search contacts"
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
              </Card>
            </>
          );
        }}
      </GridContext.Consumer>
    </GridContextWrapper>
  );
};

export default AllContactsManager;
