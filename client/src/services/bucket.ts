import { S3_CLIENT_PARAMS } from "@/constants/s3";
import { S3Client } from "@aws-sdk/client-s3";

class Bucket extends S3Client {}

const bucket = new Bucket(S3_CLIENT_PARAMS);

export default bucket;
