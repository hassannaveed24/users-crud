export const S3_CLIENT_PARAMS = {
  region: process.env.NEXT_PUBLIC_S3_REGION,
  credentials: {
    accessKeyId: process.env.NEXT_PUBLIC_S3_ACCESS_KEY as string,
    secretAccessKey: process.env.NEXT_PUBLIC_S3_SECRET_KEY as string,
  },
};

export const ABORT_ERROR = "Upload aborted.";
