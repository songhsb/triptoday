import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { styled } from 'styled-components';

const ModalPortal = ({ children, closePortal }) => {
  const ref = useRef();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (document) {
      const dom = document.getElementById('modal-portal');
      ref.current = dom; // ref에 dom값 전달
    }
  }, []);

  if (ref.current && mounted) {
    // mounted 됐고, dom이 존재하는 경우 modal 렌더링 진행
    return createPortal(
      <StOuter role="presentation">
        <StInner>{children}</StInner>
      </StOuter>,
      ref.current,
    );
  }
  return null;
};

export default ModalPortal;

const StOuter = styled.div`
  background-color: rgba(0, 0, 0, 0.5);
  width: 100%;
  height: 100%;
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
  height: 280px;
  border-radius: 10px;
  padding: 25px;
`;
