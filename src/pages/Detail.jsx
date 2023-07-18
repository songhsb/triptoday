import React from 'react';
import useInput from '../hooks/useInput';
import { useNavigate, useParams } from 'react-router-dom';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { deletePosts, getPosts } from '../api/posts';
import { getComments, addComment } from '../api/comments';
import { StCategory, StTitle } from './Main';
import { styled } from 'styled-components';
import { StButton } from '../components/common/Button';
import { StInput } from '../components/common/InputStyle';

const Detail = () => {
  const navigate = useNavigate();
  const param = useParams();
  const id = param.id;

  const { data } = useQuery('postsData', getPosts);

  const posts = data.data.find(item => item.id == id);

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
  // 코멘트 관련 입니다

  return (
    <>
      <StTitle>{posts.location}</StTitle>
      <div>
        <StDetailCategory>지역: {posts.category}</StDetailCategory>
        <p>{posts.description}</p>
      </div>
      <StButton $fontColor={'black'}>버튼입니다</StButton>
      <div>
        <StButton $fontColor={'black'} onClick={() => handleUpdateButtonClick(posts.id)}>
          수정
        </StButton>
        <StButton $fontColor={'black'} onClick={() => handleDeleteButtonClick(posts.id)}>
          삭제
        </StButton>
      </div>

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
              <li key={index}>{comment.body}</li>
            ))}
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

const StDetailCategory = styled.p`
  color: black;
  font-size: 16px;
  font-weight: 800;
  margin: 10px 0px;
`;
