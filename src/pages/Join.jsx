import React from 'react';
import { StButton, StButtonWrap } from '../components/common/Button';
import InputStyle, { StInput, StLabel } from '../components/common/InputStyle';
import { styled } from 'styled-components';

const Join = () => {
  return (
    <>
      <h1>Join</h1>
      <StJoinForm action="">
        <StLabel>이름</StLabel>
        <StInput type="text" />
        <StLabel>닉네임</StLabel>
        <StInput type="text" />
        <StLabel>이메일</StLabel>
        <StInput type="text" />
        <StLabel>비밀번호</StLabel>
        <StInput type="text" />
        <StLabel>비밀번호 확인</StLabel>
        <StInput type="text" />

        <input type="checkbox" id="checkbox" />
        <label htmlFor="checkbox">관리자로 회원가입</label>
        <StButtonWrap>
          <StButton disabled>회원가입</StButton>
          <StButton>홈으로 돌아가기</StButton>
        </StButtonWrap>
      </StJoinForm>
    </>
  );
};

export default Join;

const StJoinForm = styled.form`
  max-width: 500px;
  margin: 0 auto;
`;
