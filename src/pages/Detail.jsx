import React from 'react';
import BasicButtons from '../components/common/BasicButtons';
import { StButton } from '../components/common/Button';
import { useParams } from 'react-router-dom';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { deletePosts, getPosts } from '../api/posts';
import { StCategory, StTitle } from './Main';
import { styled } from 'styled-components';

const Detail = () => {
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
  const handleDeleteButtonClick = async id => {
    postsMutation.mutate(id);
  };
  return (
    <>
      <StTitle>{posts.location}</StTitle>
      <div>
        <StDetailCategory>{posts.category}</StDetailCategory>
        <p>{posts.description}</p>
      </div>
      <StButton $fontColor={'black'}>버튼입니다</StButton>
      <div>
        <StButton $fontColor={'black'}>수정</StButton>
        <StButton $fontColor={'black'} onClick={() => handleDeleteButtonClick(posts.id)}>
          삭제
        </StButton>
      </div>
    </>
  );
};

export default Detail;

const StDetailCategory = styled.p`
  color: black;
  font-size: 20px;
  font-weight: 800;
  margin: 10px 0px;
`;
