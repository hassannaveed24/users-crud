import MiscUtils from "@/utils/misc-utils";
import { z } from "zod";

export enum ProductStatus {
  "IN_STOCK" = "IN_STOCK",
  "SOLD" = "SOLD",
  "EXPIRED" = "EXPIRED",
}

export enum PriceType {
  "ONETIME" = "ONETIME",
  "SUBSCRIPTION" = "SUBSCRIPTION",
  "PAYMENTPLAN" = "PAYMENTPLAN",
}

export const PriceTypeOptions = [
  { label: "One Time", value: PriceType.ONETIME },
  { label: "Subscription", value: PriceType.SUBSCRIPTION },
  { label: "Payment Plan", value: PriceType.PAYMENTPLAN },
] as const;

export type PriceTypeOption = typeof PriceTypeOptions[number];

export enum PaymentDurationUnit {
  DAY = "DAY",
  WEEK = "WEEK",
  MONTH = "MONTH",
  YEAR = "YEAR",
}

export const PaymentDurationUnitOptions = Object.values(PaymentDurationUnit).map((e) => ({
  label: MiscUtils.capitalize(e),
  value: e,
}));

export type PaymentDurationUnitOption = typeof PaymentDurationUnitOptions[number];

export enum Currency {
  "USD" = "USD",
}

export const ProductPricingSchema = z.object({
  id: z.string(),
  workspaceId: z.string(),
  productId: z.string(),
  priceType: z.nativeEnum(PriceType),
  unitPrice: z.number().min(0, { message: "Invalid number" }),
  totalPrice: z.number().nullable(),
  repeatPaymentValue: z.number().min(0, { message: "Invalid number" }).nullable(),
  repeatPaymentUnit: z.nativeEnum(PaymentDurationUnit).nullable(),
  forTotalValue: z.number().min(1, { message: "Invalid number" }).nullable(),
  forTotalUnit: z.nativeEnum(PaymentDurationUnit).nullable(),
  currency: z.nativeEnum(Currency),
  pricingDetails: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export type IProductPricing = z.infer<typeof ProductPricingSchema>;

export const ProductSchema = z.object({
  id: z.string(),
  workspaceId: z.string(),
  status: z.nativeEnum(ProductStatus),
  productDescription: z.string(),
  isActive: z.boolean(),
  productTitle: z.string(),
  allowCustomPricing: z.boolean(),
  avatar: z.string(),
  pricing: z.array(ProductPricingSchema),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export type IProduct = z.infer<typeof ProductSchema>;
