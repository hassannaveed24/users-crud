import React, { ChangeEvent, DispatchWithoutAction, FC, useRef } from "react";
import ErrorManager from "@/services/error-manager";
import { useFormikContext } from "formik";
import Image from "next/image";
import { Button } from "@mantine/core";
import { ErroredFieldLabel } from "@/utils/validation";
import useBucketUploadMutation from "@/utils/use-bucket-upload-mutation";
import ToastClient from "@/services/toast-client";
import { ABORT_ERROR } from "@/constants/s3";
import { SingleProductForm } from "@/data/products/create-product.data";
import { DEFAULT_AVATAR } from "@/constants/data";
import { toast } from "react-toastify";

interface ProductAvatarProps {
  loading: boolean;
  onLoadStart: DispatchWithoutAction;
  onLoadEnd: DispatchWithoutAction;
}

const ProductAvatar: FC<ProductAvatarProps> = ({ loading, onLoadStart, onLoadEnd }) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const formik = useFormikContext<SingleProductForm>();

  const handleBlur = () => formik.setFieldTouched("avatar", true);

  const bucketMutation = useBucketUploadMutation();

  const handleChangeInput = async (event: ChangeEvent<HTMLInputElement>) => {
    handleBlur();
    toast.loading(undefined);
    const file = event.target.files?.[0];

    if (!file) {
      ErrorManager.handleError(new Error("Unable to select file"));
      return;
    }

    onLoadStart();

    bucketMutation.mutate(file, {
      onSuccess: (data) => {
        formik.setFieldValue("avatar", data.Location);
      },
      onError: (error: Error) => {
        onLoadEnd();
        if (error.message === ABORT_ERROR) return;
        if (fileInputRef.current) fileInputRef.current.value = "";
        ErrorManager.handleError(error);
      },
    });
  };

  const handleClick = () => {
    if (loading) return;
    if (fileInputRef.current) fileInputRef.current.click();
  };

  return (
    <div>
      <input type="file" className="hidden" ref={(ref) => (fileInputRef.current = ref)} onChange={handleChangeInput} />
      <ErroredFieldLabel name="avatar" id="avatar" onClick={handleClick}>
        Avatar
      </ErroredFieldLabel>

      <div className="mt-1 sm:col-span-2 sm:mt-0">
        <div className="flex items-center">
          <span className="w-12 h-12 overflow-hidden bg-gray-100 rounded-full " onClick={handleClick}>
            <Image
              onLoadingComplete={() => {
                const hasLoadedNewImage = !formik.values.avatar || !formik.dirty;
                if (hasLoadedNewImage) return; // prevent logic from executing in case of loading default/pre-existing image src
                ToastClient.success("Product avatar has been uploaded successfully");
                onLoadEnd();
              }}
              src={formik.values.avatar || DEFAULT_AVATAR}
              alt="Profile Picture"
              width={48}
              height={48}
              className="object-cover object-center w-12 h-12 cursor-pointer"
            />
          </span>
          <Button type="button" variant="default" className="ml-4" onClick={handleClick} loading={loading}>
            {loading ? "Changing" : "Change"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductAvatar;
