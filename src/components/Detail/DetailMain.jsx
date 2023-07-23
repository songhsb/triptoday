import React from 'react';
import { styled } from 'styled-components';
import LikesPosts from './LikesPosts';
import { StTitle } from '../../pages/Main';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { EmailAtom } from '../../recoil/SearchAtom';
import plusBtn from '../../assets/img/plus.svg';

function DetailMain({ posts, seeMore, setSeeMore, postsMutation }) {
  const emailDisCharge = useRecoilValue(EmailAtom);
  const navigate = useNavigate();
  const handleSeeMoreButtonClick = () => {
    setSeeMore(prev => !prev);
  };

  const handleUpdateButtonClick = async id => {
    navigate(`/update/${id}`);
  };

  const handleDeleteButtonClick = async id => {
    postsMutation.mutate(id);
    navigate('/');
  };

  return (
    <StDetailMain>
      <StDetailImage>
        <img src={posts.image} />
      </StDetailImage>
      <StDetailInfo>
        <StTitle>{posts.location}</StTitle>
        <StDetailCategory>지역: {posts.category}</StDetailCategory>
        <StDetailDescription>{posts.description}</StDetailDescription>
        <LikesPosts postId={posts.id} />
        {emailDisCharge == posts.email ? (
          <StEditBtn>
            <StDetailSeeMore onClick={handleSeeMoreButtonClick}>
              <img src={plusBtn} alt="" />
            </StDetailSeeMore>
            {seeMore && (
              <StDetaiSeeMorelUl>
                <StDetailListItem onClick={() => handleUpdateButtonClick(posts.id)}>
                  <StDetailButton>수정</StDetailButton>
                </StDetailListItem>
                <StDetailListItem onClick={() => handleDeleteButtonClick(posts.id)}>
                  <StDetailButton>삭제</StDetailButton>
                </StDetailListItem>
              </StDetaiSeeMorelUl>
            )}
          </StEditBtn>
        ) : null}
      </StDetailInfo>
    </StDetailMain>
  );
}

export default DetailMain;

const StDetailMain = styled.main`
  display: flex;
`;
const StDetailImage = styled.div`
  width: 40%;
  height: 350px;
  overflow: hidden;
  margin-bottom: 20px;
  margin-right: 20px;
  img {
    width: 100%;
  }
`;
const StDetailInfo = styled.div`
  width: calc(60% - 20px);
  position: relative;
`;
const StDetailCategory = styled.p`
  color: black;
  font-size: 16px;
  font-weight: 800;
  margin: 10px 0px 0;
`;
const StDetailDescription = styled.div`
  padding: 20px 0;
`;

// button
const StEditBtn = styled.div`
  position: absolute;
  right: 0%;
  top: 0%;
`;
const StDetailSeeMore = styled.button`
  width: 25px;
  height: 25px;
  border: none;
  background-color: transparent;
  text-align: center;
  border: solid 1px #eee;
  padding: 5px;
  border-radius: 25px;
  cursor: pointer;
  img {
    width: 100%;
    filter: invert(29%) sepia(1%) saturate(0%) hue-rotate(145deg) brightness(102%) contrast(81%);
  }
`;
const StDetaiSeeMorelUl = styled.ul`
  position: absolute;
  right: 0%;
  top: 30px;
  border: solid 1px #eee;
`;

const StDetailListItem = styled.li`
  width: 80px;
  box-sizing: border-box;
`;

const StDetailButton = styled.button`
  width: 100%;
  padding: 10px;
  border: none;
  background-color: #fff;
  border-radius: 8px;
  cursor: pointer;
  text-align: center;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;

  &:hover,
  &:focus {
    background-color: #f8e4ff;
  }
`;
