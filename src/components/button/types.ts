import { ReactChild, ReactChildren } from "react";

export interface ButtonProps {
  backgroundColor?: string;
  color?: string;
  width?: number;
  height?: number;
  children: ReactChild | ReactChildren;
  fontSize?: number;
}
