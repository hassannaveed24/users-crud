import React, { FC, useState, useRef, useEffect, useMemo } from "react";
import FilterIcon from "@/assets/icons/filter.svg";
import ChevronDownIcon from "@/assets/icons/chevron-down.svg";
import { AppliedFilter, FilterSelectProps } from "./types";
import { Button, useMantineTheme, createStyles, Text, Group } from "@mantine/core";
import cls from "classnames";
import { Nullable } from "@/types/misc.type";
import { Popper, Target, Content } from "react-nested-popper";
import MenuItem from "../../menu/item.menu";
import MenuDropdown from "../../menu/dropdown.menu";
import { XMarkIcon } from "@heroicons/react/20/solid";
import { FilterMatchTypes } from "@/constants/data";
import DumbInputInline from "@/components/inputs/dumb/dumb-input-inline";

const useStyles = createStyles(() => {
  return {
    dropdownIndicator: {
      transition: "color 150ms",
      color: "#ccc",
      ":hover": {
        color: "#666",
      },
    },
  };
});

const FilterSelect: FC<FilterSelectProps> = ({ filters, appliedFilters, onApplyFilters }) => {
  const draftFiltersState = useState<AppliedFilter[]>(appliedFilters);

  const [draftFilters, setDraftFilters] = draftFiltersState;

  const theme = useMantineTheme();

  const { classes } = useStyles();

  const [isMenu, setIsMenu] = useState<boolean>(false);

  const targetRef = useRef<Nullable<HTMLButtonElement>>();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => setDraftFilters(appliedFilters), [appliedFilters]);

  const handleSubmit: React.FormEventHandler = (e) => {
    e.preventDefault();
    onApplyFilters(draftFilters);
    setIsMenu(false);
  };

  const isClearable = useMemo(() => appliedFilters.length > 0, [appliedFilters.length]);

  return (
    <Popper show={isMenu} onPopperWillClose={() => setIsMenu(false)} shouldCloseOnOutsideClick={() => true}>
      <Target>
        <Button
          id="filter-target"
          ref={(r) => (targetRef.current = r)}
          onClick={() => setIsMenu((prev) => !prev)}
          variant="default"
          h={38}
          fw={500}
          leftIcon={<FilterIcon width={20} height={20} color={theme.colors.textColors[1]} />}
          rightIcon={
            <>
              {isClearable && (
                <XMarkIcon
                  width={20}
                  height={20}
                  className={classes.dropdownIndicator}
                  onClick={(e) => {
                    e.stopPropagation();
                    setDraftFilters([]);
                    onApplyFilters([]);
                  }}
                />
              )}
              <ChevronDownIcon
                width={20}
                height={20}
                color={isMenu ? "#666" : "#ccc"}
                className={classes.dropdownIndicator}
              />
            </>
          }
        >
          Filters
        </Button>
      </Target>
      <Content>
        <MenuDropdown
          width={targetRef.current?.getBoundingClientRect().width}
          id="filter-dropdown"
          targetId="filter-target"
        >
          {filters.map((e) => {
            const matchProperty = (f: AppliedFilter) => e.field === f.property.field;
            return (
              <Popper key={e.field} targetToggle shouldCloseOnOutsideClick={() => true}>
                <Target>
                  <MenuItem id="hey-target" active={Boolean(draftFilters.find((d) => d.property.field === e.field))}>
                    {e.label}
                  </MenuItem>
                </Target>
                <Content popperOptions={{ placement: "right-start" }}>
                  <form onSubmit={handleSubmit}>
                    <MenuDropdown width={340} isSubmenu id="hey-dropddown" targetId="hey-target">
                      <Text fw={500} className="py-[16px] px-[17px]">
                        {e.label}
                      </Text>
                      {FilterMatchTypes.map((t, i, arr) => {
                        const matchType = (f: AppliedFilter) => matchProperty(f) && t.value === f.data.matchType.value;

                        const selectedDraftFilter = draftFilters.find(matchType);
                        const isSelected = Boolean(selectedDraftFilter);

                        const isLastElement = i >= arr.length - 1;

                        return (
                          <div
                            key={t.value}
                            className={cls("border-t border-borderColors-2", {
                              "!border-y": isLastElement,
                            })}
                          >
                            <MenuItem
                              active={isSelected}
                              className={cls("flex gap-3 py-[11px] px-[5px]")}
                              onClick={() => {
                                setDraftFilters(($) => {
                                  const prev = structuredClone($);

                                  const existingProperty = prev.findIndex(matchProperty);

                                  const newFilterType: AppliedFilter = {
                                    property: e,
                                    data: { matchType: t, search: "" },
                                  };

                                  if (existingProperty > -1) {
                                    const existingType = prev.some(matchType);
                                    if (!existingType) prev[existingProperty] = newFilterType;
                                  } else {
                                    prev.push(newFilterType);
                                  }

                                  return prev;
                                });
                              }}
                            >
                              <input
                                type="radio"
                                checked={isSelected}
                                className="mt-[2px] h-3.5 w-3.5 border-gray-300 text-textColors-1 cursor-pointer"
                              />
                              <div className="flex-1">
                                <Text fz="sm" mb={8}>
                                  {t.label}
                                </Text>
                                {isSelected && (
                                  <DumbInputInline
                                    inputProps={{
                                      id: `${t.value}-input`,
                                      name: `${t.value}-input`,
                                      placeholder: "Add value",
                                      value: selectedDraftFilter?.data.search || "",
                                      onClick: (e) => e.stopPropagation(),
                                      onChange: (e) =>
                                        setDraftFilters(($) => {
                                          const prev = structuredClone($);
                                          const index = prev.findIndex(matchType);
                                          prev[index].data.search = e.target.value;
                                          return prev;
                                        }),
                                    }}
                                  />
                                )}
                              </div>
                            </MenuItem>
                          </div>
                        );
                      })}
                      <Group position="right" className="py-[17px] px-[17px]">
                        <Button variant="default">Cancel</Button>
                        <Button
                          type="submit"
                          disabled={(() => {
                            const selectedType = draftFilters.find(matchProperty);
                            if (selectedType) {
                              if (!selectedType.data.search) return true;

                              const appliedType = appliedFilters.find(matchProperty);
                              if (!appliedType) return false;
                              const isSameAsApplied =
                                appliedType.data.matchType.value === selectedType.data.matchType.value &&
                                appliedType.data.search === selectedType.data.search;
                              return isSameAsApplied;
                            }
                            return true;
                          })()}
                        >
                          Apply filter
                        </Button>
                      </Group>
                    </MenuDropdown>
                  </form>
                </Content>
              </Popper>
            );
          })}
        </MenuDropdown>
      </Content>
    </Popper>
  );
};

export default FilterSelect;
