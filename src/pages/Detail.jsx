import React, { useEffect, useState } from 'react';
import useInput from '../hooks/useInput';
import { useNavigate, useParams } from 'react-router-dom';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { auth, db } from '../firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { collection, getDocs, query } from 'firebase/firestore';
import { nanoid } from 'nanoid';
import { deletePosts, getPosts } from '../api/posts';
import { getComments, addComment } from '../api/comments';
import { styled } from 'styled-components';
import { StButton } from '../components/common/Button';
import { StInput } from '../components/common/InputStyle';
import { touristAttraction } from '../api/touristAttraction';
import LoadingSpinner from '../components/common/LoadingSpinner';
import Layout from '../components/common/Layout';
import ReadMapInPost from '../components/Map/ReadMapInPost';
import DetailMain from '../components/Detail/DetailMain';
import DetailOtherArea from '../components/Detail/DetailOtherArea';
import DetailRecommendArea from '../components/Detail/DetailRecommendArea';

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
      commentsMutation.mutate({
        id: nanoid(),
        nickName: thisUser.nickName,
        profileImg: thisUser.profileImg,
        email: thisUser.email,
        isAdmin: thisUser.isAdmin,
        body,
        uid: user.uid,
        postId: id,
      });
      reset();
    }
  };
  // 새로고침 관련 입니다

  useEffect(() => {
    if (!data) {
      return;
    }
    if (!isLoading && !isError) {
      locationData();
    }
  }, [isLoading, isError]);

  if (isLoading) {
    return <LoadingSpinner />;
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

  return (
    <Layout>
      {/* 메인 부분 */}
      <LoadingSpinner />
      <DetailMain posts={posts} seeMore={seeMore} setSeeMore={setSeeMore} postsMutation={postsMutation} />
      {/* 메인 부분 */}
      {/* 추천 행사 구간 */}
      <ReadMapInPost posts={posts} />
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
        <StCommentsContainer>
          {comments
            ?.filter(comment => parseInt(comment.postId) === parseInt(id))
            .map((comment, index) => (
              <StComment key={index}>
                <StImageContainer>
                  <StProfileImage src={comment.profileImg} alt="프로필 이미지" />
                </StImageContainer>
                <StCommentRightPart>
                  <p>{comment.nickName}</p>
                  <p>{comment.email}</p>
                  <p>{comment.body}</p>
                </StCommentRightPart>
                <StButton>수정</StButton>
                <StButton>삭제</StButton>
              </StComment>
            ))}
        </StCommentsContainer>
      </section>
      {/* 코멘트 섹션입니다 */}

      {/* 명소 지역 추천 입니다 . */}
      <DetailRecommendArea list={list} />

      {/* 다른 지역 구간입니다. */}
      <DetailOtherArea posts={posts} data={data} />
    </Layout>
  );
};

export default Detail;

const StCommentForm = styled.form`
  display: flex;
  align-items: baseline;
  gap: 10px;
`;

const StComment = styled.li`
  display: flex;
  margin-bottom: 28px;
`;

const StImageContainer = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 70%;
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
