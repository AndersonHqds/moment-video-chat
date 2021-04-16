import { ComponentPropsWithoutRef, forwardRef } from "react";
import { Input } from "./styled";

const InputComponent = forwardRef<
  HTMLInputElement,
  ComponentPropsWithoutRef<"input">
>((props, ref) => (
  <>
    <Input ref={ref} {...props} />
  </>
));

InputComponent.displayName = "InputComponent";

export default InputComponent;
