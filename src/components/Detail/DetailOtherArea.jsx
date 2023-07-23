import React from 'react';
import { StDetailUl, StRecommendTitle } from '../../pages/Detail';
import { StImage, StMpCategory, StTitle, StyledPostsyBox } from '../../pages/Main';
import { useNavigate } from 'react-router-dom';

function DetailOtherArea({ posts, data }) {
  const navigate = useNavigate();
  const handleDetailButtonClick = id => {
    window.location.href = `${process.env.REACT_APP_DETAIL_URL}/${id}`;
  };
  return (
    <div>
      <StRecommendTitle>{posts.category} 다른 지역</StRecommendTitle>
      <StDetailUl>
        {data?.data
          .filter(item => item !== posts && item.category === posts.category)
          .map((item, index) => (
            <StyledPostsyBox key={index} onClick={() => handleDetailButtonClick(item.id)}>
              <StImage src={item.image} />
              <StTitle>{item.location}</StTitle>
              <StMpCategory>{item.category}</StMpCategory>
            </StyledPostsyBox>
          ))}
      </StDetailUl>
    </div>
  );
}

export default DetailOtherArea;
