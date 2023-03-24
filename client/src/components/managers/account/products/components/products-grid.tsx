import React, { FC, Dispatch, useState } from "react";
import ProductRow from "./product-row";
import useGridContext from "@/state/contexts/grid-context";
import GridPagination from "@/components/grid-pagination";
import Grid from "@/components/ui-blocks/grid";
import HorizontalNav from "@/components/ui-blocks/horizontal-nav";
import { useProducts } from "@/data/products/get-products.data";
import { IProduct } from "@/schemas/product.schema";

type ProductsGridProps = { onEditProduct: Dispatch<IProduct> };

const productGridTabs = [
  { label: "Active", value: "active" },
  { label: "Archived", value: "archived" },
];

const ProductsGrid: FC<ProductsGridProps> = ({ onEditProduct }) => {
  const [selectedTab, setSelectedTab] = useState<typeof productGridTabs[number]>(productGridTabs[0]);
  const { page, limit, sortField, sortOrder, debouncedSearch } = useGridContext();

  const query = useProducts({
    page,
    limit,
    sortField,
    sortOrder,
    search: debouncedSearch,
  });

  const { totalCount = 0, data = [] } = query.data || {};

  return (
    <>
      <HorizontalNav
        label="Change product grid tab"
        id="product-grid-tab"
        options={productGridTabs}
        getOptionValue={(opt) => opt.value}
        getOptionLabel={(opt) => opt.label}
        value={selectedTab}
        onChange={(opt) => {
          if (!opt) return;
          setSelectedTab(opt);
        }}
      />
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
          <Grid.Heading className="flex-[11]">Products</Grid.Heading>
          <Grid.Heading className="w-[200px]">Price</Grid.Heading>
          <Grid.Heading className="flex-[2]">Status</Grid.Heading>
          <Grid.Heading className="flex-[6]">Date</Grid.Heading>
          <Grid.Heading className="flex-1" />
        </Grid.Header>
        <Grid.Body>
          {data.map((elm) => (
            <ProductRow key={`member-row-${elm.id}`} data={elm} onEditProduct={onEditProduct} />
          ))}
        </Grid.Body>
      </Grid.Base>
      {query.isSuccess && !query.isPlaceholderData && (
        <GridPagination totalCount={totalCount} scrollQuery="button#add-new-product" />
      )}
    </>
  );
};

export default ProductsGrid;
