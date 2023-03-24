import { useRouter } from "next/router";
import { ParsedUrlQuery } from "querystring";
import { useEffect, useState } from "react";
import _isEqual from "lodash/isEqual";

// [param, setParam]: [
//     string | Record<string, string | object>,
//     (param: string | Record<string, string | object>) => void
//   ]

export const constructQueriedURL = (params: ParsedUrlQuery) => {
  const url = new URL(window.location.origin + window.location.pathname);
  Object.entries(params).forEach(([name, value]) => {
    if (!value) return;
    if (typeof value === "string") {
      url.searchParams.append(name, value);
      return;
    }
    value.forEach((_v) => {
      url.searchParams.append(name, _v);
    });
  });
  return url;
};

const useSearchParams = (defaultParams?: ParsedUrlQuery) => {
  const router = useRouter();
  const [params, setSearchParams] = useState({ ...router.query, ...(defaultParams || {}) });
  console.log({ params });

  useEffect(() => {
    const clonedQuery = structuredClone(router.query);
    const isEqual = _isEqual(params, clonedQuery);
    console.log({ params, query: clonedQuery, isEqual });
    if (!isEqual) router.push({ pathname: router.asPath, query: params });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params]);

  return setSearchParams;
};

export default useSearchParams;
