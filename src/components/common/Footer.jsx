import React from 'react';
import styled from 'styled-components';

const Footer = () => {
  return (
    <FooterContainer>
      <div>
        <div>
          <FooterLogo>
            <a href="#">
              <img src="" alt="logologo" />
            </a>
          </FooterLogo>
        </div>
        <div>
          <p>내일배움캠프 React 6</p>
          <TeamLink>
            <a href="https://github.com/songhsb">Hyunseop</a> | <a href="https://github.com/Rimsunwoo">Sunwoo</a> | <a href="https://github.com/seungbeom1999">Seungbeom</a> | <a href="https://github.com/JellyBear97">Jieun</a> |{' '}
            <a href="https://github.com/heejung-newheee">Heejung</a>
          </TeamLink>
          <p> &copy; 2023 NBC Team 4 All rights reserved</p>
        </div>

        <div>
          <FooterSpan>
            <span className="svgIcon">
              <a href="https://github.com/songhsb/triptoday">
                <img src="github.svg" alt="github" />
              </a>
            </span>
            <span className="svgIcon">
              <a href="https://teamsparta.notion.site/4-53504b2ef97846c39cfc3b0a8bf5e258">
                <img src="notion.svg" alt="notion" />
              </a>
            </span>
            <span>
              <a href="https://www.figma.com/file/IdxcptJfRnW9ugz0N6emSR/trip-today?type=design&mode=design&t=w2Fh8kdrDIfcG8Qi-0">
                <img src="figma.svg" alt="figma" />
              </a>
            </span>
          </FooterSpan>
        </div>
      </div>
    </FooterContainer>
  );
};

export default Footer;

const FooterContainer = styled.div`
  width: 100vw;
  color: white;
  background-color: #272727;
  padding: 60px 0 50px;
  > div {
    max-width: 1200px;
    margin: 0 auto;
    display: flex;
    justify-content: space-evenly;
    p {
      font-size: 0.8rem;
      color: #8f8f8f;
      font-weight: 500;
      margin: 0 0 3px;
    }
  }
`;
const FooterLogo = styled.h1`
  max-width: 150px;
  margin-bottom: 15px;
  a {
    img {
      width: 100%;
    }
  }
`;

const TeamLink = styled.div`
  margin: 15px 0 8px;
  font-size: 0.8rem;
  color: #8f8f8f;
  a {
    text-decoration: none;
    color: inherit;
    :active {
      color: #fff;
    }
  }
`;

const FooterSpan = styled.div`
  span a {
    width: 30px;
    height: 30px;
    padding: 6px;
    display: inline-flex;
    border: 1px solid white;
    border-radius: 5px;
    cursor: pointer;
    position: relative;
    line-height: 1;
    margin: 0 10px;
  }
  span a::before {
    content: '';
    width: 15px;
    height: 15px;
    padding: 8px;
    position: absolute;
    top: -1px;
    left: -1px;
    border-radius: 5px;
    background-color: #ffffff;
    transform: scale(0);
    transition: 0.3s ease-in-out;
  }
  & > span:hover a::before {
    transform: scale(1);
  }

  & > span:hover img {
    filter: brightness(0) saturate(100%) invert(0%) sepia(7%) saturate(98%) hue-rotate(346deg) brightness(95%) contrast(86%);
  }
`;
