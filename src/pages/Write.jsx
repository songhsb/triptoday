import React, { useEffect, useState } from 'react';
import { styled } from 'styled-components';
import useInput from '../hooks/useInput';
import { useMutation, useQueryClient } from 'react-query';
import { addPosts } from '../api/posts';
import { useNavigate } from 'react-router-dom';
import LoadingSpinner from '../components/common/LoadingSpinner';
import Layout from '../components/common/Layout';
import { useRecoilValue } from 'recoil';
import { EmailAtom } from '../recoil/SearchAtom';
import WriteForm from '../components/Write/WriteForm';
import { useDispatch } from 'react-redux';
import { openAlarm } from '../redux/modules/confirm';
import useAlert from '../hooks/useAlert';

function Write() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [category, setCategory] = useInput('서울');
  const [location, setLocation] = useInput('');
  const [description, setDescription] = useInput('');
  const [image, setImage] = useInput('');
  const [markerInfo, setMarkerInfo] = useState(null);
  console.log(markerInfo);
  const queryClient = useQueryClient();
  const { customAlert } = useAlert();

  const postsMutation = useMutation(addPosts, {
    onSuccess: () => {
      queryClient.invalidateQueries('postsData');
    },
  });
  const emailDischarge = useRecoilValue(EmailAtom);

  useEffect(() => {
    console.log(emailDischarge);
  }, []);

  // 커스텀 알림창 하려고 비동기함수 처리합니다.
  const handleWriteButtonClick = async e => {
    e.preventDefault();
    if (!markerInfo) {
      customAlert('지도에 핀을 찍어주세요!');
      // alert('지도에 핀을 찍어주세요!');
      return false;
    }
    if (!location || !description) {
      customAlert('필수 입력값이 없습니다. 확인해주세요');
      // alert('필수 입력값이 없습니다. 확인해주세요');
      return false;
    }
    postsMutation.mutate({
      email: emailDischarge,
      category,
      location,
      description,
      image,
      latLng: { latitude: markerInfo.position.getLat(), longitude: markerInfo.position.getLng() },
      address: markerInfo.address,
    });
    navigate('/');
  };

  return (
    <>
      <LoadingSpinner />
      <Layout>
        <WriteForm
          handleWriteButtonClick={handleWriteButtonClick}
          setCategory={setCategory}
          location={location}
          setLocation={setLocation}
          description={description}
          setDescription={setDescription}
          image={image}
          setImage={setImage}
          markerInfo={markerInfo}
          setMarkerInfo={setMarkerInfo}
        />
      </Layout>
    </>
  );
}

export default Write;
