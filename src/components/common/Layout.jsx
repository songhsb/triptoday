import { onAuthStateChanged } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import { styled } from 'styled-components';
import { auth, db } from '../../firebase';
import { addDoc, collection, getDocs, query } from 'firebase/firestore';

const Layout = ({ children }) => {
  useEffect(() => {
    onAuthStateChanged(auth, user => {
      console.log('userUseEffect', user);
    });
  }, []);

  return <Container>{children}</Container>;
};
export default Layout;
const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 80px 10px;
`;
