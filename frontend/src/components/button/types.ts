import React, { ReactChild, ReactChildren } from "react";

export interface ButtonProps extends React.ComponentPropsWithoutRef<"button"> {
  backgroundColor?: string;
  color?: string;
  width?: number;
  height?: number;
  children: ReactChild | ReactChildren;
  fontSize?: number;
  disabled?: boolean;
}
