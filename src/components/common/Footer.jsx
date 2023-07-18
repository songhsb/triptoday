import React from 'react';
import { styled } from 'styled-components';

const Footer = () => {
  return (
    <>
      {/* <div>
        <img src="" alt="푸터로고" />
      </div> */}
      <StFooter>푸터 정보</StFooter>
    </>
  );
};

export default Footer;

const StFooter = styled.div`
  background-color: #ccc;
`;
