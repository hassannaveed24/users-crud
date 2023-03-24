import CurrencyInput from "react-currency-input-field";
import { ModalProps } from "@/components/ui-blocks/grid/context";
import Modal from "@/components/ui-blocks/modal";
import { getDefaultSelectClassNames, getDefaultSelectStyles } from "@/constants/select-styles";
import { IProductPricing, PaymentDurationUnitOptions, PriceType, PriceTypeOptions } from "@/schemas/product.schema";
import { ErroredFieldLabel, FieldLabel, validateFromZod } from "@/utils/validation";
import { Formik } from "formik";
import React, { useMemo, FC, DispatchWithoutAction, Dispatch } from "react";
import ReactSelect from "react-select";
import { Stack, Button, Text } from "@mantine/core";
import MiscUtils from "@/utils/misc-utils";
import { InputClassNames } from "@/components/inputs/Input";
import cls from "classnames";
import DumbInputInline from "@/components/inputs/dumb/dumb-input-inline";
import { useMutation } from "@tanstack/react-query";
import {
  CreateProductPricing,
  CreateProductPricingRequest,
  CreateProductPricingSchema,
  GetCreateProductPricingPayload,
  getTotalPrice,
  ProductPricingForm,
} from "@/data/products/create-product-pricing.data";
import { AxiosError } from "axios";
import ErrorManager from "@/services/error-manager";
import ToastClient from "@/services/toast-client";

interface ProductPricingModalProps extends ModalProps<IProductPricing> {
  productId: string;
  onSetPricing: Dispatch<IProductPricing>;
}

