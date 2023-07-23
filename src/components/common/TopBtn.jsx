import React, { useEffect, useState } from 'react';
import { styled } from 'styled-components';
// import { topIcon } from '../../assets/img/topbtn.svg';

const TopBtn = () => {
  const [showButton, setShowButton] = useState(false);

  const scrollToTop = () => {
    window.scroll({
      top: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    const handleShowButton = () => {
      if (window.scrollY > 800) {
        setShowButton(true);
      } else {
        setShowButton(false);
      }
    };
    console.log(window.scrollY);
    window.addEventListener('scroll', handleShowButton);
    return () => {
      window.removeEventListener('scroll', handleShowButton);
    };
  }, []);
  return (
    <div>
      {showButton && (
        <div id="scrolltop">
          <StTopBtn onClick={scrollToTop} type="button">
            <img src="/topbtn.svg" alt="" />
          </StTopBtn>
        </div>
      )}
    </div>
  );
};

export default TopBtn;

const StTopBtn = styled.button`
  border: 0;
  position: fixed;
  right: 30px;
  bottom: 30px;
  cursor: pointer;
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  width: 40px;
  height: 40px;
  padding: 10px;
  border-radius: 20px;
  transition: all 0.4s;
  img {
    width: 100%;
  }
`;
