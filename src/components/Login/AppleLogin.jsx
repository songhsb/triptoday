import React from 'react';
import { auth } from '../../firebase';
import { signInWithPopup, OAuthProvider } from 'firebase/auth';
import { StButton } from '../common/Button';

const AppleLogin = () => {
  const appleProvider = new OAuthProvider('apple.com');
  const signInWithApple = () => {
    return signInWithPopup(auth, appleProvider);
  };
  const handleLogin = e => {
    e.preventDefault();
    signInWithApple()
      .then(result => {
        const credential = appleProvider.credentialFromResult(result);
        const token = credential.accessToken;
        const userName = result.user;
        console.log(token);
        console.log(userName);

        // local storage에 token, username 저장해주기
        // setToken(token);
        // setUserName(userName);
      })
      .catch(error => {
        console.error(error);
      });
  };
  return <StButton onClick={handleLogin}>애플 로그인</StButton>;
};

export default AppleLogin;
