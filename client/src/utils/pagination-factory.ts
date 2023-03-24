import { PaginatedQueryData, PaginationControls } from "@/types/grid";

class PaginationFactory {
  public static getLimit(skip: number, take: number) {
    return Math.abs(take - skip);
  }

  public static getPage(take: number, limit: number) {
    return Math.abs(take / limit);
  }

  public static getPages(count: number, limit: number) {
    const pageCount = Math.ceil(count / limit);
    return Array(pageCount).fill(null) as null[];
  }

  public static sliceData<T extends { [key: string]: any }>(data: T[], skip: number, take: number) {
    return data.slice(skip, take);
  }

  public static getSkip(page: number, limit: number) {
    return Math.abs((1 - page) * limit);
  }

  public static getTake(page: number, limit: number) {
    return Math.abs(limit);
  }

  public static paginateData<T extends { [key: string]: any }>(
    data: T[],
    meta: PaginationControls & { totalCount: number }
  ) {
    const { page, limit, totalCount } = meta;
    const skip = PaginationFactory.getSkip(page, limit);
    const pages = PaginationFactory.getPages(totalCount, limit);
    const slicedData = PaginationFactory.sliceData(data, skip, limit);
    const paginatedData: PaginatedQueryData<T> = { pages, data: slicedData, skip, take: limit, totalCount };
    return paginatedData;
  }
}

export default PaginationFactory;
