import React, { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { getPosts } from '../api/posts';
import { styled } from 'styled-components';
import { useNavigate } from 'react-router-dom';
import useInput from '../hooks/useInput';
import LoadingSpinner from '../components/common/LoadingSpinner';
import Slider from '../components/Main/Slider';
import Layout from '../components/common/Layout';
import { GoHeartFill } from 'react-icons/go';
// import Select from '../components/common/Select'; // 내꺼
import { getLikes } from '../api/likes';
import Select from '../components/Main/Select'; // 승범님꺼
import PostBox from '../components/Main/PostBox';
import { getComments } from '../api/comments';
const Main = () => {
  const { isLoading, isError, data: posts } = useQuery('postsData', getPosts);
  const { data: likes } = useQuery('likes', getLikes);
  const { data: comments } = useQuery('comments', getComments);
  const [category, setCategory] = useInput(null);
  const [postList, setPostList] = useState([]);
  const [likeList, setLikeList] = useState([]);
  const navigate = useNavigate();
  // const [select, setSelect] = useState(false);
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
  console.log(postIdCount);
  const sortedCounts = Object.entries(postIdCount)
    .sort((a, b) => b[1] - a[1])
    .map(([postId, count]) => postId);
  console.log(sortedCounts);

  let firstId = sortedCounts[0];
  let secondId = sortedCounts[1];
  let threeId = sortedCounts[2];
  const firstPostData = postList?.find(item => item.id == firstId);
  const SecondPostData = postList?.find(item => item.id == secondId);
  const ThreePostData = postList?.find(item => item.id == threeId);
  console.log(firstPostData);

  const firstlikes = postIdCount[firstId];
  const Secondlikes = postIdCount[secondId];
  const Threeikes = postIdCount[threeId];
  const handleDetailButtonClick = id => {
    navigate(`/detail/${id}`);
  };
  // const OPTIONS = [
  //   { value: '서울', name: '서울' },
  //   { value: '대구', name: '대구' },
  //   { value: '부산', name: '부산' },
  //   { value: '경기도', name: '경기도' },
  //   { value: '강원도', name: '강원도' },
  //   { value: '충청도', name: '충청도' },
  //   { value: '경상도', name: '경상도' },
  //   { value: '전라도', name: '전라도' },
  //   { value: '제주도', name: '제주도' },
  // ];
  // const selectHandler = () => {
  //   console.log('000');
  //   setSelect(true);
  // };
  return (
    <>
      <LoadingSpinner />
      {/* // 메인배너  */}
      <Slider />
      <Layout>
        {/* 베스트 여행지  */}
        <StLankTitle>오늘의 베스트 여행지</StLankTitle>
        <StLankingDiv>
          <StRankItem url={firstPostData?.image} key={firstPostData?.id} onClick={() => handleDetailButtonClick(firstPostData?.id)}>
            <StLike>
              <GoHeartFill /> {firstlikes}
            </StLike>
            <StHoverLayer>
              <div>{firstPostData?.location}</div>
              <div>{firstPostData?.category}</div>
            </StHoverLayer>
          </StRankItem>
          <StRankItem url={SecondPostData?.image} key={SecondPostData?.id} onClick={() => handleDetailButtonClick(SecondPostData?.id)}>
            <StLike>
              <GoHeartFill /> {Secondlikes}
            </StLike>
            <StHoverLayer>
              <div>{SecondPostData?.location}</div>
              <div>{SecondPostData?.category}</div>
            </StHoverLayer>
          </StRankItem>
          <StRankItem url={ThreePostData?.image} key={ThreePostData?.id} onClick={() => handleDetailButtonClick(ThreePostData?.id)}>
            <StLike>
              <GoHeartFill /> {Threeikes}
            </StLike>
            <StHoverLayer>
              <div>{ThreePostData?.location}</div>
              <div>{ThreePostData?.category}</div>
            </StHoverLayer>
          </StRankItem>
        </StLankingDiv>
        <div>
          {/* 셀렉트박스  */}
          {/* <Select onClick={selectHandler} select={select} setSelect={setSelect} options={OPTIONS}></Select> */}
          <Select setCategory={setCategory} />
          <PostBox posts={posts} category={category} handleDetailButtonClick={handleDetailButtonClick} />
        </div>
      </Layout>
    </>
  );
};
export default Main;
const StLankTitle = styled.h2`
  font-weight: bold;
  font-size: 2rem;
  text-align: center;
  padding: 0 0 50px;
`;
const StLankingDiv = styled.div`
  display: flex;
  height: 330px;
  overflow: hidden;
  gap: 20px;
  margin-bottom: 50px;
`;
const StRankItem = styled.div`
  flex-grow: 1;
  background-color: #efefef;
  background-image: url(${props => props.url});
  background-position: center;
  background-size: cover;
  cursor: pointer;
  position: relative;
  &:first-child {
    flex-grow: 2;
  }
  &:hover {
    > div {
      opacity: 1;
    }
  }
`;
const StLike = styled.h2`
  display: inline-block;
  padding: 7px 15px;
  border-radius: 30px;
  margin: 10px;
  background-color: rgba(0, 0, 0, 0.3);
  position: relative;
  top: 2px;
  color: #fff;
  font-weight: bold;
  svg {
    position: relative;
    top: 2px;
    margin-right: 5px;
    filter: invert(39%) sepia(41%) saturate(6518%) hue-rotate(328deg) brightness(117%) contrast(122%);
  }
`;
const StHoverLayer = styled.div`
  width: 100%;
  height: 100%;
  background: linear-gradient(180deg, rgba(13, 235, 225, 0) 0%, rgba(0, 0, 0, 0.7147233893557423) 86%);
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  padding: 20px;
  color: #fff;
  display: flex;
  align-items: flex-end;
  justify-content: flex-end;
  transition: all 0.3s;
  opacity: 0;
  > div {
    padding-left: 5px;
  }
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
  background-color: #f0f4f7;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.3s ease;
  cursor: pointer;
  &:hover {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }
`;
export const StImage = styled.img`
  width: 100%;
  height: 206px;
  border-radius: 3px;
  margin-bottom: 5px;
`;
export const StTitle = styled.h2`
  margin-top: 5px;
  font-size: 18px;
  font-weight: bold;
  color: #293241;
`;
export const StMpCategory = styled.p`
  color: #888;
  font-size: 14px;
  margin: 5px 0;
`;
