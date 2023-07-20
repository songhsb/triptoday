import React from 'react';
import { styled } from 'styled-components';

const commentStyle = ({ comment }) => {
  return (
    <StComment key={comment.id} className="comment">
      <StImageContainer>
        <StImage src={comment.profileImg} alt="프로필 이미지" />
      </StImageContainer>
      <StCommentRightPart>
        <StCommentContent>
          <StCommentAuthor>{comment.nickName}</StCommentAuthor>
        </StCommentContent>
        <StCommentText>{comment.body}</StCommentText>
        {/* {!isEditing && <StCommentText>{comment.body}</StCommentText>}
        {isEditing && <input></input>} */}
        {/* <StCommentActions>
          {canEdit && <StCommentAction onClick={() => setActiveComment({ id: comment.id, type: 'editing' })}>Edit</StCommentAction>}
          {canDelete && <StCommentAction onClick={() => deleteComment(comment.id)}>Delete</StCommentAction>}
        </StCommentActions> */}
      </StCommentRightPart>
    </StComment>
  );
};

export default commentStyle;

const StComment = styled.li`
  display: flex;
  margin-bottom: 28px;
`;

const StImageContainer = styled.div`
  margin-right: 12px;
`;

const StImage = styled.img`
  border-radius: 50px;
`;

const StCommentRightPart = styled.div`
  width: 100%;
`;

const StCommentContent = styled.div`
  display: flex;
`;

const StCommentAuthor = styled.div`
  margin-right: 8px;
  font-size: 20px;
  color: rgb(59, 130, 246);
`;

const StCommentText = styled.div`
  font-size: 18px;
`;

const StCommentActions = styled.div`
  display: flex;
  font-size: 12px;
  color: rgb(51, 51, 51);
  cursor: pointer;
  margin-top: 8px;
`;

const StCommentAction = styled.div`
  margin-right: 8px;
  &:hover {
    text-decoration: underline;
  }
`;
