import { DEFAULT_AVATAR } from "@/constants/data";
import { ProductPricingSchema, ProductStatus } from "@/schemas/product.schema";
import store from "@/state/store";
import { ValidatedAPI } from "@/utils/api";
import { IProduce } from "immer/dist/internal";
import { z } from "zod";

export const SingleProductSchema = z.object({
  productId: z.string(),
  productTitle: z.string().trim().min(1, { message: "Please enter product name" }),
  avatar: z.string().nullable(),
  allowCustomPricing: z.boolean(),
  pricing: z.array(ProductPricingSchema).min(1, { message: "Please attach pricing" }),
});

export type SingleProductForm = z.infer<typeof SingleProductSchema>;

export interface SingleProductVariables {
  productId: string;
  productTitle: string;
  avatar: string | null;
  allowCustomPricing: boolean;
}

export interface SingleProductPayload extends SingleProductVariables {
  productDescription: string;
  status: ProductStatus;
  isActive: boolean;
  workspaceId: string;
  avatar: string;
}

export const GetSingleProductPayload = (variables: SingleProductVariables) => {
  const { selectedWorkspaceId } = store.getState().workspace;
  const payload: SingleProductPayload = {
    ...variables,
    avatar: variables.avatar || DEFAULT_AVATAR,
    productDescription: "One time offer product from test",
    status: ProductStatus.IN_STOCK,
    isActive: true,
    workspaceId: selectedWorkspaceId as string,
  };
  return payload;
};

export interface CreateSingleProductResponse {
  id: string;
  workspaceId: string;
  status: ProductStatus;
  productDescription: string;
  isActive: boolean;
  productTitle: string;
  allowCustomPricing: boolean;
  avatar: string;
  createdAt: string;
  updatedAt: string;
}

export const CreateSingleProduct = (payload: SingleProductPayload) =>
  ValidatedAPI.post<CreateSingleProductResponse, SingleProductPayload>("/product/create-product", payload);
