type StaticImageData = {
  src: string;
  height: number;
  width: number;
  placeholder?: string;
};

declare type SVGComponent = React.FC<React.SVGProps<SVGSVGElement>>;

declare module "*.png" {
  const content: StaticImageData;
  export default content;
}

declare module "*.svg" {
  const content: SVGComponent;
  export default content;
}

declare module "*.jpg" {
  const content: StaticImageData;
  export default content;
}

declare module "*.jpeg" {
  const content: StaticImageData;
  export default content;
}

declare module "*.gif" {
  const content: StaticImageData;
  export default content;
}

declare module "*.webp" {
  const content: StaticImageData;
  export default content;
}

declare module "*.ico" {
  const content: StaticImageData;
  export default content;
}

declare module "*.bmp" {
  const content: StaticImageData;
  export default content;
}
