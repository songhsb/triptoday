import React from 'react';
import { styled } from 'styled-components';
import LikesPosts from './LikesPosts';
import { StTitle } from '../../pages/Main';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { EmailAtom } from '../../recoil/SearchAtom';

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
      <div>
        <StDetailImage src={posts.image} />
      </div>
      <div>
        <LikesPosts postId={posts.id} />
        <StTitleDetail>
          <StTitle>{posts.location}</StTitle>
          {emailDisCharge == posts.email ? (
            <div>
              <StDetailSeeMore onClick={handleSeeMoreButtonClick} />
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
            </div>
          ) : null}
        </StTitleDetail>
        <div>
          <StDetailCategory>지역: {posts.category}</StDetailCategory>
          <p>{posts.description}</p>
        </div>
      </div>
    </StDetailMain>
  );
}

export default DetailMain;

const StDetailMain = styled.main`
  display: flex;
  justify-content: space-between;
`;

const StDetailImage = styled.img`
  width: 190px;
  height: 206px;
  margin-bottom: 5px;
  margin-right: 20px;
`;

const StTitleDetail = styled.div`
  display: flex;
  justify-content: space-between;
`;

const StDetailSeeMore = styled.button`
  width: 20px;
  height: 20px;
  border: none;
  background-image: url(https://t1.daumcdn.net/tistory_admin/static/mobile/tt_img_area_reply.svg);
  overflow: hidden;
  font-size: 0;
  line-height: 0;
  color: transparent;
`;
const StDetaiSeeMorelUl = styled.ul`
  position: fixed;
`;

const StDetailListItem = styled.li`
  height: 40px;
  padding: 5px 8px;
  box-sizing: border-box;
`;

const StDetailButton = styled.button`
  width: 100%;
  padding: 7px 10px;
  border: none;
  background-color: #fff;
  border-radius: 8px;
  cursor: pointer;
  text-align: left;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;

  &:hover,
  &:focus {
    background-color: #f8e4ff;
  }
`;

const StDetailCategory = styled.p`
  color: black;
  font-size: 16px;
  font-weight: 800;
  margin: 10px 0px;
`;
