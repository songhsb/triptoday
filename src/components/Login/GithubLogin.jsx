import React from 'react';
import { auth } from '../../firebase';
import { signInWithPopup, GithubAuthProvider } from 'firebase/auth';
import gitIcon from '../../assets/img/github.svg';
import { StSnsIcon } from './GoogleLogin';

const GithubLogin = () => {
  const githubProvider = new GithubAuthProvider();
  const signInWithGithub = async () => {
    return await signInWithPopup(auth, githubProvider);
  };
  const githubLoginHandler = e => {
    e.preventDefault();
    signInWithGithub()
      .then(result => {
        const credential = githubProvider.credentialFromResult(result);
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
    <StSnsIcon onClick={githubLoginHandler}>
      <img src={gitIcon} alt="" />
    </StSnsIcon>
  );
};

export default GithubLogin;
