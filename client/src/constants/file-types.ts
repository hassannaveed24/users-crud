/* eslint-disable no-unused-vars */
export enum ImageTypes {
  PNG = "png",
  JPG = "jpg",
  JPEG = "jpeg",
}

export const FileTypes = {
  Images: ImageTypes,
};

export type AllowedFileTypes = Array<ImageTypes | unknown>;
