import { forwardRef } from "react"
import { Input } from './styled';

const InputComponent = forwardRef<HTMLInputElement, React.ComponentPropsWithoutRef<'input'>>((props, ref) => (
  <>
    <Input ref={ref} {...props} />
  </>
));

export default InputComponent
