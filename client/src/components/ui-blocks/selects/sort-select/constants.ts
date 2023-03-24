import { SortOrder } from "@/types/grid";
import { SortOption } from "./types";

export const allSortOptions: readonly SortOption[] = [
  { label: "Newest first", value: SortOrder.DESC },
  { label: "Oldest first", value: SortOrder.ASC },
];
