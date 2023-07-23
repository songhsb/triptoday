import React from 'react';
import { css, styled } from 'styled-components';

const AlarmButton = ({ children }) => {
  return <StAlarmButton>{children}</StAlarmButton>;
};

export default AlarmButton;

export const StAlarmButton = styled.button`
  width: 80px;
  height: 36px;
  background-color: #fff;
  border-radius: 10px;
  &:hover {
    ${({ $buttonType }) => {
      switch ($buttonType) {
        case 'yes':
          return 'background-color: #00a0153d';
        case 'no':
          return 'background-color: #ff3f3f5f';
        case 'close':
          return 'background-color: #3fb5ff3d';
        default:
          return;
      }
    }}
  }

  border: ${({ $buttonType }) => {
    if ($buttonType === 'yes') {
      return '3px solid #00a015';
    }
    if ($buttonType === 'no') {
      return '3px solid #ff3f3f';
    }
    if ($buttonType === 'close') {
      return '3px solid #3fb5ff';
    }
  }};
  cursor: pointer;
  & :hover {
  }
`;
