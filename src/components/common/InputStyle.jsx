import React from 'react';
import { styled } from 'styled-components';

const InputStyle = ({ children }) => {
  return (
    <>
      <StLabel>{children}</StLabel>
      <StInput />
    </>
  );
};

export default InputStyle;

const StLabel = styled.label``;
const StInput = styled.input`
  width: ${props => props.$inputWidth || '100%'};
  border: 0;
  border: solid 1px #ddd;
  border-radius: 10px;
  padding: 13px;
  margin: 12px 0;
  &::placeholder {
    color: #cecece;
  }
  &:focus {
    border: 0;
    border: solid 3px #9adcff;
    box-shadow: rgba(18, 14, 250, 0.1) 2px 4px 10px;
  }
`;

export { StLabel, StInput };
