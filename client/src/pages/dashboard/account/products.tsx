import { useState } from "react";
import { EnhancedNextPage } from "@/types/next";
import AuthGaurd from "@/utils/auth-gaurd";
import SettingsLayout from "@/components/layouts/settings-layout";
import ProductsManager from "@/components/managers/account/products/products-manager";
import { Nullable } from "@/types/misc.type";
import { IProduct } from "@/schemas/product.schema";
import SingleProductManager from "@/components/managers/account/single-product/single-product-manager";
import { SingleRouteAction } from "@/constants/data";

const ProductsPage: EnhancedNextPage = () => {
  const [action, setAction] = useState<SingleRouteAction>(SingleRouteAction.NONE);
  const [selectedProduct, setSelectedProduct] = useState<Nullable<IProduct>>();

  if (action === SingleRouteAction.NONE)
    return (
      <ProductsManager
        onAddProduct={() => {
          setAction(SingleRouteAction.ADD);
        }}
        onEditProduct={(product) => {
          setAction(SingleRouteAction.EDIT);
          setSelectedProduct(product);
        }}
      />
    );

  return (
    <SingleProductManager
      action={action}
      selectedProduct={selectedProduct}
      onGoBack={() => {
        setSelectedProduct(null);
        setAction(SingleRouteAction.NONE);
      }}
    />
  );
};

ProductsPage.getLayout = (page) => (
  <AuthGaurd>
    <SettingsLayout headTitle="Products">{page}</SettingsLayout>
  </AuthGaurd>
);

export default ProductsPage;
