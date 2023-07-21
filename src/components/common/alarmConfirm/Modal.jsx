// 이건 아마 사용 안함

import React from 'react';
import { styled } from 'styled-components';

const Modal = () => {
  return (
    <StOuter>
      <StInner></StInner>
    </StOuter>
  );
};

export default Modal;

const StOuter = styled.div`
  background-color: rgba(0, 0, 0, 0.5);
  width: 100%;
  height: 100%;
  position: absolute;
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
