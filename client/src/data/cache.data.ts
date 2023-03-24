import { qc } from "@/pages/_app";
import { GridVariables, PaginatedQueryData, PaginationControls } from "@/types/grid";
import GridFactory from "@/utils/grid-factory";
import PaginationFactory from "@/utils/pagination-factory";
import { QueryKey } from "@tanstack/react-query";
import { uniqBy } from "lodash";
import { DispatchWithoutAction } from "react";

type Deduplicator<T> = (data: T[]) => () => T[];

type InvalidationStrategy = "decrement" | "increment" | "persist";

type Selector<T> = (cached: T, current: T) => boolean;

const getUpdatedTotalCount = (totalCount: number, meta: { strategy: InvalidationStrategy }) => {
  let updatedTotalCount = totalCount;
  switch (meta.strategy) {
    case "increment": {
      updatedTotalCount++;
      break;
    }
    case "decrement": {
      updatedTotalCount--;
      break;
    }
    default: {
      break;
    }
  }
  return updatedTotalCount;
};

const getPersistedIndex = <T>(data: T[], row: T, meta: { selector: Selector<T> }) => {
  const { selector } = meta;
  const persistedIndex = data.findIndex((e) => selector(e, row));
  if (persistedIndex === -1)
    throw new Error("Something went wrong! Edited member not found in cache, this should never happen");

  return persistedIndex;
};

const getUpdatedCachedData = <T>(
  data: T[],
  row: T,
  meta: { strategy: InvalidationStrategy; selector: Selector<T> }
) => {
  const $data = structuredClone(data);
  const { strategy, selector } = meta;
  if (strategy === "increment") $data.push(row);
  else if (strategy === "persist") {
    const persistedIndex = getPersistedIndex(data, row, { selector });
    $data[persistedIndex] = row;
  } else if (strategy === "decrement") {
    const persistedIndex = getPersistedIndex(data, row, { selector });
    $data.splice(persistedIndex, 1);
  }
  return $data;
};

export const GetCacheKeys = (queryKey: QueryKey) => {
  return qc
    .getQueriesData({
      queryKey,
      exact: false,
    })
    .map(([key]) => key);
};

export const GetCachedTotalCount = (queryKey: QueryKey) => {
  const paginatedCache = qc.getQueriesData<PaginatedQueryData<unknown>>({
    queryKey,
    exact: false,
  });

  const [, paginatedRow] = paginatedCache[0];

  return paginatedRow.totalCount;
};

export const GetFlattenedPaginatedCache = <T extends { [key: string]: unknown }>(queryKey: QueryKey) => {
  const flattenedCache: T[] = [];

  qc.getQueriesData<PaginatedQueryData<T>>({
    queryKey,
    exact: false,
  }).forEach(([, queryData]) => {
    queryData.data.forEach((e) => {
      flattenedCache.push(e);
    });
  });

  return flattenedCache;
};

export const UpdatePaginatedCache = <T extends { [key: string]: unknown }>(
  queryKey: QueryKey,
  row: T,
  opts: {
    strategy?: InvalidationStrategy;
    deduplicator?: Deduplicator<T>;
    selector?: Selector<T>;
    onDeleteCurrentPage?: DispatchWithoutAction;
  }
) => {
  const cacheKeys: QueryKey[] = GetCacheKeys(queryKey);
  const normalizedCacheData: T[] = GetFlattenedPaginatedCache(queryKey);

  const {
    onDeleteCurrentPage: _onDeleteCurrentPage,
    deduplicator = (data) => () => uniqBy(data, "id"),
    selector = (cache, row) => cache.id === row.id,
    strategy = "increment",
  } = opts;

  if (strategy === "decrement" && !_onDeleteCurrentPage)
    throw new Error("Please specify onDeleteCurrentPage() when invalidation strategy is decrement");

  const onDeleteCurrentPage = _onDeleteCurrentPage as DispatchWithoutAction;

  const getDeduplicatedData = deduplicator(normalizedCacheData);

  const updatedCacheData = getUpdatedCachedData(getDeduplicatedData(), row, { strategy, selector });

  const updatedTotalCount = getUpdatedTotalCount(GetCachedTotalCount(queryKey), { strategy });

  cacheKeys.forEach((key) => {
    const variables = key[1] as GridVariables<PaginationControls>;

    if (strategy === "decrement") {
      const updatedPages = PaginationFactory.getPages(updatedTotalCount, variables.limit);
      const shouldDeleteKey = variables.page > updatedPages.length;

      if (shouldDeleteKey) {
        qc.removeQueries(key, { exact: true });
        onDeleteCurrentPage();
        return;
      }
    }

    const updatedQueryData = GridFactory.process(updatedCacheData, {
      ...variables,
      searchOnKey: ["member.memberName", "member.memberEmail"],
      sortField: `member.${variables.sortField}`,
      totalCount: updatedTotalCount,
    });

    qc.setQueryData<PaginatedQueryData<T>>(key, updatedQueryData);
  });
};
