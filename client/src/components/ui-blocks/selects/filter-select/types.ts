import { FilterMatchType } from "@/constants/data";
import { Dispatch } from "react";

export interface FilterProperty {
  label: string;
  field: string;
}

export interface AppliedFilter {
  property: FilterProperty;
  data: {
    matchType: FilterMatchType;
    search: string | null;
  };
}

export type ApplyFilters = Dispatch<AppliedFilter[]>;

export interface FilterSelectProps {
  filters: FilterProperty[];
  appliedFilters: AppliedFilter[];
  onApplyFilters: ApplyFilters;
}
