import React from 'react';
import { StSearchText } from '../components/common/Header';
import { styled } from 'styled-components';
import useInput from '../hooks/useInput';
import { StButton } from '../components/common/Button';
import { useMutation, useQueryClient } from 'react-query';
import { addPosts } from '../api/posts';
import { useNavigate } from 'react-router-dom';

function Write() {
  const navigate = useNavigate();

  const [category, setCategory] = useInput('서울');
  const [location, setLocation] = useInput('');
  const [description, setDescription] = useInput('');
  // const [URL, setURL] = useInput('');

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
          URL <br />
          <StSearchText />
        </div>
        <StButton $fontColor={'black'}>등록</StButton>
      </form>
    </>
  );
}

export default Write;

const StyledMoodSelect = styled.select`
  padding: 10px;
  font-size: 16px;
`;
