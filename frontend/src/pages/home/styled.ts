import styled from "styled-components";
import { GridProps } from "./types";

export const Container = styled.div`
  width: 100%;
  height: 100vh;
  background-image: linear-gradient(to right, #7ec8e3, #5252ed);
  display: grid;
  grid-template-columns: 50% 50%;
  grid-row-gap: 100px;
`;

export const Logo = styled.div`
  display: flex;
  font-family: "Lilita One", sans-serif;
  font-size: 42px;
  color: #fff;
  padding-left: 100px;
  width: 100%;
  padding-bottom: 50px;
`;

export const Grid = styled.div<GridProps>`
  display: flex;
  flex-direction: column;
  justify-content: ${(props) => props.justify ?? "flex-end"};
`;

export const PhoneImage = styled.img`
  width: 80%;
  align-self: center;
`;

export const DescriptionContainer = styled.div`
  width: 100%;
  font-family: "Lilita One", sans-serif;
  color: #fff;
  font-weight: bold;
  margin-bottom: 50px;
`;

export const MainText = styled.h1`
  font-size: 42px;
  padding-right: 20px;
`;

export const SecondaryText = styled.h2`
  font-size: 24px;
`;

export const InputContainer = styled.div`
  width: 425px;
  display: flex;
  justify-content: space-between;
  margin-bottom: 50px;
`;

export const ButtonContainer = styled.div`
  width: 100%;
  height: 50px;
`;
