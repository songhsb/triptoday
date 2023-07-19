import React from 'react';
import { styled } from 'styled-components';

const commentStyle = props => {
  return (
    <StCommentLi>
      <p>{props.children}</p>
    </StCommentLi>
  );
};

export default commentStyle;

const StCommentLi = styled.li`
  height: 50px;
  margin-bottom: 30px;
  background-color: gray;
`;

export { StCommentLi };
