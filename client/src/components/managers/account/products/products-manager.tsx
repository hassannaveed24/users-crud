import React, { FC, Dispatch, DispatchWithoutAction } from "react";
import ProductsGrid from "./components/products-grid";
import { GridContext, GridContextWrapper } from "@/state/contexts/grid-context";
import Card from "@/components/ui-blocks/card";

import SearchInput from "@/components/ui-blocks/inputs/search-input";
import { Title, Text, Flex, Button, Group, useMantineTheme } from "@mantine/core";
import LimitSelect from "@/components/ui-blocks/selects/limit-select";
import PlusIcon from "@/assets/icons/plus.svg";
import { IProduct } from "@/schemas/product.schema";

interface ProductsManagerProps {
  onAddProduct: DispatchWithoutAction;
  onEditProduct: Dispatch<IProduct>;
}

const ProductsManager: FC<ProductsManagerProps> = ({ onAddProduct, onEditProduct }) => {
  const theme = useMantineTheme();

  return (
    <>
      <GridContextWrapper>
        <GridContext.Consumer>
          {({ search, setSearch, limit, setLimit, setPage }) => {
            return (
              <Card className="space-y-6">
                <Group position="apart">
                  <div className="max-[836px]:w-full max-[836px]:text-center">
                    <Title>Products</Title>
                    <Text color="textColors.1">Add and edit all your existing products</Text>
                  </div>

                  <Button
                    variant="default"
                    leftIcon={<PlusIcon width={20} height={20} color={theme.colors.textColors[0]} />}
                    styles={{ label: { color: theme.colors.textColors[0] } }}
                    className="max-[836px]:mx-auto"
                    onClick={onAddProduct}
                    id="add-new-product"
                  >
                    Add New Product
                  </Button>
                </Group>

                <div className="flex justify-center min-[1036px]:justify-start flex-wrap gap-3">
                  <SearchInput
                    id="search-products"
                    placeholder="Search products"
                    className="min-w-[400px]"
                    value={search}
                    onChange={setSearch}
                  />

                  <LimitSelect
                    value={limit}
                    onChange={(limit) => {
                      setPage(1);
                      setLimit(limit);
                    }}
                  />
                </div>

                <ProductsGrid onEditProduct={onEditProduct} />
              </Card>
            );
          }}
        </GridContext.Consumer>
      </GridContextWrapper>
      <Flex justify="end" pb={48} gap={8}>
        <Button variant="default">Cancel</Button>
        <Button>Save</Button>
      </Flex>
    </>
  );
};

export default ProductsManager;
