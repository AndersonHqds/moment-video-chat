import styled from "styled-components";
import { IconButtonProps } from "./types";

export const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
`;

export const VideoContainer = styled.div`
  width: 100%;
  height: 90vh;
  background-color: #333333;
`;

export const ToolBar = styled.div`
  width: 100%;
  height: 10vh;
  background-color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const IconButton = styled.button<IconButtonProps>`
  width: 60px;
  height: 60px;
  border-radius: 32px;
  background-color: ${(props) => (props.isActive ? "#EFEFEF" : "#DDD")};
  margin: 0 10px;
  font-size: 25px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: solid 1px #ddd;
  transition: 0.3s;
  cursor: pointer;
  color: #000c66;
  :hover {
    opacity: 0.5;
  }
`;
