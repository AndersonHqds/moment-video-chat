import { forwardRef } from "react";
import { Button } from "./styled";
import { ButtonProps } from "./types";

const ButtonComponent = forwardRef<HTMLButtonElement, ButtonProps>(
  (props, ref) => (
    <Button ref={ref} {...props}>
      {props.children}
    </Button>
  )
);

ButtonComponent.displayName = "ButtonComponent";

export default ButtonComponent;
