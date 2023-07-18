import React from 'react';
import { useQuery } from 'react-query';
import { getPosts } from '../api/posts';
import { styled } from 'styled-components';
import { useNavigate } from 'react-router-dom';

const Main = () => {
  const { isLoading, isError, data } = useQuery('postsData', getPosts);
  const navigate = useNavigate();
  // if (isLoading) {
  //   return <h1>로딩중입니다.</h1>;
  // }

  // if (isError) {
  //   return <h1>오류가 발생했어요!</h1>;
  // }

  console.log(data);

  const handleDetailButtonClick = id => {
    navigate(`/detail/${id}`);
  };

  return (
    <>
      {/* // 메인배너  */}
      <div>
        <ul>
          <li>
            <img src="" alt="slide1" /> Main banner 1
          </li>
          <li>
            <img src="" alt="slide1" /> Main banner 2
          </li>
          <li>
            <img src="" alt="slide1" /> Main banner 3
          </li>
        </ul>
      </div>

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
        <select>
          <option>전체</option>
          <option>서울</option>
          <option>경기</option>
          <option>강원</option>
          <option>부산</option>
        </select>
        <StUl>
          {data?.data.map((item, index) => (
            <StyledDiaryBox key={index} onClick={() => handleDetailButtonClick(item.id)}>
              <div>
                <StTitle>{item.location}</StTitle>
                <StMpCategory>{item.category}</StMpCategory>
              </div>
            </StyledDiaryBox>
          ))}
        </StUl>
      </div>
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

const StyledDiaryBox = styled.li`
  padding: 20px;
  background-color: #dbe9f6;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.3s ease;
  cursor: pointer;

  &:hover {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }
`;

export const StTitle = styled.h2`
  margin-top: 0;
  font-size: 18px;
  font-weight: bold;
  color: #293241;
`;

const StMpCategory = styled.p`
  color: #888;
  font-size: 14px;
  margin-top: 5px;
`;
