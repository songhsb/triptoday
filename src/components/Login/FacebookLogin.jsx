import React from 'react';
import { auth } from '../../firebase';
import { signInWithPopup, FacebookAuthProvider } from 'firebase/auth';
import facebookIcon from '../../assets/img/facebook.svg';
import { StSnsIcon } from './GoogleLogin';

const FacebookLogin = () => {
  const faceBookProvider = new FacebookAuthProvider();
  const signInWithFacebook = async () => {
    return await signInWithPopup(auth, faceBookProvider);
  };
  const facebookLoginHandler = e => {
    e.preventDefault();
    signInWithFacebook()
      .then(result => {
        const credential = faceBookProvider.credentialFromResult(result);
        // const token = cred;
        const token = credential.accessToken;
        const user = credential.user;
        console.log('github Login-info :', token, user);
      })
      .catch(error => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log('error', errorCode, errorMessage);
        // const email = error.customData.email;
        // const credential = githubProvider.credentialFromError(error);
      });
  };
  return (
    <StSnsIcon onClick={facebookLoginHandler}>
      <img src={facebookIcon} alt="" />
    </StSnsIcon>
  );
};

export default FacebookLogin;
