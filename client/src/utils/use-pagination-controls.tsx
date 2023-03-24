import useGridContext from "@/state/contexts/grid-context";
import { CompleteMultipartUploadCommand } from "@aws-sdk/client-s3";

type PaginationControlsOptions = {
  pages: Array<null>;
};

type PaginationControls = {
  isPreviousPageDisabled: boolean;
  isNextPageDisabled: boolean;
  goToPage: (page: number) => void;
  goToNextPage: () => void;
  goToPreviousPage: () => void;
};

const initialControls = {
  isNextPageDisabled: true,
  isPreviousPageDisabled: true,
  goToPage: () => {},
  goToNextPage: () => {},
  goToPreviousPage: () => {},
};

const usePaginationControls = ({ pages }: PaginationControlsOptions) => {
  const gridContext = useGridContext();

  if (!gridContext) return initialControls;

  const { page, setPage } = gridContext;

  const isPreviousPageDisabled = page <= 1;
  const isNextPageDisabled = page >= pages.length;

  const goToPage = (_page: number) => {
    setPage(_page);
  };

  const goToPreviousPage = () => {
    if (isPreviousPageDisabled) return;
    setPage((prev) => prev - 1);
  };

  const goToNextPage = () => {
    if (isNextPageDisabled) return;
    setPage((prev) => prev + 1);
  };

  const controls: PaginationControls = {
    isPreviousPageDisabled,
    isNextPageDisabled,
    goToPage,
    goToNextPage,
    goToPreviousPage,
  };

  return controls;
};

export default usePaginationControls;
