import { SortOrder } from "@/types/grid";
import { Dispatch } from "react";

export interface SortOption {
  readonly label: string;
  readonly value: SortOrder;
}

export interface SortSelectProps {
  value: SortOrder;
  onChange: Dispatch<SortOrder>;
}
