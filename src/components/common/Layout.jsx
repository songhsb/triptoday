import React from 'react';
import { styled } from 'styled-components';
import TopBtn from './TopBtn';

const Layout = ({ children }) => {
  return (
    <>
      <Container>{children}</Container>
      <TopBtn />
    </>
  );
};

export default Layout;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 80px 10px;
`;
