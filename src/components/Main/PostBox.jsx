import React from 'react';
import { styled } from 'styled-components';
import { StImage, StMpCategory, StTitle, StyledPostsyBox } from '../../pages/Main';
import { useRecoilValue } from 'recoil';
import { SearchAtom } from '../../recoil/SearchAtom';

function PostBox({ posts, category, handleDetailButtonClick }) {
  const searchList = useRecoilValue(SearchAtom);
  return (
    <StUl>
      {searchList.length > 0
        ? searchList.map((item, index) => (
            <StyledPostsyBox key={index} onClick={() => handleDetailButtonClick(item.id)}>
              <div>
                <StImage src={item.image} />
                <StTitle>{item.location}</StTitle>
                <StMpCategory>{item.category}</StMpCategory>
              </div>
            </StyledPostsyBox>
          ))
        : posts.data
            ?.filter(item => !category || item.category === category)
            .map((item, index) => (
              <StyledPostsyBox key={index} onClick={() => handleDetailButtonClick(item.id)}>
                <div>
                  <StImage src={item.image} />
                  <StTitle>{item.location}</StTitle>
                  <StMpCategory>{item.category}</StMpCategory>
                </div>
              </StyledPostsyBox>
            ))}
    </StUl>
  );
}

export default PostBox;

const StUl = styled.ul`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  padding: 5px;
  margin: 5px;
  gap: 20px;
`;
