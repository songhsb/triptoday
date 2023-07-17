import React from 'react';
import { StButton, StButtonWrap } from '../components/common/Button';

const Join = () => {
  return (
    <>
      <h1>Join</h1>
      <form action="">
        <label htmlFor="">이름</label>
        <input type="text" />
        <label htmlFor="">닉네임</label>
        <input type="text" />
        <label htmlFor="">이메일</label>
        <input type="text" />
        <label htmlFor="">비밀번호</label>
        <input type="text" />
        <label htmlFor="">비밀번호 확인</label>
        <input type="text" />

        <label htmlFor="checkbox">관리자로 회원가입</label>
        <input type="checkbox" id="checkbox" />
        <StButtonWrap>
          <StButton disabled>회원가입</StButton>
          <StButton>홈으로 돌아가기</StButton>
        </StButtonWrap>
      </form>
    </>
  );
};

export default Join;
