import useGridContext from "@/state/contexts/grid-context";
import usePaginationControls from "@/utils/use-pagination-controls";
import Image from "next/image";
import React, { FC, Dispatch, MutableRefObject } from "react";
import Button from "./buttons/Button";
import cls from "classnames";
import PaginationFactory from "@/utils/pagination-factory";
import { Nullable } from "@/types/misc.type";

type GridPaginationProps = {
  totalCount: number;
  scrollOnPageChange?: boolean;
  scrollQuery?: string;
};

const GridPagination: FC<GridPaginationProps> = ({ totalCount, scrollOnPageChange = true, scrollQuery }) => {
  if (scrollOnPageChange && !scrollQuery) throw new Error("Scroll query is missing in grid pagination");

  const { page = 1, limit = 15 } = useGridContext() || {};

  const pages = PaginationFactory.getPages(totalCount, limit);

  const { isPreviousPageDisabled, isNextPageDisabled, goToPage, goToPreviousPage, goToNextPage } =
    usePaginationControls({ pages });

  const middleware = (cb: Dispatch<void>) => () => {
    if (scrollOnPageChange)
      (document.querySelector(scrollQuery as string) as Nullable<HTMLElement>)?.scrollIntoView({ behavior: "smooth" });
    cb();
  };

  return (
    <div className="flex items-center justify-between w-full border-t border-borderColors-2">
      <Button
        variant="white"
        className="!border-transparent !shadow-none !rounded-t-none"
        leadingIcon={<Image alt="left arrow icon" src="/images/icons/arrow-left.svg" width={18} height={18} />}
        onClick={middleware(goToPreviousPage)}
        disabled={isPreviousPageDisabled}
      >
        Previous
      </Button>
      <div className="flex justify-center">
        {pages.map((elm, index) => {
          const isCurrentPage = page === index + 1;
          return (
            <Button
              key={`page-${index}`}
              variant="white"
              onClick={middleware(() => goToPage(index + 1))}
              className={cls("!shadow-none !border-t-2 !border-l-0 !border-r-0 !border-b-0 !rounded-none", {
                "!border-textColors-1": isCurrentPage,
                "!border-transparent": !isCurrentPage,
              })}
            >
              {index + 1}
            </Button>
          );
        })}
      </div>
      <Button
        variant="white"
        className="!border-transparent !shadow-none !rounded-t-none"
        trailingIcon={<Image alt="right arrow icon" src="/images/icons/arrow-right.svg" width={15} height={15} />}
        onClick={middleware(goToNextPage)}
        disabled={isNextPageDisabled}
      >
        Next
      </Button>
    </div>
  );
};

export default GridPagination;
