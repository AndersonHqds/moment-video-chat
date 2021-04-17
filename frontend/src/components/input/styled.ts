import styled from "styled-components";

export const Input = styled.input`
  width: 190px;
  border-radius: 4px;
  height: 45px;
  border: none;
  font-size: 18px;
  color: #000c66;
  padding-left: 10px;
  margin-right: 10px
  ::placeholder,
  ::-webkit-input-placeholder {
    color: #000c66;
  }
  :-ms-input-placeholder {
    color: #000c66;
  }
`;
