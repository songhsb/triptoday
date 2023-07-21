import React, { useEffect, useState } from 'react';
import { StSearchText } from '../components/common/Header';
import { styled } from 'styled-components';
import useInput from '../hooks/useInput';
import { StButton } from '../components/common/Button';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { getPosts, updatePosts } from '../api/posts';
import { useNavigate, useParams } from 'react-router-dom';
import MapForUpdate from '../components/Map/MapForUpdate';
import { StRequiredFieldsText } from './Write';
import LoadingSpinner from '../components/common/LoadingSpinner';
import Layout from '../components/common/Layout';

function UpdateWrite() {
  const navigate = useNavigate();
  const param = useParams();
  const id = param.id;

  const { isLoading, isError, data } = useQuery('postsData', getPosts);

  const [updatecategory, setCategory, setUpdateCategory] = useInput(null);
  const [updatelocation, setUpdateLocation, setLocation] = useInput(null);
  const [updatedescription, setUpdateDescription, setDescription] = useInput(null);
  const [updateimage, setUpdateImage, setImage] = useInput(null);
  const [markerInfo, setMarkerInfo] = useState(null);

  const queryClient = useQueryClient();

  const postsMutation = useMutation(updatePosts, {
    onSuccess: () => {
      queryClient.invalidateQueries('postsData');
    },
  });

  useEffect(() => {
    if (!data) {
      return;
    }
    const posts = data.data.find(item => item.id == id);
    setUpdateCategory(posts.category);
    setLocation(posts.location);
    setDescription(posts.description);
    setImage(posts.image);
  }, [data]);

  if (isLoading) {
    return <div>로딩중 입니다..</div>;
  }

  const posts = data.data.find(item => item.id == id);

  const handleWriteButtonClick = e => {
    e.preventDefault();
    let newPosts = {};
    if (markerInfo === null) {
      if (window.confirm('위치가 재설정되지 않았습니다. 수정전의 위치를 유지하겠습니까?')) {
        newPosts = {
          category: updatecategory,
          location: updatelocation,
          description: updatedescription,
          image: updateimage,
          id,
          latLng: posts.latLng,
          address: posts.address,
        };
      } else {
        alert('위치를 재설정 해주세요');
        return false;
      }
    } else if (!!markerInfo) {
      newPosts = {
        category: updatecategory,
        location: updatelocation,
        description: updatedescription,
        image: updateimage,
        id,
        latLng: { latitude: markerInfo.position.getLat(), longitude: markerInfo.position.getLng() },
        address: markerInfo.address,
      };
    }
    postsMutation.mutate({ id, posts, newPosts });
    navigate('/');
  };
  const handleCancelButtonClick = () => {
    navigate(`/detail/${id}`);
  };

  if (isError) {
    return <h1>에러가 발생하였습니다.</h1>;
  }

  return (
    <>
      <LoadingSpinner />

      <Layout>
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
            <StRequiredFieldsText value={updatelocation} onChange={setUpdateLocation} />
          </div>
          <div>
            description <br />
            <StRequiredFieldsText value={updatedescription} onChange={setUpdateDescription} />
          </div>
          <div>
            Image <br />
            <StRequiredFieldsText value={updateimage} onChange={setUpdateImage} />
          </div>
          <MapForUpdate markerInfo={markerInfo} setMarkerInfo={setMarkerInfo} posts={posts} />
          <StButton $fontColor={'black'}>수정</StButton>
          <StButton type="button" onClick={handleCancelButtonClick} $fontColor={'black'}>
            취소{' '}
          </StButton>
        </form>
      </Layout>
    </>
  );
}

export default UpdateWrite;

const StyledMoodSelect = styled.select`
  padding: 10px;
  font-size: 16px;
`;
