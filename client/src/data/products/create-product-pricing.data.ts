import {
  IProductPricing,
  PaymentDurationUnit,
  PaymentDurationUnitOption,
  PriceType,
  PriceTypeOption,
  ProductPricingSchema,
} from "@/schemas/product.schema";
import store from "@/state/store";
import { ValidatedAPI } from "@/utils/api";
import cuid from "cuid";
import { z } from "zod";

export interface ProductPricingForm
  extends Pick<IProductPricing, "unitPrice" | "repeatPaymentValue" | "forTotalValue"> {
  priceType: PriceTypeOption;
  repeatPaymentUnit: PaymentDurationUnitOption;
}

export const CreateProductPricingSchema = z.object({
  priceType: z.object({ label: z.string(), value: z.nativeEnum(PriceType) }),
  unitPrice: z.number(),
  repeatPaymentValue: z.number().nullable(),
  repeatPaymentUnit: z.object({ label: z.string(), value: z.nativeEnum(PaymentDurationUnit) }).nullable(),
  forTotalValue: z.number().nullable(),
});

export type CreateProductPricingVariables = z.infer<typeof CreateProductPricingSchema>;

// export type CreateProductPricingVariables = Omit<IProductPricing, "id" | "createdAt" | "updatedAt">;

export interface CreateProductPricingRequest
  extends Omit<
    CreateProductPricingVariables,
    "priceType" | "forTotalValue" | "repeatPaymentUnit" | "repeatPaymentValue"
  > {
  totalPrice: number | null;
  priceType: PriceType;
  repeatPaymentValue: number | null;
  repeatPaymentUnit: PaymentDurationUnit | null;
  workspaceId: string;
  pricingId: string;
  productId: string;
  forTotalValue: number | null;
  forTotalUnit: PaymentDurationUnit | null;
  currency: string;
  pricingDetails: string;
}

export const getTotalPrice = (priceType: PriceType, unitPrice: number, forTotalValue: number | null) =>
  priceType === PriceType.PAYMENTPLAN ? unitPrice * (forTotalValue || 0) : null;

export const GetCreateProductPricingPayload = (
  variables: CreateProductPricingVariables & { productId: string; pricingId?: string }
) => {
  const { repeatPaymentUnit, priceType, unitPrice, forTotalValue } = variables;
  const { selectedWorkspaceId } = store.getState().workspace;

  const payload: CreateProductPricingRequest = {
    pricingId: cuid(),
    ...variables,
    totalPrice: getTotalPrice(priceType.value, unitPrice, forTotalValue),
    priceType: priceType.value,
    repeatPaymentUnit: repeatPaymentUnit?.value || null,
    workspaceId: selectedWorkspaceId || "",
    forTotalUnit: priceType.value === PriceType.PAYMENTPLAN ? repeatPaymentUnit?.value || null : null,
    currency: "USD",
    pricingDetails: "This pricing will be working as subscription",
  };

  return payload;
};

export const CreateProductPricing = (payload: CreateProductPricingRequest) =>
  ValidatedAPI.post<IProductPricing, CreateProductPricingRequest>("/product/create-product-pricing", payload);
