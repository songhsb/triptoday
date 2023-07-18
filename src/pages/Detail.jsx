import React from 'react';
import useInput from '../hooks/useInput';
import styled from 'styled-components';
import BasicButtons from '../components/common/BasicButtons';
import { StButton } from '../components/common/Button';
import { StInput } from '../components/common/InputStyle';

const Detail = () => {
  const [body, onChangeBodyHandler] = useInput();
  return (
    <>
      <div>Detail</div>
      <BasicButtons></BasicButtons>
      <div></div>
      <div></div>
      <StButton $fontColor={'black'}>버튼입니다</StButton>
      {/* 코멘트 섹션입니다 */}
      <section>
        <div>
          <StCommentForm onSubmit={e => e.preventDefault()}>
            <StInput type="text" name="body" placeholder="오늘의 여행은 어떠셨나요?" value={body} onChange={onChangeBodyHandler}></StInput>
            <StButton type="onSubmit">추가</StButton>
          </StCommentForm>
        </div>
        <ul>
          <li>
            <p>이메일</p>
            <p>내용</p>
          </li>
          <li>
            <p>이메일</p>
            <p>내용</p>
          </li>
          <li>
            <p>이메일</p>
            <p>내용</p>
          </li>
        </ul>
      </section>
    </>
  );
};

export default Detail;

const StCommentForm = styled.form`
  display: flex;
  align-items: baseline;
  gap: 10px;
`;
