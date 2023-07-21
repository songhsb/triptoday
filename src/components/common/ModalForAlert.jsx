import React from 'react';
import { styled } from 'styled-components';

const ModalForAlert = () => {
  return (
    <StOuter>
      <StInner></StInner>
    </StOuter>
  );
};

export default ModalForAlert;

const StOuter = styled.div`
  background-color: rgba(0, 0, 0, 0.5);
  overflow-x: hidden;
  /* overflow-y: scroll; */

  width: 100%;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 10;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StInner = styled.div`
  background-color: #fff;
  width: 400px;
  height: 250px;
  border-radius: 10px;
`;
