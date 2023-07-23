import React from 'react';
import MapForWrite from '../Map/MapForWrite';
import { StButton } from '../common/Button';
import Select from '../Main/Select';
import { styled } from 'styled-components';

function WriteForm({ handleWriteButtonClick, setCategory, location, setLocation, description, setDescription, image, setImage, markerInfo, setMarkerInfo }) {
  return (
    <form onSubmit={handleWriteButtonClick}>
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
        <StRequiredFieldsText value={image} onChange={setImage} />
      </div>
      <MapForWrite markerInfo={markerInfo} setMarkerInfo={setMarkerInfo} />
      <StButton>등록</StButton>
    </form>
  );
}

export default WriteForm;

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
