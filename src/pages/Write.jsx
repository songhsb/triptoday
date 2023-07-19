import React, { useState } from 'react';
import { StSearchText } from '../components/common/Header';
import { styled } from 'styled-components';
import useInput from '../hooks/useInput';
import { StButton } from '../components/common/Button';
import { useMutation, useQueryClient } from 'react-query';
import { addPosts } from '../api/posts';
import { useNavigate } from 'react-router-dom';
import MapForWrite from '../components/Map/MapForWrite';

function Write() {
  const navigate = useNavigate();

  const [category, setCategory] = useInput('서울');
  const [location, setLocation] = useInput('');
  const [description, setDescription] = useInput('');
  const [image, setImage] = useInput('');
  const [markerInfo, setMarkerInfo] = useState(null);

  const queryClient = useQueryClient();

  const postsMutation = useMutation(addPosts, {
    onSuccess: () => {
      queryClient.invalidateQueries('postsData');
    },
  });
  console.log('markerInfo', markerInfo);
  const handleWriteButtonClick = e => {
    e.preventDefault();
    if (!markerInfo) {
      alert('지도에 핀을 찍어주세요!');
      return false;
    }
    if (!location || !description) {
      alert('필수 입력값이 없습니다. 확인해주세요');
      return false;
    }
    postsMutation.mutate({
      latLng: { latitude: markerInfo.position.getLat(), longitude: markerInfo.position.getLng() },
      address: markerInfo.address,
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
          <option value="대구">대구</option>
          <option value="부산">부산</option>
          <option value="경기도">경기도</option>
          <option value="강원도">강원도</option>
          <option value="충청도">충청도</option>
          <option value="경상도">경상도</option>
          <option value="전라도">전라도</option>
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
        <MapForWrite markerInfo={markerInfo} setMarkerInfo={setMarkerInfo} />
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
