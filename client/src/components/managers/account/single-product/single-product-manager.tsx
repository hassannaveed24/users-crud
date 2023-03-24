import React, { FC, DispatchWithoutAction, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import ErrorManager from "@/services/error-manager";
import { Form, Formik } from "formik";
import { validateFromZod } from "@/utils/validation";
import ProductAvatar from "./components/product-avatar";
import Input from "@/components/inputs/Input";
import Card from "@/components/ui-blocks/card";
import { AxiosError } from "axios";
import { Button, Title, Text, useMantineTheme, Group, Divider, Stack, LoadingOverlay } from "@mantine/core";
import ArrowLeftIcon from "@/assets/icons/arrow-left.svg";
import Toggle from "@/components/ui-blocks/toggle";
import {
  CreateSingleProduct,
  CreateSingleProductResponse,
  GetSingleProductPayload,
  SingleProductForm,
  SingleProductPayload,
  SingleProductSchema,
} from "@/data/products/create-product.data";
import ProductPricingGrid from "./components/product-pricing-grid";
import { QueryKeys } from "@/constants/query-keys";
import { IProduct } from "@/schemas/product.schema";
import { Nullable } from "@/types/misc.type";
import cuid from "cuid";
import { z } from "zod";
import ToastClient from "@/services/toast-client";
import { UpdatePaginatedCache } from "@/data/cache.data";
import { isEqual } from "lodash";
import { SingleRouteAction } from "@/constants/data";

interface SingleProductManagerProps {
  action: SingleRouteAction;
  selectedProduct: Nullable<IProduct>;
  onGoBack: DispatchWithoutAction;
}

const getFormValues = (product: Nullable<IProduct>) => ({
  productId: product?.id || cuid(),
  productTitle: product?.productTitle || "",
  avatar: product?.avatar || null,
  allowCustomPricing: product?.allowCustomPricing || false,
  pricing: product?.pricing || [],
});

const SingleProductManager: FC<SingleProductManagerProps> = ({ action, selectedProduct, onGoBack }) => {
  const theme = useMantineTheme();

  const [isLoadingAvatar, setIsLoadingAvatar] = useState<boolean>(false);

  const { mutate, isLoading } = useMutation<CreateSingleProductResponse, AxiosError, SingleProductPayload>(
    CreateSingleProduct
  );

  const [initialValues, setInitialValues] = useState<SingleProductForm>(() => getFormValues(selectedProduct));

  const isEditing = action === SingleRouteAction.EDIT;

  return (
    <Formik
      enableReinitialize
      initialValues={initialValues}
      validateOnBlur={false}
      validateOnChange={false}
      validateOnMount={false}
      validate={(values) =>
        validateFromZod(z.object({ productTitle: z.string().trim().min(1, { message: "Please enter product name" }) }))(
          { productTitle: values.productTitle }
        )
      }
      onSubmit={(values, _actions) => {
        const result = SingleProductSchema.safeParse(values);

        if (!result.success) {
          ErrorManager.handleZodError(result.error, { heading: "Error adding new product" });
          return;
        }

        const payload = GetSingleProductPayload(result.data);

        mutate(payload, {
          onSuccess: (data) => {
            const product: IProduct = {
              ...payload,
              id: payload.productId,
              pricing: result.data.pricing,
              createdAt: data.createdAt,
              updatedAt: data.updatedAt,
            };

            setInitialValues(getFormValues(product));

            UpdatePaginatedCache([QueryKeys.PRODUCTS, { workspaceId: payload.workspaceId }], product, {
              strategy: isEditing ? "persist" : "increment",
            });

            ToastClient.success("Product has been added");
          },
          onError: (error) => {
            ErrorManager.handleError(error, { heading: "Error adding product" });
          },
        });
      }}
    >
      {({ values, setFieldValue }) => (
        <div className="space-y-6">
          {isLoading && (
            <div className="fixed inset-0 w-screen h-screen z-[500] !mt-0">
              <LoadingOverlay visible />
            </div>
          )}
          <Form className="space-y-6">
            <Card>
              <Group>
                <Button variant="default" w={38} h={38} p={0} onClick={onGoBack}>
                  <ArrowLeftIcon width={20} height={20} color={theme.colors.textColors[0]} />
                </Button>
                <Title fw={600}>{isEditing ? "Edit" : "Add new"} Product</Title>
              </Group>
              <Divider my={30} />
              <Stack spacing={32}>
                <div className="flex flex-col gap-6 lg:flex-row">
                  <div className="w-[400px]">
                    <Title>Details</Title>
                    <Text color="textColors.2">Select your product name and image here</Text>
                  </div>

                  <div className="space-y-6 flex-1">
                    <Input name="productTitle" label="Product Name" placeholder="Growth Hacker" isRequired />
                    <ProductAvatar
                      loading={isLoadingAvatar}
                      onLoadStart={() => setIsLoadingAvatar(true)}
                      onLoadEnd={() => setIsLoadingAvatar(false)}
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-6 lg:flex-row">
                  <div className="w-[400px] shrink-0">
                    <Title>Pricing</Title>
                    <Text color="textColors.2">Set up one or multiple pricing for your product</Text>
                  </div>

                  <div className="space-y-6 flex-1">
                    <ProductPricingGrid
                      data={values.pricing}
                      productId={values.productId}
                      onSetPricing={(e) => {
                        const $pricing = structuredClone(values.pricing);

                        const index = $pricing.findIndex((p) => p.id === e.id);

                        if (index !== -1) $pricing[index] = e;
                        else $pricing.push(e);

                        setFieldValue("pricing", $pricing);
                      }}
                    />
                    <div className="flex justify-between items-center gap-4">
                      <div className="flex-1">
                        <Title fw={500} fz="md">
                          Allow Custom Pricing
                        </Title>
                        <Text>
                          This gives members permission to define custom pricing structures for this product (when deals
                          close)
                        </Text>
                      </div>
                      <Toggle
                        label="Enable custom pricing"
                        isChecked={values.allowCustomPricing}
                        onChange={(checked) => setFieldValue("allowCustomPricing", checked)}
                      />
                    </div>
                  </div>
                </div>
              </Stack>
            </Card>
            <div className="flex justify-end w-full gap-2 pb-6">
              <Button type="button" variant="default" onClick={onGoBack}>
                Cancel
              </Button>
              <Button type="submit" disabled={isLoadingAvatar || isEqual(initialValues, values)}>
                Save
              </Button>
            </div>
          </Form>
        </div>
      )}
    </Formik>
  );
};

export default SingleProductManager;
