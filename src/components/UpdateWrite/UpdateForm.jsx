import React from 'react';
import MapForUpdate from '../Map/MapForUpdate';
import { StButton } from '../common/Button';
import { useNavigate } from 'react-router-dom';
import { StRequiredFieldsText } from '../Write/WriteForm';
import Select from '../Main/Select';

function UpdateForm({ handleWriteButtonClick, setCategory, updatelocation, setUpdateLocation, updatedescription, setUpdateDescription, updateimage, setUpdateImage, markerInfo, setMarkerInfo, posts, id }) {
  const navigate = useNavigate();
  const handleCancelButtonClick = () => {
    navigate(`/detail/${id}`);
  };
  return (
    <form onSubmit={handleWriteButtonClick}>
      지역:
      <Select setCategory={setCategory} />
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
      <StButton>수정</StButton>
      <StButton type="button" onClick={handleCancelButtonClick}>
        취소
      </StButton>
    </form>
  );
}

export default UpdateForm;
