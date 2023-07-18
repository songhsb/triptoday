import React from 'react';
import { styled } from 'styled-components';

const Button = ({ children }) => {
  return <StButton>{children}</StButton>;
};

export default Button;

const StButtonWrap = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-bottom: 10px;
`;

const StButton = styled.button`
  position: relative;
  overflow: hidden;
  display: inline-block;
  cursor: pointer;
  align-items: center;
  background-color: ${props => props.$bgColor || 'transparent'};
  border: ${props => props.$stBorder || 'solid 3px #9ADCFF'};
  color: ${props => props.$fontColor || '#black'};
  border-radius: 8px;
  padding: 1px 0;
  margin-top: 10px;
  margin-bottom: 10px;

  ${({ $btnSize }) => {
    let btnHeight;
    let btnWidth;
    switch ($btnSize) {
      case 'large':
        btnWidth = '230px';
        btnHeight = '50px';
        break;

      case 'small':
        btnWidth = '100px';
        btnHeight = '40px';
        break;

      default:
        btnWidth = '130px';
        btnHeight = '45px';
        break;
    }
    return `width : ${btnWidth};
            height : ${btnHeight}`;
  }};
  &::before {
    content: '';

    width: 100%;
    height: 0;
    position: absolute;
    border-bottom-left-radius: 50%;
    border-bottom-right-radius: 50%;
    z-index: -1;
    background-color: #9adcff;
    left: 0;
    top: 0;
    transition: 0.4s ease-in-out;
  }
  &:hover {
    color: #fff;
    z-index: 1;
  }

  &:hover::before {
    content: '';
    color: white;
    position: absolute;
    height: 200%;
  }
  &:active {
    background-color: ${props => props.$acColor || props.$bgColor};
  }
  &:not(:last-of-type) {
    margin-right: 10px;
  }
  &:disabled {
    background-color: #cdedff;
    border: 0;
    color: #fff;
    cursor: default;
    &:hover::before {
      width: 0%;
      height: 0;
    }
  }
`;

export { StButtonWrap, StButton };
