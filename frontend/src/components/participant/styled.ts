import styled from "styled-components";
import { IconButtonProps, ToolbarProps, VideoCardProps } from "./types";

export const VideoCard = styled.div<VideoCardProps>`
  width: ${(props) => props.width ?? "100%"};
  height: ${(props) => props.height ?? "100%"};
  display: flex;
  justify-content: center;
  flex-direction: column;
  position: relative;
`;

export const Video = styled.video`
  width: 90%;
  align-self: center;
  height: 100%;
  object-fit: fill;
  background-color: #000;
`;

export const VideoTurnedOff = styled.div`
  width: 90%;
  height: 100%;
  background-color: #000;
  align-self: center;
`;

export const ToolBar = styled.div<ToolbarProps>`
  width: 90%;
  align-self: center;
  height: 50px;
  background-color: #555;
  display: flex;
  align-items: center;
  position: absolute;
  ${({ top }) => (top ? `top: 0;` : `bottom: 0;`)}
  opacity: ${(props) => props.opacity ?? "1"};
  ${({ justifyCenter }) => justifyCenter && `justify-content: center;`};
  transition: 0.5s;
  color: #fff;
`;

export const FirstNameChar = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 20px;
  background-color: #e3e3e3;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 10px;
  color: #000;
`;

export const IconButton = styled.button<IconButtonProps>`
  width: 32px;
  height: 32px;
  border-radius: 16px;
  background-color: ${(props) => (props.isActive ? "#EFEFEF" : "#b00525")};
  margin: 0 10px;
  font-size: 25px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: solid 1px #ddd;
  transition: 0.3s;
  cursor: pointer;
  color: ${(props) => (props.isActive ? "#000c66" : "#EFEFEF")};
  :hover {
    opacity: 0.5;
  }
`;
