import React from 'react';
import { StDetailUl, StRecommendTitle } from '../../pages/Detail';
import { StImage, StMpCategory, StTitle, StyledPostsyBox } from '../../pages/Main';

function DetailRecommendArea({ list }) {
  return (
    <div>
      <StRecommendTitle>명소 지역</StRecommendTitle>
      <StDetailUl>
        {list
          ?.filter(item => item.firstimage !== '')
          .slice(0, 5)
          .map((item, index) => (
            <StyledPostsyBox key={index}>
              <StImage src={item.firstimage} />
              <StTitle>{item.title}</StTitle>
              <StMpCategory>{item.addr1}</StMpCategory>
            </StyledPostsyBox>
          ))}
      </StDetailUl>
    </div>
  );
}

export default DetailRecommendArea;
