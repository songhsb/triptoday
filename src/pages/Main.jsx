import React, { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { getPosts } from '../api/posts';
import { styled } from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { StyledMoodSelect } from './Write';
import useInput from '../hooks/useInput';
import LoadingSpinner from '../components/common/LoadingSpinner';
import Slider from '../components/Main/Slider';
import Layout from '../components/common/Layout';
import { useRecoilValue } from 'recoil';
import { SearchAtom } from '../recoil/SearchAtom';
import { getLikes } from '../api/likes';
import Select from '../components/Main/Select';
import PostBox from '../components/Main/PostBox';

const Main = () => {
  const { isLoading, isError, data: posts } = useQuery('postsData', getPosts);
  const { data: likes } = useQuery('likes', getLikes);
  const [category, setCategory] = useInput(null);
  const [postList, setPostList] = useState([]);
  const [likeList, setLikeList] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const post = posts?.data;
    if ((!isLoading && !isError) || !likeList) {
      setPostList(post);
      setLikeList(likes);
    } else {
      setPostList(post);
      setLikeList([]);
    }
  }, [isLoading, isError, posts, likes]);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (isError) {
    return <h1>오류가 발생했어요!</h1>;
  }

  let postIdCount = {};
  if (likeList?.length > 0) {
    likeList.forEach(item => {
      const postId = item.id;
      postIdCount[postId] = item.userList?.length;
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
          <Select setCategory={setCategory} />
          <PostBox posts={posts} category={category} handleDetailButtonClick={handleDetailButtonClick} />
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
