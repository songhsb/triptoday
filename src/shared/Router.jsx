import React from 'react';

import Main from '../pages/Main';
import Detail from '../pages/Detail';
import Join from '../pages/Join';
import Login from '../pages/Login';
import Layout from '../components/common/Layout';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Write from '../pages/Write';

const Router = () => {
  return (
    <BrowserRouter>
      <Header />
      <Layout>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/detail/:id" element={<Detail />} />
          <Route path="/join" element={<Join />} />
          <Route path="/login" element={<Login />} />
          <Route path="/write" element={<Write />} />
        </Routes>
      </Layout>
      <Footer />
    </BrowserRouter>
  );
};
export default Router;
