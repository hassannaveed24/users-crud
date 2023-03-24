import randomBytes from "randombytes";
import { Upload } from "@aws-sdk/lib-storage";
import { useMutation } from "@tanstack/react-query";
import bucket from "@/services/bucket";
import { CompleteMultipartUploadCommandOutput } from "@aws-sdk/client-s3";
import store from "@/state/store";
import { ImageTypes, AllowedFileTypes } from "@/constants/file-types";
import { User } from "@auth0/auth0-spa-js";
import MiscUtils from "./misc-utils";
import { useLoggedInUser } from "@/data/user/auth.data";
import { QueryKeys } from "@/constants/query-keys";
import { Router } from "next/router";

class BucketUploadMutationUtils {
  userId: string;

  constructor(private file: Blob) {
    this.userId = (store.getState().auth.user as User).sub as string;
  }

  getFileNameAndExtension() {
    const fileSegments = this.file.name.split(".");
    const lastSegmentIndex = fileSegments.length - 1;
    const fileExtension = fileSegments[lastSegmentIndex];
    const restFileSegments = fileSegments.filter((_segment) => _segment !== fileExtension);
    const fileName = restFileSegments.join(".");
    return { fileName, fileExtension };
  }

  generateObjectKey() {
    const randomId = randomBytes(16).toString("hex");
    const timestamp = MiscUtils.getUNIXTimestamp(new Date());

    const { fileName, fileExtension } = this.getFileNameAndExtension();

    const urlSafeFileName = encodeURI(fileName.replace(/[^a-z0-9]/gi, "-").toLowerCase());
    const urlSafeUserId = encodeURI(this.userId.replace("|", "/"));
    const objectKey = `${urlSafeUserId}/${randomId}/${timestamp}/${urlSafeFileName}.${fileExtension}`;
    return objectKey;
  }
}

type BucketUploadMutationProps = {
  showProgress?: boolean;
  allowedFileTypes?: AllowedFileTypes;
  onProgress?: (progressPercentage: number) => void;
  onProgressEnd?: () => void;
};

const useBucketUploadMutation = (props?: BucketUploadMutationProps) => {
  const { allowedFileTypes = Object.values(ImageTypes) } = props || {};
  const user = useLoggedInUser();

  const userId = user.sub;

  return useMutation<CompleteMultipartUploadCommandOutput, Error, Blob>(
    [QueryKeys.BUCKET_UPLOAD],
    async (file: Blob) => {
      if (!userId) return Promise.reject(new Error("Please login again to authenticate yourself"));

      const bucketUploadMutationUtils = new BucketUploadMutationUtils(file);
      const { fileExtension } = bucketUploadMutationUtils.getFileNameAndExtension();

      if (!allowedFileTypes.includes(fileExtension))
        return Promise.reject(new Error("Invalid file type, please select a valid file to upload"));

      const objectKey = bucketUploadMutationUtils.generateObjectKey();

      const params = {
        Body: file,
        Key: objectKey,
        Bucket: process.env.NEXT_PUBLIC_S3_BUCKET_NAME,
      };

      const commandParams = {
        client: bucket,
        params,
      };

      const uploadCommand = new Upload(commandParams);

      // uploadCommand.on("httpUploadProgress", (progress: Progress) => {
      //   const progressPercentage: number = Math.min(((progress.loaded || 0) * 100) / (progress.total || 1));
      //   if (showProgress) nProgress.set(progressPercentage / 100);

      //   if (progressPercentage < 100) onProgress?.(progressPercentage);
      //   else onProgressEnd?.();
      // });

      Router.events.on("routeChangeStart", () => {
        uploadCommand.abort();
        uploadCommand.removeAllListeners();
      });

      const uploadCommandOutput = await uploadCommand.done();

      const { Location } = uploadCommandOutput as CompleteMultipartUploadCommandOutput;

      if (!Location) return Promise.reject(new Error("Upload aborted for some reason"));

      const successfulUploadOutput = uploadCommandOutput as CompleteMultipartUploadCommandOutput;

      successfulUploadOutput.Location = MiscUtils.sanitiseBucketURL(Location);

      return uploadCommandOutput;
    }
  );
};

export default useBucketUploadMutation;
