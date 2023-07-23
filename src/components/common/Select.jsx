import React from 'react';
import { styled } from 'styled-components';
import './Select.css';
const Select = props => {
  return (
    <StSelectWrap>
      <StSelectForm>
        <StDropDown>
          <StDropToggle type="button">전체</StDropToggle>
          <StDropUl className={props.select ? 'slideShow' : 'slideHide'}>
            {props.options.map(option => (
              <StDropLi>
                <StDropLiOption type="button" key={option.value} value={option.value}>
                  {option.name}
                </StDropLiOption>
              </StDropLi>
            ))}
          </StDropUl>
        </StDropDown>
      </StSelectForm>
    </StSelectWrap>
  );
};

export default Select;

const StSelectWrap = styled.div``;

const StSelectForm = styled.form`
  position: relative;
  left: 500px;
  width: 105px;
  margin-bottom: 30px;
`;

const StDropDown = styled.div`
  width: 100%;
  z-index: 1;
  margin-bottom: 8px;
  cursor: pointer;
`;
const StDropToggle = styled.button`
  cursor: pointer;
  height: 40px;
  width: 100%;
  padding: 0 16px;
  line-height: 40px;
  color: #333;
  text-align: left;
  border: 1px solid rgba(224, 226, 231, 0.75);
  border-radius: 5px;
  transition: border-color 100ms ease-in;
  &selected {
    color: #3f4150;
  }
  &:active {
    border-color: rgba(224, 226, 231, 1);
  }
`;

const StDropUl = styled.ul`
  position: absolute;
  z-index: 2;
  top: calc(100% + 2px);
  left: 0;
  width: 100%;
  max-height: 0;
  overflow: hidden;
  background-color: #fff;
  border-radius: 6px;
  transition: border-color 200ms ease-in, padding 200ms ease-in, max-height 200ms ease-in, box-shadow 200ms ease-in;
  &show {
    padding: 8px 0;
    max-height: 280px;
    border-color: rgba(224, 226, 231, 0.5);
    box-shadow: 0 4px 9px 0 rgba(63, 65, 80, 0.1);
  }
`;
const StDropLi = styled.li``;
const StDropLiOption = styled.button`
  width: 100%;
  height: 40px;
  padding: 0 16px;
  line-height: 40px;
  text-align: left;
  &:hover {
    background-color: #f8f9fa;
  }
`;
