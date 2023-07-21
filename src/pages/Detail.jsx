import React, { useEffect, useState } from 'react';
import useInput from '../hooks/useInput';
import { Route, Routes, useNavigate, useParams } from 'react-router-dom';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { auth, db } from '../firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { collection, getDocs, query } from 'firebase/firestore';
import { nanoid } from 'nanoid';
import { deletePosts, getPosts } from '../api/posts';
import { getComments, addComments, deleteComments } from '../api/comments';
import { StCategory, StImage, StMpCategory, StTitle, StyledPostsyBox } from './Main';
import { styled } from 'styled-components';
import { StButton } from '../components/common/Button';
import { StInput } from '../components/common/InputStyle';
import { touristAttraction } from '../api/touristAttraction';
import axios from 'axios';
import LoadingSpinner from '../components/common/LoadingSpinner';
import Layout from '../components/common/Layout';
import ReadMapInPost from '../components/Map/ReadMapInPost';
import FormDialog from '../components/comment/UpdateComment';
import LikesPosts from '../components/Detail/LikesPosts';

const Detail = () => {
  const navigate = useNavigate();
  const param = useParams();
  const id = param.id;
  const [list, setList] = useState([]);
  const [seeMore, setSeeMore] = useState(false);

  const { isLoading, isError, data } = useQuery('postsData', getPosts);

  const queryClient = useQueryClient();

  const postsMutation = useMutation(deletePosts, {
    onSuccess: () => {
      queryClient.invalidateQueries('postsData');
    },
  });
  // 더보기 관련 구간입니다.

  const handleSeeMoreButtonClick = () => {
    setSeeMore(prev => !prev);
  };

  const handleUpdateButtonClick = async id => {
    navigate(`/update/${id}`);
  };

  const handleDeleteButtonClick = async id => {
    postsMutation.mutate(id);
    navigate('/');
  };

  // 코멘트 관련 입니다
  const [userEmail, setUserEmail] = useState('');
  const [allUsers, setAllUsers] = useState([]);

  useEffect(() => {
    onAuthStateChanged(auth, user => {
      setUserEmail(user?.email);
    });
  }, []);
  useEffect(() => {
    const fetchData = async () => {
      const q = query(collection(db, 'users'));
      const querySnapshot = await getDocs(q);

      const initialTodos = [];

      querySnapshot.forEach(doc => {
        initialTodos.push({ id: doc.id, ...doc.data() });
      });

      setAllUsers(initialTodos);
    };
    fetchData();
  }, []);

  const user = auth.currentUser;
  const thisUser = allUsers?.find(item => item.email === userEmail);

  console.log(user);

  const { data: comments } = useQuery(['comments'], getComments);
  const commentsMutation = useMutation(addComments, {
    onSuccess: () => {
      queryClient.invalidateQueries(['comments']);
    },
  });
  const deleteMutation = useMutation(deleteComments, {
    onSuccess: () => {
      queryClient.invalidateQueries('comments');
    },
  });
  const [body, onChangeBodyHandler, setter] = useInput();
  const handleCommentSubmit = e => {
    if (e) {
      e.preventDefault();
      commentsMutation.mutate({
        id: nanoid(),
        ...(thisUser?.nickName && { nickName: thisUser.nickName }),
        ...(user?.displayName && { nickName: user.displayName }),
        ...(thisUser?.profileImg && { profileImg: thisUser.profileImg }),
        ...(user?.photoURL && { profileImg: user.photoURL }),
        ...(thisUser?.email && { email: thisUser.email }),
        body,
        uid: user.uid,
        postId: id,
      });
      setter('');
    }
  };
  const handleCommentDelete = async id => {
    deleteMutation.mutate(id);
  };
  // 코멘드 관련 입니다

  useEffect(() => {
    if (!isLoading && !isError) {
      locationData();
    }
  }, [isLoading, isError]);

  if (isLoading) {
    return <div>로딩중 입니다.</div>;
  }

  const posts = data.data.find(item => item.id == id);
  console.log(posts);
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
    <Layout>
      {/* 메인 부분 */}
      <LoadingSpinner />
      <StDetailMain>
        <div>
          <StDetailImage src={posts.image} />
        </div>
        <div>
          <LikesPosts postId={posts.id} />
          <StTitleDetail>
            <StTitle>{posts.location}</StTitle>
            <div>
              <StDetailSeeMore onClick={handleSeeMoreButtonClick} />
              {seeMore && (
                <StDetaiSeeMorelUl>
                  <StDetailListItem onClick={() => handleUpdateButtonClick(posts.id)}>
                    <StDetailButton>수정</StDetailButton>
                  </StDetailListItem>
                  <StDetailListItem onClick={() => handleDeleteButtonClick(posts.id)}>
                    <StDetailButton>삭제</StDetailButton>
                  </StDetailListItem>
                </StDetaiSeeMorelUl>
              )}
            </div>
          </StTitleDetail>
          <div>
            <StDetailCategory>지역: {posts.category}</StDetailCategory>
            <p>{posts.description}</p>
          </div>
        </div>
      </StDetailMain>
      {/* 메인 부분 */}
      {/* 추천 행사 구간 */}
      <ReadMapInPost posts={posts} />
      <h1>gg</h1>
      {/* 코멘트 섹션입니다 */}
      <section>
        {/* <div>
          <StCommentForm onSubmit={handleCommentSubmit}>
            <StInput type="text" placeholder="오늘의 여행은 어떠셨나요?" value={body} onChange={onChangeBodyHandler}></StInput>
            <StButton type="onSubmit" disabled={!body}>
              추가
            </StButton>
          </StCommentForm>
        </div> */}
        {user && (
          <div>
            <StCommentForm onSubmit={handleCommentSubmit}>
              <StInput type="text" placeholder="오늘의 여행은 어떠셨나요?" value={body} onChange={onChangeBodyHandler}></StInput>
              <StButton type="onSubmit" disabled={!body}>
                추가
              </StButton>
            </StCommentForm>
          </div>
        )}
        <StCommentsContainer>
          {comments
            ?.filter(comment => parseInt(comment.postId) === parseInt(id))
            .map((comment, index) => (
              <StComment key={index}>
                <StUserInfo>
                  <StImageContainer>
                    <StProfileImage src={comment.profileImg} alt="프로필 이미지" />
                  </StImageContainer>
                  <StCommentRightPart>
                    <p>{comment.nickName}</p>
                    <p>{comment.email}</p>
                  </StCommentRightPart>
                </StUserInfo>
                <p>{comment.body}</p>
                {(user?.uid === comment.uid || thisUser?.isAdmin) && (
                  <StCommentBtnDiv>
                    {!thisUser?.isAdmin && <FormDialog comment={comment} />}
                    <StButton $btnSize={'small'} onClick={() => handleCommentDelete(comment.id)}>
                      삭제
                    </StButton>
                  </StCommentBtnDiv>
                )}
              </StComment>
            ))}
        </StCommentsContainer>
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
    </Layout>
  );
};

