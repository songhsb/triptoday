import React from 'react';
import { styled } from 'styled-components';
import { StButton, StButtonWrap } from '../components/common/Button';
import { StInput, StLabel } from '../components/common/InputStyle';
import { useNavigate } from 'react-router-dom';
import useInput from '../hooks/useInput';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';

function Login() {
  const [email, emailOnchange] = useInput('');
  const [password, passwordOnchange] = useInput('');
  const navigate = useNavigate();

  const loginHandler = async e => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      navigate('/');
      console.log('login', userCredential.user);
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log('error', errorCode, errorMessage);
    }
  };
  return (
    <>
      <div>Login</div>
      <StLoginLogo>
        <img src="" alt="logo" />
      </StLoginLogo>
      <StLoginForm onSubmit={loginHandler}>
        <StLabel>이메일</StLabel>
        <StInput type="text" value={email} onChange={emailOnchange} />
        <StLabel>비밀번호</StLabel>
        <StInput type="password" value={password} onChange={passwordOnchange} />
        <StButton type="submit" $btnSize="large">
          로그인
        </StButton>
        <StButtonWrap>
          <StButton
            type="button"
            onClick={() => {
              navigate('/join');
            }}
            $btnSize="half"
          >
            회원가입
          </StButton>
          <StButton
            type="button"
            onClick={() => {
              navigate('/');
            }}
            $btnSize="half"
          >
            홈으로 돌아가기
          </StButton>
        </StButtonWrap>
      </StLoginForm>
    </>
  );
}

export default Login;
const StLoginLogo = styled.div`
  width: 300px;
  margin: 0 auto;
  img {
    width: 100%;
  }
`;
const StLoginForm = styled.form`
  max-width: 500px;
  margin: 0 auto;
`;
