import React from 'react';
import { styled } from 'styled-components';

const Layout = ({ children }) => {
  return <Container>{children}</Container>;
};

export default Layout;

const Container = styled.div`
  max-width: 1200px;
  padding: 80px 10px;
`;
