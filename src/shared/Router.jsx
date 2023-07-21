import React from 'react';
import Main from '../pages/Main';
import Detail from '../pages/Detail';
import Join from '../pages/Join';
import Login from '../pages/Login';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MapTest from '../pages/MapTest';
import Write from '../pages/Write';
import UpdateWrite from '../pages/UpdateWrite';
import ModalPortal from '../components/common/alarmConfirm/ModalPortal';
import AlarmContainer from '../components/common/alarmConfirm/AlarmContainer';

const Router = () => {
  return (
    <BrowserRouter>
      <AlarmContainer />
      <Header />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/detail/:id" element={<Detail />} />
        <Route path="/join" element={<Join />} />
        <Route path="/login" element={<Login />} />
        <Route path="/map-test" element={<MapTest />} />
        <Route path="/write" element={<Write />} />
        <Route path="/update/:id" element={<UpdateWrite />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};
export default Router;
