import React, { useEffect, useState } from 'react';
import useInput from '../hooks/useInput';
import { Route, Routes, useNavigate, useParams } from 'react-router-dom';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { auth } from '../firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { deletePosts, getPosts } from '../api/posts';
import { getComments, addComment } from '../api/comments';
import { StCategory, StImage, StMpCategory, StTitle, StyledPostsyBox } from './Main';
import { styled } from 'styled-components';
import { StButton } from '../components/common/Button';
import { StInput } from '../components/common/InputStyle';
import { touristAttraction } from '../api/touristAttraction';
import axios from 'axios';
import { StCommentLi } from '../components/comment/commentStyle';

const Detail = () => {
  const navigate = useNavigate();
  const param = useParams();
  const id = param.id;
  const [list, setList] = useState([]);

  const { isLoading, isError, data } = useQuery('postsData', getPosts);

  const queryClient = useQueryClient();

  const postsMutation = useMutation(deletePosts, {
    onSuccess: () => {
      queryClient.invalidateQueries('postsData');
    },
  });

  const handleUpdateButtonClick = async id => {
    navigate(`/update/${id}`);
  };

  const handleDeleteButtonClick = async id => {
    postsMutation.mutate(id);
    navigate('/');
  };

  // 코멘트 관련 입니다
  const [userEmail, setUserEmail] = useState('');

  // 로그인된 사용자 정보
  useEffect(() => {
    console.log('나냐 ???????????');
    onAuthStateChanged(auth, user => {
      // console.log('UseEffect1-유저모든정보', user);
      setUserEmail(user?.email);
    });
  }, []);
  const { data: comments } = useQuery(['comments'], getComments);
  const commentsMutation = useMutation(addComment, {
    onSuccess: () => {
      queryClient.invalidateQueries(['comments']);
    },
  });
  const [body, onChangeBodyHandler, reset] = useInput();
  const handleCommentSubmit = e => {
    if (e) {
      e.preventDefault();
      commentsMutation.mutate({ email: '작성자 아이디', body, postId: id });
      reset();
    }
  };

  useEffect(() => {
    if (!isLoading && !isError) {
      locationData();
    }
  }, [isLoading, isError]);

  if (isLoading) {
    return <div>로딩중 입니다.</div>;
  }

  const posts = data.data.find(item => item.id == id);

  // 명소 관련 입니다

  const locationarea = posts.location.slice(5, 8);

  const locationData = async () => {
    try {
      const data = await touristAttraction(locationarea);
      setList(data);
    } catch (error) {
      console.error('Error fetching data:', error);
      return false;
    }
  };

  // 다른 지역 구간 입니다.
  const handleDetailButtonClick = id => {
    navigate(`/detail/${id}`);
  };

  return (
    <>
      {/* 메인 부분 */}
      <StDetailMain>
        <div>
          <StDetailImage src={posts.image} />
        </div>
        <div></div>
        <div>
          <StTitle>{posts.location}</StTitle>
          <div>
            <StDetailCategory>지역: {posts.category}</StDetailCategory>
            <p>{posts.description}</p>
          </div>
          <div>
            <StButton $fontColor={'black'} onClick={() => handleUpdateButtonClick(posts.id)}>
              수정
            </StButton>
            <StButton $fontColor={'black'} onClick={() => handleDeleteButtonClick(posts.id)}>
              삭제
            </StButton>
          </div>
        </div>
      </StDetailMain>
      {/* 메인 부분 */}
      {/* 추천 행사 구간 */}

      {/* 코멘트 섹션입니다 */}
      <section>
        <div>
          <StCommentForm onSubmit={handleCommentSubmit}>
            <StInput type="text" placeholder="오늘의 여행은 어떠셨나요?" value={body} onChange={onChangeBodyHandler}></StInput>
            <StButton type="onSubmit" disabled={!body}>
              추가
            </StButton>
          </StCommentForm>
        </div>
        <ul>
          {comments
            ?.filter(comment => parseInt(comment.postId) === parseInt(id))
            .map((comment, index) => (
              <StCommentLi key={index}>{comment.body}</StCommentLi>
            ))}
        </ul>
      </section>
      {/* 코멘트 섹션입니다 */}

      {/* 명소 지역 추천 입니다 . */}
      <div>
        <StRecommendTitle>명소 지역</StRecommendTitle>
        <StDetailUl>
          {list
            ?.filter(item => item.firstimage !== '')
            .slice(0, 5)
            .map((item, index) => (
              <StyledPostsyBox key={index}>
                <StImage src={item.firstimage} />
                <StTitle>{item.title}</StTitle>
                <StMpCategory>{item.addr1}</StMpCategory>
              </StyledPostsyBox>
            ))}
        </StDetailUl>
      </div>

      {/* 다른 지역 구간입니다. */}
      <div>
        <StRecommendTitle>{posts.category} 다른 지역</StRecommendTitle>
        <StDetailUl>
          {data?.data
            .filter(item => item !== posts && item.category === posts.category)
            .map((item, index) => (
              <StyledPostsyBox key={index} onClick={() => handleDetailButtonClick(item.id)}>
                <StImage src={item.image} />
                <StTitle>{item.location}</StTitle>
                <StMpCategory>{item.category}</StMpCategory>
              </StyledPostsyBox>
            ))}
        </StDetailUl>
      </div>
    </>
  );
};

export default Detail;

const StCommentForm = styled.form`
  display: flex;
  align-items: baseline;
  gap: 10px;
`;

const StDetailCategory = styled.p`
  color: black;
  font-size: 16px;
  font-weight: 800;
  margin: 10px 0px;
`;

const StDetailImage = styled.img`
  width: 190px;
  height: 206px;
  margin-bottom: 5px;
  margin-right: 20px;
`;

const StDetailMain = styled.main`
  display: flex;
  justify-content: space-between;
`;
export const StRecommendTitle = styled.p`
  margin: 10px;
  padding-left: 5px;
  font-size: 20px;
  font-weight: 800;
`;

export const StDetailUl = styled.ul`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  padding: 5px;
  margin: 5px;
  gap: 20px;
`;

export const StDetailNavigate = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
