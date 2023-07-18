import React from 'react';

import Main from '../pages/Main';
import Detail from '../pages/Detail';
import Join from '../pages/Join';
import Login from '../pages/Login';
import Layout from '../components/common/Layout';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MapTest from '../pages/MapTest';

const Router = () => {
  return (
    <BrowserRouter>
      <Header />
      <Layout>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/detail" element={<Detail />} />
          <Route path="/join" element={<Join />} />
          <Route path="/login" element={<Login />} />
          <Route path="/map-test" element={<MapTest />} />
        </Routes>
      </Layout>
      <Footer />
    </BrowserRouter>
  );
};
export default Router;
