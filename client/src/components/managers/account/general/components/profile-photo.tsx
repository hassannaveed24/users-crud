import { DefaultAvatarIcon } from "@/assets/icons";
import React, { ChangeEvent, FC, useRef } from "react";
import { toast } from "react-toastify";
import useBucketUploadMutation from "@/utils/use-bucket-upload-mutation";
import ErrorManager from "@/services/error-manager";
import { useFormikContext } from "formik";
import Image from "next/image";
import nProgress from "nprogress";
import { Button } from "@mantine/core";
import { UpdateUserFormValues } from "@/data/user/update-user.data";

const ProfilePhoto: FC<Record<string, never>> = () => {
  const fileInputRef = useRef<HTMLInputElement | undefined>();

  const profileUploadMutation = useBucketUploadMutation();
  const formik = useFormikContext<UpdateUserFormValues>();

  const { isLoading } = profileUploadMutation;

  const handleBlur = () => formik.setFieldTouched("picture", true);

  const error = (formik.errors as any).picture;

  const handleChangeInput = (event: ChangeEvent<HTMLInputElement>): void => {
    nProgress.start();
    handleBlur();
    const file = event.target.files?.[0];
    if (!file) {
      ErrorManager.handleError(new Error("Unable to select file"));
      nProgress.done();
      return;
    }

    profileUploadMutation.mutate(file, {
      onSuccess: (data) => {
        formik.setFieldValue("picture", data.Location);
        toast.success("Profile photo has been uploaded successfully");
      },
      onError: (error: Error) => ErrorManager.handleError(error),
      onSettled: () => {
        if (fileInputRef.current) fileInputRef.current.value = "";
        nProgress.done();
      },
    });
  };

  const handleClick = () => {
    if (isLoading) return;
    if (fileInputRef.current) fileInputRef.current.click();
  };

  return (
    <div>
      <input type="file" className="hidden" ref={fileInputRef as any} onChange={handleChangeInput} />
      <label
        htmlFor="sg-account-photo"
        className="block mb-1 text-sm font-medium text-gray-700 transition-colors cursor-pointer hover:text-brand"
        onClick={handleClick}
      >
        Photo
      </label>

      <div className="mt-1 sm:col-span-2 sm:mt-0">
        <div className="flex items-center">
          <span className="w-12 h-12 overflow-hidden bg-gray-100 rounded-full cursor-pointer" onClick={handleClick}>
            {formik.values.picture ? (
              <Image
                src={formik.values.picture as string}
                alt="Profile Picture"
                width={48}
                height={48}
                className="object-cover object-center w-12 h-12"
              />
            ) : (
              <DefaultAvatarIcon className="w-full h-full text-gray-300 transition-colors hover:text-gray-400" />
            )}
          </span>
          <Button type="button" variant="default" className="ml-4" loading={isLoading} onClick={handleClick}>
            Change
          </Button>
        </div>
      </div>
      {error && formik.touched.picture && !isLoading ? <p className="mt-2 text-sm text-red-500">{error}</p> : null}
    </div>
  );
};

export default ProfilePhoto;
