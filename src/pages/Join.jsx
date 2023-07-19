import React, { useEffect, useRef, useState } from 'react';
import { StButton, StButtonWrap } from '../components/common/Button';
import InputStyle, { StInput, StLabel, StPtag } from '../components/common/InputStyle';
import { styled } from 'styled-components';
import useInput from '../hooks/useInput';
import { useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';
import { auth, database, db } from '../firebase';
import { ref, push, set } from 'firebase/database';
import { nanoid } from 'nanoid';
import { addDoc, collection, getDocs, query } from 'firebase/firestore';

const Join = () => {
  const [adminCheck, setAdminCheck] = useState(false);
  const [adminCode, setAdminCode] = useState('');
  const [name, nameOnchange] = useInput('');
  const [nickName, nickNameOnchange] = useInput('');
  const [email, emailOnchange] = useInput('');
  const [password, passwordOnchange] = useInput('');
  const [cfmPassword, cfmPasswordOnchange] = useInput('');
  const navigate = useNavigate('');
  const adminInput = useRef();

  const [allUsers, setAllUsers] = useState([]);

  const initialUsers = [];
  useEffect(() => {
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
      console.log('allUsers', initialUsers);
    };
    fetchData();
  }, []);
  console.log('+++++++++++++++++++++++++++++', allUsers);

  // 유효성 검사 정규식
  const reg_name5 = /^[가-힣a-zA-Z]+$/; // 한글 + 영문만
  const reg_id1 = /^[a-z0-9_-]{4,20}$/; // 소문자 + 숫자 + 언더바/하이픈 허용 4~20자리
  const reg_pw1 = /^[a-z0-9_-]{4,18}$/; // 단순 4~18자리
  const reg_email = /^[A-Za-z0-9]([-_.]?[A-Za-z0-9])*@[A-Za-z0-9]([-_.]?[A-Za-z0-9])*\.[A-Za-z]{2,3}$/i;

  const joinHandler = async e => {
    e.preventDefault('');
    if (adminCode === 'adminCode') {
      setAdminCheck(true);
    }
    try {
      // auth
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      console.log('-----------user', userCredential.user);

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
      console.log('-----------Document isAdmin: ', docRef.isAdmin);
      setAdminCheck(false);
      navigate('/');

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

  return (
    <>
      <StJoinForm onSubmit={joinHandler}>
        <StLabel>이름</StLabel>
        <StInput type="text" value={name} onChange={nameOnchange} placeholder="이름을 입력하세요" />
        {name.length < 2 || !reg_name5.test(name) ? (
          <StPtag>2자 이상 한글,영문만 입력해주세요</StPtag>
        ) : (
          <StPtag>
            <br />
          </StPtag>
        )}
        <StLabel>닉네임</StLabel>
        <StInput type="text" value={nickName} onChange={nickNameOnchange} />
        {/* 정보불러와서 있는 닉네임인지 확인해야함 */}
        <StLabel>이메일</StLabel>
        <StInput type="text" value={email} onChange={emailOnchange} placeholder="example@example.kr" />
        {/* 정보불러와서 있는 이메일인지 확인해야함 */}

        <StLabel>비밀번호</StLabel>
        <StInput type="password" value={password} onChange={passwordOnchange} />
        {password.length < 4 || !reg_pw1.test(password) ? (
          <StPtag>4자 이상 입력해주세요</StPtag>
        ) : (
          <StPtag>
            <br />
          </StPtag>
        )}
        <StLabel>비밀번호 확인</StLabel>
        <StInput type="password" value={cfmPassword} onChange={cfmPasswordOnchange} />
        {password === cfmPassword ? (
          <StPtag>
            <br />
          </StPtag>
        ) : (
          <StPtag>비밀번호가 같은지 확인하세요</StPtag>
        )}

        <StLabel
          onClick={() => {
            if (adminCode === '') {
              alert('관리자 코드를 입력해 주세요');
              adminInput.current.focus();
            } else if (adminCode === 'adminCode') {
              setAdminCode(''); // 이렇게 해야하나? 말아야하나?
            }
            // setAdminCheck(prev => !prev);
          }}
        >
          <StCheckBox>{adminCode === 'adminCode' ? <StCheckSvg src="/checkIcon.svg" /> : <StUnCheckSvg src="/unCheckIcon.svg" />} 관리자로 회원가입</StCheckBox>
        </StLabel>
        <StInput type="text" value={adminCode} onChange={e => setAdminCode(e.target.value)} ref={adminInput} />
        {adminCode === 'adminCode' ? (
          <StPtag>관리자로 가입이 가능합니다</StPtag>
        ) : adminCode !== '' ? (
          <StPtag>관리자 코드를 확인해주세요</StPtag>
        ) : (
          <StPtag>
            <br />
          </StPtag>
        )}

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
