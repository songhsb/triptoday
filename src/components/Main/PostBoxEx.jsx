import React, { useRef, useCallback, useState, useEffect } from 'react';
import { styled } from 'styled-components';
import { StImage, StMpCategory, StTitle, StyledPostsyBox } from '../../pages/Main';
import { useRecoilValue } from 'recoil';
import { SearchAtom } from '../../recoil/SearchAtom';

function PostBoxEx({ posts, category, handleDetailButtonClick }) {
  const searchList = useRecoilValue(SearchAtom);
  //   const [pageNumber, setPageNumber] = useState(1);
  //   const observer = useRef();

  //   const lastPostRef = useCallback(node => {
  //     // if (loading) return;
  //     if (observer.current) observer.current.disconnect();
  //     observer.current = new IntersectionObserver(entries => {
  //       if (entries[0].isIntersecting) {
  //         setPageNumber(prevPageNumber => prevPageNumber + 1);
  //       }
  //     });
  //     if (node) observer.current.observe(node);
  //   });

  const divRef = useRef();
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 10;
  const offset = (currentPage - 1) * limit;
  const option = { root: null, rootMargin: '0px', threshold: 0.5 };
  const defaultOption = {
    root: null,
    threshold: 0.5,
    rootMargin: '0px',
  };

  const observer = new IntersectionObserver(
    entries => {
      if (entries[0].isIntersecting) {
        setTimeout(() => {
          setCurrentPage(prevPage => prevPage + 1);
        }, 500);
      }
    },
    {
      ...defaultOption,
      ...option,
    },
  );

  useEffect(() => {
    observer.observe(divRef.current);
  }, []);
  return (
    <StUl>
      {searchList.length > 0
        ? searchList
            .map((item, index) => (
              <StyledPostsyBox key={index} onClick={() => handleDetailButtonClick(item.id)}>
                <div>
                  <StImage src={item.image} />
                  <StTitle>{item.location}</StTitle>
                  <StMpCategory>{item.category}</StMpCategory>
                </div>
              </StyledPostsyBox>
            ))
            .slice(0, offset + 10)
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
            ))
            .slice(0, offset + 10)}
      <div ref={divRef}></div>
    </StUl>
  );
}

export default PostBoxEx;

const StUl = styled.ul`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  padding: 5px 0;
  margin: 20px 0;
  gap: 20px;
`;
