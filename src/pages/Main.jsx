import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { getPosts } from '../api/posts';
import { styled } from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { StButton } from '../components/common/Button';
import { StyledMoodSelect } from './Write';
import useInput from '../hooks/useInput';
import Slider from '../components/Main/Slider';
import Layout from '../components/common/Layout';

const Main = () => {
  const { isLoading, isError, data } = useQuery('postsData', getPosts);
  const [category, setCategory] = useInput(null);
  const navigate = useNavigate();
  // if (isLoading) {
  //   return <h1>로딩중입니다.</h1>;
  // }

  // if (isError) {
  //   return <h1>오류가 발생했어요!</h1>;
  // }

  const handleDetailButtonClick = id => {
    navigate(`/detail/${id}`);
  };

  return (
    <>
      {/* // 메인배너  */}
      <Slider />
      <Layout>
        {/* 베스트 여행지  */}
        <div>
          <div>
            1위
            {/* 호버 */}
            <div>
              <div>타이틀</div>
              <div>소개</div>
            </div>
          </div>
          <div>
            2위
            {/* 호버 */}
            <div>
              <div>타이틀</div>
              <div>소개</div>
            </div>
          </div>
          <div>
            3위
            {/* 호버 */}
            <div>
              <div>타이틀</div>
              <div>소개</div>
            </div>
          </div>
        </div>

        <div>
          {/* 셀렉트박스  */}
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
          <StUl>
            {data?.data
              .filter(item => !category || item.category === category)
              .map((item, index) => (
                <StyledPostsyBox key={index} onClick={() => handleDetailButtonClick(item.id)}>
                  <div>
                    <StImage src={item.image} />
                    <StTitle>{item.location}</StTitle>
                    <StMpCategory>{item.category}</StMpCategory>
                  </div>
                </StyledPostsyBox>
              ))}
          </StUl>
        </div>
      </Layout>
    </>
  );
};

export default Main;

const StUl = styled.ul`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  padding: 5px;
  margin: 5px;
  gap: 20px;
`;

export const StyledPostsyBox = styled.li`
  padding: 10px;
  background-color: #dbe9f6;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.3s ease;
  cursor: pointer;

  &:hover {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }
`;

export const StImage = styled.img`
  width: 190px;
  height: 206px;
  margin-bottom: 5px;
`;

export const StTitle = styled.h2`
  margin-top: 0;
  font-size: 18px;
  font-weight: bold;
  color: #293241;
`;

export const StMpCategory = styled.p`
  color: #888;
  font-size: 14px;
  margin-top: 5px;
`;
