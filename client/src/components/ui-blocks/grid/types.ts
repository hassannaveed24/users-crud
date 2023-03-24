import { MouseEventHandler } from "react";
import { InternalGridContextValue } from "./context";

export type DetailedDivProps = React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>;

export interface RenderPropedChildren {
  children: ((internalContext: InternalGridContextValue) => React.ReactNode) | React.ReactNode;
}

export interface ErrorStateOptions {
  title: string;
  description: string;
}

export interface EmptyStateOptions {
  text: string;
  label: string;
  onClick: MouseEventHandler<HTMLButtonElement>;
}
