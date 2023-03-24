import React, { Dispatch, FC } from "react";
import Image from "next/image";
import Grid from "@/components/ui-blocks/grid";
import { IProduct, IProductPricing } from "@/schemas/product.schema";
import moment from "moment";
import { Text } from "@mantine/core";
import MiscUtils from "@/utils/misc-utils";
import { useRouter } from "next/router";
import { accountRoutePathname } from "@/constants/navigation";
import { DEFAULT_AVATAR } from "@/constants/data";

interface ProductRowProps {
  data: IProduct;
  onEditProduct: Dispatch<IProduct>;
}

const renderProductPricingCell = (pricing: IProductPricing[]) => {
  if (pricing.length <= 0) return null;

  if (pricing.length === 1) return <Text color="textColors.0">{MiscUtils.format(pricing[0].unitPrice)}</Text>;

  return (
    <>
      <Text color="textColors.0">Starting at {MiscUtils.format(pricing[0].unitPrice)}</Text>
      <Text color="textColors.2">and {pricing.length - 1} other prices</Text>
    </>
  );
};

const ProductRow: FC<ProductRowProps> = ({ data, onEditProduct }) => {
  return (
    <>
      <Grid.Row>
        <div className="pl-10"></div>
        <Grid.Cell className="flex-[11]" skeletonProps={{ count: 1.7 }}>
          <div className="flex items-center">
            <Image
              className="flex-shrink-0 rounded-full object-cover w-10 h-10"
              alt={data.productTitle}
              src={data.avatar || DEFAULT_AVATAR}
              width={40}
              height={40}
            />
            <p className="ml-4 inline-block overflow-hidden font-medium text-textColors-1 max-w-[300px] whitespace-nowrap text-ellipsis">
              {data.productTitle}
            </p>
          </div>
        </Grid.Cell>

        <Grid.Cell className="w-[200px]">{renderProductPricingCell(data.pricing)}</Grid.Cell>

        <Grid.Cell className="flex-[2]">
          <Text color="textColors.0">{data.isActive ? "Active" : "Inactive"}</Text>
        </Grid.Cell>

        <Grid.Cell className="flex-[6]">
          <Text color="textColors.0">{moment(data.createdAt).format("LL")}</Text>
          <Text color="textColors.2">Updated {moment(data.updatedAt).fromNow()}</Text>
        </Grid.Cell>

        <Grid.Cell className="flex-1 ">
          <button type="button" className="text-sm font-medium text-textColors-1" onClick={() => onEditProduct(data)}>
            Edit<span className="sr-only">, {data.productTitle}</span>
          </button>
        </Grid.Cell>
      </Grid.Row>
    </>
  );
};

export default ProductRow;
