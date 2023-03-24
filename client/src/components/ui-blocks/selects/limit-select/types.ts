import { Dispatch } from "react";
import { allLimitOptions } from "./constants";

export type LimitOption = typeof allLimitOptions[number];

export type ValidLimit = typeof allLimitOptions[number]["value"];

export interface LimitSelectProps {
  value: ValidLimit;
  onChange: Dispatch<ValidLimit>;
}
