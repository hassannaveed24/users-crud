import { QueryKey, UseQueryOptions } from "@tanstack/react-query";

export type EnhancedUseQueryOptions<T, E> = Omit<UseQueryOptions<T, E, T, QueryKey>, "queryKey" | "queryFn">;
