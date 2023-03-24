import MiscUtils from "./misc-utils";

import SortAscending from "@/assets/icons/sort-ascending.svg";
import SortDescending from "@/assets/icons/sort-descending.svg";
import { SortingOptions, SortOrder } from "@/types/grid";
import { get } from "lodash";

export const SortIcons = {
  [SortOrder.ASC]: SortAscending,
  [SortOrder.DESC]: SortDescending,
};

class SortingFactory<T extends { [key: string]: any }> {
  constructor(private data: Array<T>) {}
  public sortData(sort: SortingOptions) {
    const { sortField, sortOrder } = sort;

    const sortedData = this.data.sort((elm1: any, elm2: any) => {
      if (["createdAt", "updatedAt"].some((e) => sortField.includes(e))) {
        const timestamp1 = MiscUtils.getUNIXTimestamp(new Date(get(elm1, sortField)));
        const timestamp2 = MiscUtils.getUNIXTimestamp(new Date(get(elm2, sortField)));
        if (sortOrder === SortOrder.ASC) return timestamp1 - timestamp2;
        else return timestamp2 - timestamp1;
      }

      return 0;
    });

    this.data = sortedData;

    return sortedData;
  }
}

export default SortingFactory;
