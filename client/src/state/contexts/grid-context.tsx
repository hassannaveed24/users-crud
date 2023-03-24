import { AppliedFilter } from "@/components/ui-blocks/selects/filter-select/types";
import { ValidLimit } from "@/components/ui-blocks/selects/limit-select/types";
import { SortOrder } from "@/types/grid";
import PaginationFactory from "@/utils/pagination-factory";
import { createContext, FC, useState, useContext, Dispatch, SetStateAction, PropsWithChildren } from "react";
import { useDebouncedValue } from "rooks";

type GridContextValues = {
  page: number;
  setPage: Dispatch<SetStateAction<number>>;
  limit: ValidLimit;
  setLimit: Dispatch<SetStateAction<ValidLimit>>;
  sortField: string;
  setSortField: Dispatch<SetStateAction<string>>;
  sortOrder: SortOrder;
  setSortOrder: Dispatch<SetStateAction<SortOrder>>;
  search: string;
  setSearch: (search: string) => void;
  debouncedSearch: string;
  appliedFilters: AppliedFilter[];
  setAppliedFilters: Dispatch<SetStateAction<AppliedFilter[]>>;
};

export const INITIAL_GRID_STATE: GridContextValues = {
  page: 1,
  setPage: () => {},
  limit: 15,
  setLimit: () => {},
  sortField: "createdAt",
  setSortField: () => {},
  sortOrder: SortOrder.DESC,
  setSortOrder: () => {},
  search: "",
  setSearch: () => {},
  debouncedSearch: "",
  appliedFilters: [],
  setAppliedFilters: () => {},
};

export const GridContext = createContext<GridContextValues>(INITIAL_GRID_STATE);

const useGridContext = () => {
  const gridContext = useContext(GridContext);
  return gridContext || INITIAL_GRID_STATE;
};

export const GridContextWrapper: FC<PropsWithChildren> = ({ children }) => {
  const [page, setPage] = useState(INITIAL_GRID_STATE.page);
  const [limit, setLimit] = useState(INITIAL_GRID_STATE.limit);

  const [sortField, setSortField] = useState(INITIAL_GRID_STATE.sortField);
  const [sortOrder, setSortOrder] = useState(INITIAL_GRID_STATE.sortOrder);

  const [search, setSearch] = useState(INITIAL_GRID_STATE.search);
  const [debouncedSearch] = useDebouncedValue(search, 500);

  const [appliedFilters, setAppliedFilters] = useState<AppliedFilter[]>(INITIAL_GRID_STATE.appliedFilters);

  return (
    <GridContext.Provider
      value={{
        page,
        setPage,
        limit,
        setLimit,
        sortField,
        setSortField,
        sortOrder,
        setSortOrder,
        search,
        setSearch,
        debouncedSearch: debouncedSearch || "",
        appliedFilters,
        setAppliedFilters,
      }}
    >
      {children}
    </GridContext.Provider>
  );
};

export default useGridContext;
