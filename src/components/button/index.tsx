import { Button } from './styled';
import { ButtonProps } from './types';

const ButtonComponent = (props: ButtonProps) => (
  <Button {...props}>{props.children}</Button>
);

export default ButtonComponent;