export default Detail;

const StCommentForm = styled.form`
  display: flex;
  align-items: baseline;
  gap: 10px;
`;

const StDetailMain = styled.main`
  display: flex;
  justify-content: space-between;
`;

const StComment = styled.li`
  padding: 10px;
  border-bottom: solid 3px #9adcff;
`;

const StUserInfo = styled.div`
  display: flex;
  gap: 8px;
`;

const StImageContainer = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  overflow: hidden;
`;

const StProfileImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const StCommentRightPart = styled.div`
  width: 100%;
`;

const StCommentsContainer = styled.ol`
  margin-top: 40px;
`;

const StCommentBtnDiv = styled.div`
  display: flex;
  flex-direction: row-reverse;
  gap: 5px;
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

const StTitleDetail = styled.div`
  display: flex;
  justify-content: space-between;
`;

const StDetaiSeeMorelUl = styled.ul`
  position: fixed;
`;

const StDetailListItem = styled.li`
  height: 40px;
  padding: 5px 8px;
  box-sizing: border-box;
`;

const StDetailButton = styled.button`
  width: 100%;
  padding: 7px 10px;
  border: none;
  background-color: #fff;
  border-radius: 8px;
  cursor: pointer;
  text-align: left;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;

  &:hover,
  &:focus {
    background-color: #f8e4ff;
  }
`;

const StDetailSeeMore = styled.button`
  width: 20px;
  height: 20px;
  border: none;
  background-image: url(https://t1.daumcdn.net/tistory_admin/static/mobile/tt_img_area_reply.svg);
  overflow: hidden;
  font-size: 0;
  line-height: 0;
  color: transparent;
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
