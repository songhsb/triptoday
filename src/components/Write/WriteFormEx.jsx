import React, { useEffect, useRef, useState } from 'react';
import MapForWrite from '../Map/MapForWrite';
import { StButton } from '../common/Button';
import Select from '../Main/Select';
import { styled } from 'styled-components';
import useInput from '../../hooks/useInput';
import { useMutation, useQueryClient } from 'react-query';
import { addPosts } from '../../api/posts';
import { useRecoilValue } from 'recoil';
import { EmailAtom } from '../../recoil/SearchAtom';
import { useNavigate } from 'react-router-dom';

function WriteFormEx() {
  const navigate = useNavigate();
  const [imageList, setImageList] = useState([]);
  const [titleInput, setTitle] = useState('');
  const [contentInput, setContentInput] = useState('');
  const [category, setCategory] = useInput('서울');
  const [location, setLocation] = useInput('');
  const [description, setDescription] = useInput('');
  const [image, setImage] = useInput('');
  const [markerInfo, setMarkerInfo] = useState(null);
  const [selectedFile, setSelectedFile] = useState(new FormData());
  const [imgUrl, setImgUrl] = useState('');
  const testRef = useRef();

  const queryClient = useQueryClient();

  const postsMutation = useMutation(addPosts, {
    onSuccess: () => {
      queryClient.invalidateQueries('postsData');
    },
  });
  const emailDischarge = useRecoilValue(EmailAtom);

  useEffect(() => {
    // console.log(emailDischarge);
  }, []);

  const Flieonload = e => {
    setSelectedFile(e.target.files[0]);
    saveImgFile();
  };

  const handleWriteButtonClick = e => {
    e.preventDefault();
    const formData = new FormData();
    console.log(selectedFile);

    const newPost = {
      email: emailDischarge,
      category,
      location,
      description,
      image,
    };
    formData.append('requestDto', new Blob([JSON.stringify(newPost)], { type: 'application/json' }));
    formData.append('image', selectedFile);
    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiLsnKDsoIAwMSIsImV4cCI6MTcwOTEyNjgzNSwiaWF0IjoxNjc3NTkwODM1fQ.RPQh9r_NKQfSu4sZT0q8Q1qgObuAjqYAKW5v3flFO7A`,
      },
    };
    if (!markerInfo) {
      alert('지도에 핀을 찍어주세요!');
      return false;
    }
    if (!location || !description) {
      alert('필수 입력값이 없습니다. 확인해주세요');
      return false;
    }
    postsMutation.mutate({
      ...newPost,
      latLng: { latitude: markerInfo.position.getLat(), longitude: markerInfo.position.getLng() },
      address: markerInfo.address,
    });

    navigate('/');
  };

  // 이미지 업로드 input의 onChange
  const saveImgFile = () => {
    const file = testRef.current.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setImgUrl(reader.result);
    };
  };
  return (
    <form onSubmit={handleWriteButtonClick} encType="multipart/form-data">
      지역:
      <Select setCategory={setCategory} />
      <div>
        location <br />
        <StRequiredFieldsText value={location} onChange={setLocation} />
      </div>
      <div>
        description <br />
        <StRequiredFieldsText value={description} onChange={setDescription} />
      </div>
      <div>
        Image <br />
        <StRequiredFieldsText type="file" accept="image/*" value={image} onChange={Flieonload} ref={testRef} />
      </div>
      <MapForWrite markerInfo={markerInfo} setMarkerInfo={setMarkerInfo} />
      <StButton>등록</StButton>
    </form>
  );
}

export default WriteFormEx;

export const StyledMoodSelect = styled.select`
  padding: 10px;
  font-size: 16px;
`;
export const StRequiredFieldsText = styled.input`
  width: 100%;
  border: 0;
  border: solid 1px #ccc;
  border-radius: 10px;
  padding: 13px;
  margin: 12px 0;
  font-size: 18px;
`;
