import React from 'react';
import { StSearchText } from '../components/common/Header';
import { styled } from 'styled-components';
import useInput from '../hooks/useInput';
import { StButton } from '../components/common/Button';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { addPosts, getPosts } from '../api/posts';
import { useNavigate, useParams } from 'react-router-dom';

function UpdateWrite() {
  const navigate = useNavigate();
  const param = useParams();
  const id = param.id;

  const { data } = useQuery('postsData', getPosts);

  const posts = data.data.find(item => item.id == id);

  const [category, setCategory] = useInput(posts.category);
  const [location, setLocation] = useInput(posts.location);
  const [description, setDescription] = useInput(posts.description);
  const [image, setImage] = useInput(posts.image);

  const queryClient = useQueryClient();

  const postsMutation = useMutation(addPosts, {
    onSuccess: () => {
      queryClient.invalidateQueries('postsData');
    },
  });

  const handleWriteButtonClick = e => {
    e.preventDefault();
    if (!location || !description) {
      alert('필수 입력값이 없습니다. 확인해주세요');
      return false;
    }
    postsMutation.mutate({
      category,
      location,
      description,
      image,
    });
    navigate('/');
  };

  return (
    <>
      <form onSubmit={handleWriteButtonClick}>
        지역:
        <StyledMoodSelect onChange={setCategory}>
          <option value="서울">서울</option>
          <option value="경기도">경기도</option>
          <option value="강원도">강원도</option>
          <option value="충청북도">충청북도</option>
          <option value="충청남도">충청남도</option>
          <option value="경상북도">경상북도</option>
          <option value="대구">대구</option>
          <option value="경상남도">경상남도</option>
          <option value="전라북도">전라북도</option>
          <option value="전라남도">전라남도</option>
          <option value="부산">부산</option>
          <option value="제주도">제주도</option>
        </StyledMoodSelect>
        <div>
          location <br />
          <StSearchText value={location} onChange={setLocation} />
        </div>
        <div>
          description <br />
          <StSearchText value={description} onChange={setDescription} />
        </div>
        <div>
          Image <br />
          <StSearchText value={image} onChange={setImage} />
        </div>
        <StButton $fontColor={'black'}>등록</StButton>
      </form>
    </>
  );
}

export default UpdateWrite;

const StyledMoodSelect = styled.select`
  padding: 10px;
  font-size: 16px;
`;
