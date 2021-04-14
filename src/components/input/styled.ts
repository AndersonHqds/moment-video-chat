import styled from "styled-components";

export const Input = styled.input`
  width: 200px;
  border-radius: 4px;
  height: 45px;
  border: none;

  ::placeholder,
  ::-webkit-input-placeholder {
    padding-left: 10px;
    font-size: 18px;
    color: #000c66;
  }
  :-ms-input-placeholder {
    padding-left: 10px;
    font-size: 18px;
    color: #000c66;
  }
`;