const ProductPricingModal: FC<ProductPricingModalProps> = (props) => {
  const { isVisible, setVisibility, data, setData, onSetPricing, productId } = props;

  const isEditing = useMemo(() => Boolean(data), [data]);

  const initialValues = useMemo<ProductPricingForm>(() => {
    const selectedPriceType = PriceTypeOptions.find((e) => e.value === data?.priceType);
    return {
      priceType: selectedPriceType || PriceTypeOptions[0],
      unitPrice: data?.unitPrice || 0,
      repeatPaymentValue: data?.repeatPaymentValue ?? 1,
      repeatPaymentUnit:
        PaymentDurationUnitOptions.find((e) => e.value === data?.repeatPaymentUnit) || PaymentDurationUnitOptions[2],
      forTotalValue: data?.forTotalValue ?? 1,
    };
  }, [data]);

  const { mutate, isLoading } = useMutation<IProductPricing, AxiosError, CreateProductPricingRequest>(
    CreateProductPricing
  );

  const handleClose = (resetForm: DispatchWithoutAction) => {
    resetForm();
    setVisibility(false);
    setData(undefined);
  };

  return (
    <>
      <Formik
        enableReinitialize
        initialValues={initialValues}
        validate={validateFromZod(CreateProductPricingSchema)}
        onSubmit={(values, { resetForm }) => {
          const payload = GetCreateProductPricingPayload({ ...values, productId });

          // edit functionality
          if (isEditing) payload.pricingId = data?.id || "";

          mutate(payload, {
            onSuccess: (updatedPricing) => {
              onSetPricing(updatedPricing);
              ToastClient.success(`Pricing has been ${isEditing ? "edited" : "added"}`);
              handleClose(resetForm);
            },
            onError: (error) => {
              ErrorManager.handleError(error, { heading: "Error adding pricing" });
            },
          });
        }}
      >
        {({ values, setFieldValue, setFieldTouched, resetForm, dirty }) => (
          <Modal
            opened={isVisible}
            onClose={() => handleClose(resetForm)}
            title={`${isEditing ? "Edit" : "Add"} Pricing`}
            loading={isLoading}
            footer={
              <>
                <Button variant="default" onClick={() => handleClose(resetForm)}>
                  Cancel
                </Button>
                <Button type="submit" disabled={isEditing && !dirty}>
                  {isEditing ? "Edit" : "Add"} Price
                </Button>
              </>
            }
          >
            <Stack spacing={24}>
              <div>
                <ErroredFieldLabel id="price-type" name="priceType">
                  Payment Type
                </ErroredFieldLabel>
                <ReactSelect
                  isSearchable={false}
                  menuPortalTarget={document.body}
                  styles={getDefaultSelectStyles()}
                  classNames={getDefaultSelectClassNames()}
                  options={PriceTypeOptions}
                  value={values.priceType}
                  onBlur={() => setFieldTouched("priceType", true)}
                  onChange={(opt) => {
                    if (!opt) return;
                    setFieldValue("priceType", opt);
                  }}
                />
              </div>

              <div>
                <ErroredFieldLabel id="unit-price" name="unitPrice">
                  {values.priceType.value === PriceType.PAYMENTPLAN ? "Recurring Amount" : "Price"}
                </ErroredFieldLabel>
                <CurrencyInput
                  id="unit-price"
                  className={cls(InputClassNames, "h-[38px] text-textColors-3 disabled:opacity-25")}
                  prefix="$"
                  name="unit-price"
                  value={values.unitPrice}
                  onValueChange={(value, name, values) => {
                    if (!name) return;
                    if (!values?.float) return;
                    if (values.float <= 0) return;

                    setFieldValue("unitPrice", values.float);
                  }}
                  onBlur={() => setFieldTouched("unitPrice", true)}
                />
              </div>

              {values.priceType.value !== PriceType.ONETIME && (
                <div className="flex gap-6 ">
                  <div className={`flex-${values.priceType.value === PriceType.PAYMENTPLAN ? 5 : 1}`}>
                    <FieldLabel id="repeat-payment">Repeat Payment Every</FieldLabel>
                    <div className="w-full flex gap-2">
                      <DumbInputInline
                        className="flex-1"
                        inputProps={{
                          id: "repeat-payment",
                          name: "repeatPaymentValue",
                          type: "number",
                          value: values.repeatPaymentValue || 0,
                          onChange: (e) => {
                            const value = Number(e.target.value);
                            if (value <= 0) return;
                            setFieldValue("repeatPaymentValue", value);
                          },
                          onBlur: () => setFieldTouched("repeatPaymentValue", true),
                        }}
                      />
                      <ReactSelect
                        menuPortalTarget={document.body}
                        styles={getDefaultSelectStyles()}
                        classNames={getDefaultSelectClassNames({ container: () => "flex-1" })}
                        options={PaymentDurationUnitOptions}
                        value={values.repeatPaymentUnit}
                        onBlur={() => setFieldTouched("repeatPaymentUnit", true)}
                        onChange={(opt) => {
                          if (!opt) return;
                          setFieldValue("repeatPaymentUnit", opt);
                        }}
                      />
                    </div>
                  </div>

                  {values.priceType.value === PriceType.PAYMENTPLAN && (
                    <div className="flex-3">
                      <ErroredFieldLabel id="number-of-payments" name="forTotalValue">
                        Number of Payments
                      </ErroredFieldLabel>
                      <DumbInputInline
                        inputProps={{
                          id: "number-of-payments",
                          name: "forTotalValue",
                          type: "number",
                          value: values.forTotalValue || 0,
                          className: "flex-1",
                          onChange: (e) => {
                            const value = Number(e.target.value);
                            if (value <= 0) return;
                            setFieldValue("forTotalValue", value);
                          },
                          onBlur: () => setFieldTouched("forTotalValue", true),
                        }}
                      />
                    </div>
                  )}
                </div>
              )}
              {values.priceType.value === PriceType.PAYMENTPLAN && (
                <Text color="textColors.0" fw={500} fz="md" pb={12}>
                  Total Price ={" "}
                  <span className="font-[700]">
                    {MiscUtils.format(
                      getTotalPrice(values.priceType.value, values.unitPrice, values.forTotalValue) || 0
                    )}
                  </span>
                </Text>
              )}
            </Stack>
          </Modal>
        )}
      </Formik>
    </>
  );
};

export default ProductPricingModal;
