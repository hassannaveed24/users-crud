import React, { Dispatch, FC, useState, useMemo } from "react";
import Grid from "@/components/ui-blocks/grid";
import { useMantineTheme, Button, Group, Text } from "@mantine/core";
import PlusIcon from "@/assets/icons/plus.svg";
import ProductPricingRow from "./product-pricing-row";
import ProductPricingModal from "../modals/product-pricing.modal";
import { IProductPricing } from "@/schemas/product.schema";
import { ModalProps } from "@/components/ui-blocks/grid/context";
import cuid from "cuid";
import { useFormikContext } from "formik";
import { SingleProductForm } from "@/data/products/create-product.data";
import { uniqBy } from "lodash";

interface ProductPricingGridProps {
  data: IProductPricing[];
  productId: string;
  onSetPricing: Dispatch<IProductPricing>;
}

const ProductPricingGrid: FC<ProductPricingGridProps> = ({ data, productId, onSetPricing }) => {
  const theme = useMantineTheme();
  const [isPricingModal, setIsPricingModal] = useState(false);
  const [pricingModalData, setPricingModalData] = useState<IProductPricing>();

  const pricingModal = useMemo<ModalProps<IProductPricing>>(
    () => ({
      isVisible: isPricingModal,
      setVisibility: setIsPricingModal,
      data: pricingModalData,
      setData: setPricingModalData,
    }),
    [isPricingModal, pricingModalData]
  );

  return (
    <>
      <ProductPricingModal {...pricingModal} productId={productId} onSetPricing={onSetPricing} />
      <Group position="right">
        <Button
          variant="default"
          sx={{ root: { display: "inline-block", float: "right" } }}
          onClick={() => {
            setIsPricingModal(true);
          }}
          leftIcon={<PlusIcon width={20} height={20} color={theme.colors.textColors[0]} />}
        >
          Add Pricing
        </Button>
      </Group>
      <Grid.Base
        className="min-w-[570px]"
        context={{
          isEmpty: data.length <= 0,
          editModal: pricingModal,
          emptyState: (
            <div className="h-[150px] flex justify-center items-center">
              <Text>No pricing attached</Text>
            </div>
          ),
        }}
      >
        <Grid.Header>
          <div className="pl-10"></div>
          <Grid.Heading className="flex-[14]">Price</Grid.Heading>
          <Grid.Heading className="flex-[5]">Payment Type</Grid.Heading>
          <Grid.Heading className="w-[70px]" />
        </Grid.Header>
        <Grid.Body>
          {data.map((elm, i) => (
            <ProductPricingRow key={i} data={elm} />
          ))}
        </Grid.Body>
      </Grid.Base>
    </>
  );
};

export default ProductPricingGrid;
