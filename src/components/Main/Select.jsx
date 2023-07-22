import React from 'react';
import { StyledMoodSelect } from '../Write/WriteForm';

function Select({ setCategory }) {
  return (
    <StyledMoodSelect onChange={setCategory}>
      <option value="">전체</option>
      <option value="서울">서울</option>
      <option value="대구">대구</option>
      <option value="부산">부산</option>
      <option value="경기도">경기도</option>
      <option value="강원도">강원도</option>
      <option value="충청도">충청도</option>
      <option value="경상도">경상도</option>
      <option value="전라도">전라도</option>
      <option value="제주도">제주도</option>
    </StyledMoodSelect>
  );
}

export default Select;
