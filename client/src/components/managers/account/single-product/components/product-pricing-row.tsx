import React, { FC } from "react";
import Image from "next/image";
import Grid from "@/components/ui-blocks/grid";
import {
  IProduct,
  IProductPricing,
  PaymentDurationUnitOption,
  PaymentDurationUnitOptions,
  PriceType,
  PriceTypeOption,
  PriceTypeOptions,
} from "@/schemas/product.schema";
import moment from "moment";
import { Box, Text } from "@mantine/core";
import MiscUtils from "@/utils/misc-utils";
import { useInternalGridContext } from "@/components/ui-blocks/grid/context";

interface ProductPricingRowProps {
  data: IProductPricing;
}

const getShouldPluralize = (number: number | null) => (number || 1) !== 1;

const pluralize = (word: string) => `${word}s`;

const getRepetitionFrequency = (
  priceTypeOption: PriceTypeOption,
  meta: {
    repeatPaymentValue: number | null;
    repeatPaymentUnit?: PaymentDurationUnitOption;
    forTotalValue: number | null;
    forTotalUnit?: PaymentDurationUnitOption;
  }
) => {
  const { repeatPaymentValue, repeatPaymentUnit, forTotalValue, forTotalUnit } = meta;

  const repeatUnit = repeatPaymentUnit?.label?.toLocaleLowerCase() || "";
  const totalUnit = forTotalUnit?.label?.toLocaleLowerCase() || "";

  const repeatPaymentLabel = getShouldPluralize(repeatPaymentValue)
    ? `${repeatPaymentValue} ${pluralize(repeatUnit)}`
    : repeatUnit;

  const forTotalLabel = getShouldPluralize(forTotalValue)
    ? `${forTotalValue} ${pluralize(totalUnit)}`
    : `a ${totalUnit}`;

  switch (priceTypeOption.value) {
    case PriceType.ONETIME: {
      return priceTypeOption.label.toLowerCase();
    }
    case PriceType.SUBSCRIPTION: {
      return `every ${repeatPaymentLabel}`;
    }
    case PriceType.PAYMENTPLAN: {
      return `every ${repeatPaymentLabel} for ${forTotalLabel}`;
    }
    default: {
      return "";
    }
  }
};

const PriceTypeBadgeColors = {
  [PriceType.ONETIME]: "#4F46E5",
  [PriceType.SUBSCRIPTION]: "#0284C7",
  [PriceType.PAYMENTPLAN]: "#CB6E17",
} as const;

const ProductPricingRow: FC<ProductPricingRowProps> = (props) => {
  const { data } = props;

  const { editModal } = useInternalGridContext();

  const selectedPriceType = PriceTypeOptions.find((e) => e.value === data.priceType) as PriceTypeOption;
  const selectedRepeatPaymentUnit = PaymentDurationUnitOptions.find((e) => e.value === data.repeatPaymentUnit);
  const selectedForTotalUnit = PaymentDurationUnitOptions.find((e) => e.value === data.forTotalUnit);

  return (
    <>
      <Grid.Row>
        <div className="pl-10"></div>
        <Grid.Cell className="flex-[14]">
          <Text color="textColors.0">
            <strong>{MiscUtils.format(data.unitPrice)}</strong>{" "}
            {getRepetitionFrequency(selectedPriceType, {
              repeatPaymentValue: data.repeatPaymentValue,
              repeatPaymentUnit: selectedRepeatPaymentUnit,
              forTotalValue: data.forTotalValue,
              forTotalUnit: selectedForTotalUnit,
            })}
          </Text>
        </Grid.Cell>

        <Grid.Cell className="flex-[5]">
          <Box
            component="span"
            sx={(theme) => ({
              padding: "4px 8px",
              boxShadow: theme.shadows.md,
              backgroundColor: PriceTypeBadgeColors[data.priceType],
              borderRadius: 4,
              color: theme.colors.slate[7],
              fontSize: theme.fontSizes.xs,
            })}
          >
            {MiscUtils.capitalize(selectedPriceType?.label)}
          </Box>
        </Grid.Cell>

        <Grid.Cell className="w-[70px]">
          <button
            type="button"
            className="text-sm font-medium text-textColors-1"
            onClick={() => {
              editModal.setData(data);
              editModal.setVisibility(true);
            }}
          >
            Edit<span className="sr-only">, One time pricing</span>
          </button>
        </Grid.Cell>
      </Grid.Row>
    </>
  );
};

export default ProductPricingRow;
