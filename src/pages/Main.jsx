import React, { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { getPosts } from '../api/posts';
import { styled } from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { StButton } from '../components/common/Button';
import { StyledMoodSelect } from './Write';
import useInput from '../hooks/useInput';
import { getComments } from '../api/comments';
import LoadingSpinner from '../components/common/LoadingSpinner';
import Slider from '../components/Main/Slider';
import Layout from '../components/common/Layout';

const Main = () => {
  const { isLoading, isError, data: posts } = useQuery('postsData', getPosts);
  const { data: comments } = useQuery('comments', getComments);
  const [category, setCategory] = useInput(null);
  const [postList, setPostList] = useState([]);
  const [commentList, setCommentList] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const post = posts?.data;
    const comment = comments;
    if (!isLoading && !isError) {
      setPostList(post);
      setCommentList(comment);
    } else {
      setPostList(post);
      setCommentList([]);
    }
  }, [isLoading, isError, posts, comments]);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (isError) {
    return <h1>오류가 발생했어요!</h1>;
  }

  let postIdCount = {};
  if (commentList) {
    commentList.forEach(item => {
      const postId = item.postId;
      if (!postIdCount.hasOwnProperty(postId)) {
        postIdCount[postId] = 1; // 해당 게시물에 첫 댓글이므로 1로 초기화
      } else {
        postIdCount[postId] += 1; // 해당 게시물의 댓글 수가 이미 기록되어 있으므로 1 증가
      }
    });
  }

  const sortedCounts = Object.entries(postIdCount)
    .sort((a, b) => b[1] - a[1])
    .map(([postId, count]) => postId);

  let firstId = sortedCounts[0];
  let secondId = sortedCounts[1];
  let threeId = sortedCounts[2];

  const firstPostData = postList?.find(item => item.id == firstId);
  const SecondPostData = postList?.find(item => item.id == secondId);
  const ThreePostData = postList?.find(item => item.id == threeId);

  const handleDetailButtonClick = id => {
    navigate(`/detail/${id}`);
  };

  return (
    <>
      <LoadingSpinner />
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

        {/* 베스트 여행지  */}
        <StLankingDiv>
          <div>
            1위
            <StUl>
              <StyledPostsyBox key={firstPostData?.id} onClick={() => handleDetailButtonClick(firstPostData?.id)}>
                <div>
                  <StImage src={firstPostData?.image} />
                  <StTitle>{firstPostData?.location}</StTitle>
                  <StMpCategory>{firstPostData?.category}</StMpCategory>
                </div>
              </StyledPostsyBox>
            </StUl>
          </div>
          <div>
            2위
            <StUl>
              <StyledPostsyBox key={SecondPostData?.id} onClick={() => handleDetailButtonClick(SecondPostData?.id)}>
                <div>
                  <StImage src={SecondPostData?.image} />
                  <StTitle>{SecondPostData?.location}</StTitle>
                  <StMpCategory>{SecondPostData?.category}</StMpCategory>
                </div>
              </StyledPostsyBox>
            </StUl>
          </div>
          <div>
            3위
            <StUl>
              <StyledPostsyBox key={ThreePostData?.id} onClick={() => handleDetailButtonClick(ThreePostData?.id)}>
                <div>
                  <StImage src={ThreePostData?.image} />
                  <StTitle>{ThreePostData?.location}</StTitle>
                  <StMpCategory>{ThreePostData?.category}</StMpCategory>
                </div>
              </StyledPostsyBox>
            </StUl>
          </div>
        </StLankingDiv>

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
            {posts.data
              ?.filter(item => !category || item.category === category)
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

const StLankingDiv = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
`;

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
