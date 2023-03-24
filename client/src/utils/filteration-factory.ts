import { get } from "lodash";
import MiscUtils from "./misc-utils";

interface SearchOptions {
  searchOnKey: string[];
}

class FilterationFactory<T extends { [key: string]: any }> {
  constructor(private data: Array<T>) {}
  public search(search: string, { searchOnKey }: SearchOptions) {
    if (!search) return this.data;

    const filteredData = this.data.filter((elm) =>
      searchOnKey.some((key) => get(elm, key).toLowerCase().includes(search.toLowerCase()))
    );

    this.data = filteredData;

    return filteredData;
  }
}

export default FilterationFactory;
