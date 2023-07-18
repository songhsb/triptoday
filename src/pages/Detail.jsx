import React from 'react';
import useInput from '../hooks/useInput';
import styled from 'styled-components';
import BasicButtons from '../components/common/BasicButtons';
import { StButton } from '../components/common/Button';
import { StInput } from '../components/common/InputStyle';

const Detail = () => {
  // 코멘트 관련 입니다
  const [body, onChangeBodyHandler] = useInput();
  // 코멘트 관련 입니다

  return (
    <>
      {/* 코멘트 섹션입니다 */}
      <section>
        <div>
          <StCommentForm onSubmit={e => e.preventDefault()}>
            <StInput type="text" placeholder="오늘의 여행은 어떠셨나요?" value={body} onChange={onChangeBodyHandler}></StInput>
            <StButton type="onSubmit">추가</StButton>
          </StCommentForm>
        </div>
        <ul>
          {/* {data?.map(item => {
            return <li>{item.body}</li>;
          })} */}
        </ul>
      </section>
      {/* 코멘트 섹션입니다 */}
    </>
  );
};

export default Detail;

const StCommentForm = styled.form`
  display: flex;
  align-items: baseline;
  gap: 10px;
`;
