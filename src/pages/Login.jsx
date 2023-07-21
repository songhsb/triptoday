import React, { useEffect, useState } from 'react';
import { styled } from 'styled-components';
import { StButton, StButtonWrap } from '../components/common/Button';
import { StInput, StLabel } from '../components/common/InputStyle';
import { useNavigate } from 'react-router-dom';
import useInput from '../hooks/useInput';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../firebase';
import logoImg from '../assets/img/logo-footer.svg';
import { collection, getDocs, query } from 'firebase/firestore';
import GoogleLogin from '../components/Login/GoogleLogin';
import GithubLogin from '../components/Login/GithubLogin';
import FacebookLogin from '../components/Login/FacebookLogin';
import Layout from '../components/common/Layout';
function Login() {
  const [email, emailOnchange] = useInput('');
  const [password, passwordOnchange] = useInput('');
  const navigate = useNavigate();
  // 가입되어있는 유저정보 가져오기
  const [allUsers, setAllUsers] = useState([]);
  useEffect(() => {
    const initialUsers = [];
    const fetchData = async () => {
      const queryRef = query(collection(db, 'users'));
      const querySnapshot = await getDocs(queryRef);
      querySnapshot.forEach(doc => {
        const data = {
          id: doc.id,
          ...doc.data(),
        };
        initialUsers.push(data);
      });
      setAllUsers(initialUsers);
      // console.log('allUsers', initialUsers);
    };
    fetchData();
  }, []);

  // 이미등록된 이메일,닉네임 배열
  console.log('allUsers', allUsers);
  const existsEmail = allUsers.map(item => item.email);
  // 유효성 검사 정규식
  const reg_email = /^[A-Za-z0-9]([-_.]?[A-Za-z0-9])*@[A-Za-z0-9]([-_.]?[A-Za-z0-9])*\.[A-Za-z]{2,3}$/i;
  const reg_pw1 = /^[a-z0-9_-]{6,18}$/;
  const loginHandler = async e => {
    const thisUser = allUsers.find(item => item.email === email);
    console.log('thisUser', thisUser);
    e.preventDefault();
    if (email === '' || !reg_email.test(email) || !existsEmail.includes(email)) {
      alert('이메일을 확인해 주세요');
    } else if (password === '' || password !== thisUser.password) {
      alert('비밀번호를 확인해 주세요');
    } else {
      try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        navigate('/');
        console.log('login', userCredential.user);
      } catch (error) {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log('error', errorCode, errorMessage);
      }
    }
  };
  return (
    <Layout>
      <StLoginLogo>
        <img src={logoImg} alt="logo" />
      </StLoginLogo>
      <StLoginForm onSubmit={loginHandler}>
        <StLabel>이메일</StLabel>
        <StInput type="text" value={email} onChange={emailOnchange} />
        <StLabel>비밀번호</StLabel>
        <StInput type="password" value={password} onChange={passwordOnchange} />
        <StButton type="submit" $btnSize="large">
          로그인
        </StButton>
        <StSnsTit>
          <span></span>
          <span>SNS LOGIN</span>
          <span></span>
        </StSnsTit>
        <StSnsIconWrap>
          <GoogleLogin />
          <GithubLogin />
          <FacebookLogin />
        </StSnsIconWrap>
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
    </Layout>
  );
}
export default Login;
const StLoginLogo = styled.div`
  width: 20%;
  max-width: 230px;
  margin: 0 auto;
  padding: 20px 0 40px;
  img {
    width: 100%;
    filter: invert(75%) sepia(68%) saturate(606%) hue-rotate(182deg) brightness(150%) contrast(130%);
  }
`;
const StLoginForm = styled.form`
  max-width: 500px;
  margin: 0 auto;
`;
const StSnsTit = styled.div`
  display: flex;
  margin: 25px 0 15px;
  span {
    display: block;
    width: 33.3333%;
    text-align: center;
    font-size: 0.9rem;
    color: #a1a1a1;
  }
  span:not(:nth-child(2))::before {
    content: '';
    display: block;
    width: 100%;
    height: 1px;
    background-color: #e0e0e0;
    position: relative;
    top: 8px;
  }
`;
const StSnsIconWrap = styled.div`
  display: flex;
  justify-content: center;
  margin: 0 0 30px;
`;
