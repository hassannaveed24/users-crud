import { GridQueryParams, GridVariables, PaginatedQueryData, PaginationControls } from "@/types/grid";
import FilterationFactory from "./filteration-factory";
import PaginationFactory from "./pagination-factory";
import SortingFactory from "./sorting-factory";

class GridFactory {
  public static getPaginatedQueryParams(variables: GridVariables<PaginationControls>, meta: { filterKey: string }) {
    const { sortField, sortOrder, search, page, limit, ...query } = variables;
    const queryParams: GridQueryParams = {
      ...query,
      skip: PaginationFactory.getSkip(page, limit),
      take: limit,
      orderBy: { [sortField]: sortOrder.toLowerCase() },
      filter: { [meta.filterKey]: search },
    };
    return queryParams;
  }

  public static process<T extends { [key: string]: any }>(
    data: T[],
    variables: GridVariables<PaginationControls, { searchOnKey: string[]; totalCount: number }>
  ) {
    const { search, sortField, sortOrder, page, limit, totalCount, searchOnKey } = variables;
    const filteredMembers = new FilterationFactory(structuredClone(data)).search(search, {
      searchOnKey,
    });

    const sortedMembers = new SortingFactory(structuredClone(filteredMembers)).sortData({
      sortField,
      sortOrder,
    });

    const paginatedData = PaginationFactory.paginateData(structuredClone(sortedMembers), {
      page,
      limit,
      totalCount,
    });

    return paginatedData;
  }
}

export default GridFactory;
