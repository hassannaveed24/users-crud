import React, { FC, Dispatch } from "react";
import TaskRow from "./task-row";
import useGridContext from "@/state/contexts/grid-context";
import GridPagination from "@/components/grid-pagination";
import Grid from "@/components/ui-blocks/grid";
import { useProducts } from "@/data/products/get-products.data";
import { IProduct } from "@/schemas/product.schema";
import { useTasks } from "@/data/tasks/get-tasks.data";

interface TasksGridProps {
  onEditProduct?: Dispatch<IProduct>;
}

const TasksGrid: FC<TasksGridProps> = ({ onEditProduct }) => {
  const { page, limit, sortField, sortOrder, debouncedSearch } = useGridContext();

  const query = useTasks({
    page,
    limit,
    sortField,
    sortOrder,
    search: debouncedSearch,
  });

  const { totalCount = 0, data = [] } = query.data || {};

  return (
    <>
      <Grid.Base
        className="min-w-[960px]"
        context={{
          isLoading: query.isPlaceholderData || query.isFetching,
          isError: Boolean(query.error),
          isEmpty: data.length <= 0,
          emptyState: {
            onClick: () => {
              const newProductButton = document.getElementById("add-new-product");
              if (!newProductButton) return;
              newProductButton.click();
            },
          },
        }}
      >
        <Grid.Header>
          <div className="pl-10"></div>
          <Grid.Heading className="flex-[11]">Contact</Grid.Heading>
          <Grid.Heading className="w-[200px]">Task Type</Grid.Heading>
          <Grid.Heading className="flex-[6]">Deal</Grid.Heading>
          <Grid.Heading className="flex-[6]">Email</Grid.Heading>
          <Grid.Heading className="flex-[6]">Date</Grid.Heading>
          <Grid.Heading className="w-[150px]">Time </Grid.Heading>
          <Grid.Heading className="flex-1" />
        </Grid.Header>
        <Grid.Body>
          {data.map((elm) => (
            <TaskRow key={`member-row-${elm.id}`} data={elm} onEditProduct={() => {}} />
          ))}
        </Grid.Body>
      </Grid.Base>
      {query.isSuccess && !query.isPlaceholderData && (
        <GridPagination totalCount={totalCount} scrollQuery="button#add-new-product" />
      )}
    </>
  );
};

export default TasksGrid;
