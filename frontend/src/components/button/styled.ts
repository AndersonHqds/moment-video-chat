import styled from "styled-components";
import { ButtonProps } from "./types";

export const Button = styled.button<ButtonProps>`
  background-color: ${(props) => props.backgroundColor ?? "#FFF"};
  color: ${(props) => props.color ?? "#000C66"};
  width: ${(props) => props.width ?? "135px"};
  height: ${(props) => props.height ?? "45px"};
  border-radius: ${(props) => (props.height ? props.height / 2 : "25px")};
  border: none;
  font-size: ${(props) => props.fontSize ?? "18px"};
  transition: 0.3s;
  cursor: pointer;
  :hover:enabled {
    opacity: 0.8;
  }
  :disabled {
    filter: brightness(55%);
  }
`;
