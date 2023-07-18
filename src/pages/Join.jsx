import React, { useState } from 'react';
import { StButton, StButtonWrap } from '../components/common/Button';
import InputStyle, { StInput, StLabel } from '../components/common/InputStyle';
import { styled } from 'styled-components';
import useInput from '../hooks/useInput';
import { useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';
import { auth, database, db } from '../firebase';
import { ref, push, set } from 'firebase/database';
import { nanoid } from 'nanoid';
import { addDoc, collection } from 'firebase/firestore';

const Join = () => {
  const [adminCheck, setAdminCheck] = useState(false);
  const [adminCode, setAdminCode] = useState('');
  const [name, nameOnchange] = useInput('');
  const [nickName, nickNameOnchange] = useInput('');
  const [email, emailOnchange] = useInput('');
  const [password, passwordOnchange] = useInput('');
  const [cfmPassword, cfmPasswordOnchange] = useInput('');
  const navigate = useNavigate('');

  const joinHandler = async e => {
    e.preventDefault('');
    if (adminCode === 'adminCode') {
      setAdminCheck(true);
    }
    try {
      // auth
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      console.log('user', userCredential.user);

      // firebase
      const docRef = await addDoc(collection(db, 'users'), {
        id: nanoid(),
        name,
        nickName,
        email,
        password,
        isAdmin: adminCheck,
        profileImg: 'https://github.com/songhsb/triptoday/assets/126348461/e0d71b27-1286-4161-acc8-edbf11a79689',
      });
      console.log('Document isAdmin: ', docRef.isAdmin);
      setAdminCheck(false);

      //database
      // const userListRef = ref(database, 'users');
      // const newUserRef = push(userListRef);
      // set(newUserRef, {
      //   id: nanoid(),
      //   name,
      //   nickName,
      //   email,
      //   password,
      //   isAdmin: false,
      // });
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log('error', errorCode, errorMessage);
    }
  };

  console.log(adminCheck);
  return (
    <>
      <h1>Join</h1>
      <StJoinForm onSubmit={joinHandler}>
        <StLabel>이름</StLabel>
        <StInput type="text" value={name} onChange={nameOnchange} />
        <StLabel>닉네임</StLabel>
        <StInput type="text" value={nickName} onChange={nickNameOnchange} />
        <StLabel>이메일</StLabel>
        <StInput type="text" value={email} onChange={emailOnchange} placeholder="example@example.kr" />
        <StLabel>비밀번호</StLabel>
        <StInput type="password" value={password} onChange={passwordOnchange} />
        <StLabel>비밀번호 확인</StLabel>
        <StInput type="password" value={cfmPassword} onChange={cfmPasswordOnchange} />

        <StLabel
          onClick={() => {
            if (adminCode === '') {
              alert('관리자 코드를 입력해 주세요');
            } else if (adminCode === 'adminCode') {
              setAdminCode(''); // 이렇게 해야하나? 말아야하나?
            }
            // setAdminCheck(prev => !prev);
          }}
        >
          <StCheckBox>{adminCode === 'adminCode' ? <StCheckSvg src="/checkedIcon.svg" /> : <StUnCheckSvg src="/unCheckedIcon.svg" />} 관리자로 회원가입</StCheckBox>
        </StLabel>
        <StInput type="text" value={adminCode} onChange={e => setAdminCode(e.target.value)} />

        <StButton type="submit" $btnSize="large">
          회원가입
        </StButton>

        <StButtonWrap>
          <StButton
            type="button"
            onClick={() => {
              navigate('/login');
            }}
            $btnSize="half"
          >
            로그인
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
      </StJoinForm>
    </>
  );
};

export default Join;

const StJoinForm = styled.form`
  max-width: 500px;
  margin: 0 auto;
`;
const StCheckBox = styled.div`
  cursor: pointer;
`;
const StCheckSvg = styled.img`
  width: 20px;
  position: relative;
  bottom: -3px;
  vertical-align: bottom;
  filter: invert(75%) sepia(27%) saturate(663%) hue-rotate(175deg) brightness(103%) contrast(103%);
`;
const StUnCheckSvg = styled.img`
  width: 20px;
  position: relative;
  bottom: -3px;
  vertical-align: bottom;
  filter: invert(95%) sepia(60%) saturate(2074%) hue-rotate(168deg) brightness(110%) contrast(80%);
  opacity: 0.5;
`;
