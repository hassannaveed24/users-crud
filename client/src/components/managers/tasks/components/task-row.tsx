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
import { ITask } from "@/schemas/task.schema";

interface ProductRowProps {
  data: ITask;
  onEditProduct: Dispatch<ITask>;
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
          <Text color="textColors.0" className="overflow-hidden max-w-[300px] whitespace-nowrap text-ellipsis">
            {data.workspaceMember.member.memberName}
          </Text>
        </Grid.Cell>

        <Grid.Cell className="w-[200px]">Sales Call</Grid.Cell>

        <Grid.Cell className="flex-[6]">
          <Text color="textColors.0">{data.workspaceMember.member.memberEmail}</Text>
        </Grid.Cell>

        <Grid.Cell className="flex-[6]">
          <Text color="textColors.0">{moment(data.scheduledDate).format("LL")}</Text>
        </Grid.Cell>

        <Grid.Cell className="flex-[6]">
          <Text color="textColors.0">{moment(data.scheduledDate).format("h:mm A")}</Text>
        </Grid.Cell>

        <Grid.Cell className="w-[150px]">
          <Text color="textColors.0">Won</Text>
        </Grid.Cell>

        <Grid.Cell className="flex-1 ">
          <button type="button" className="text-sm font-medium text-textColors-1" onClick={() => onEditProduct(data)}>
            Edit<span className="sr-only">, {data.workspaceMember.member.memberName}</span>
          </button>
        </Grid.Cell>
      </Grid.Row>
    </>
  );
};

export default ProductRow;
