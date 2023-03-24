export type Nullable<T> = T | null | undefined;

export type HashMap<T> = { [key: string]: T | undefined };

export interface Option<T> {
  label: string;
  value: T;
}
