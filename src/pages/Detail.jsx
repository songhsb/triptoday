import React from 'react';
import BasicButtons from '../components/common/BasicButtons';
import { StButton } from '../components/common/Button';

const Detail = () => {
  return (
    <>
      <div>Detail</div>
      <BasicButtons></BasicButtons>
      <div></div>
      <div></div>
      <StButton $fontColor={'black'}>버튼입니다</StButton>
    </>
  );
};

export default Detail;
