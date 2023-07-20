import React from 'react';
import { auth } from '../../firebase';
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { StButton } from '../common/Button';
import googleIcon from '../../assets/img/google.svg';
import { styled } from 'styled-components';

const GoogleLogin = () => {
  const googleProvider = new GoogleAuthProvider();
  const signInWithGoogle = async () => {
    return await signInWithPopup(auth, googleProvider);
  };

  const googleLoginHendler = e => {
    e.preventDefault();
    signInWithGoogle()
      .then(result => {
        const credential = googleProvider.credentialFromResult(result);
        console.log(result);
        const token = credential.accessToken;
        const user = credential.user;
        console.log(token);
        console.log(user);

        // local storage에 token, username 저장해주기
        // setToken(token);
        // setUserName(userName);
      })
      .catch(error => {
        console.error(error);
      });
  };

  return (
    <StSnsIcon onClick={googleLoginHendler} style={{ padding: '1px' }}>
      <img src={googleIcon} alt="" />
    </StSnsIcon>
  );
};

export default GoogleLogin;
export const StSnsIcon = styled.div`
  width: 36px;
  height: 36px;
  margin: 8px 13px;
  cursor: pointer;
  img {
    width: 100%;
    filter: invert(48%) sepia(5%) saturate(16%) hue-rotate(355deg) brightness(87%) contrast(82%);
  }
`;
