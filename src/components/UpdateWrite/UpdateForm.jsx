import React from 'react';
import MapForWrite from '../Map/MapForWrite';
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
      <MapForWrite markerInfo={markerInfo} setMarkerInfo={setMarkerInfo} posts={posts} />
      <StButton $fontColor={'black'}>수정</StButton>
      <StButton type="button" onClick={handleCancelButtonClick} $fontColor={'black'}>
        취소{' '}
      </StButton>
    </form>
  );
}

export default UpdateForm;
