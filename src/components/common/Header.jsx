import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { StButton } from './Button';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from '../../firebase';
// import todayTrip from '../public/todayTrip.png';

const Header = () => {
  // 로그인 유저를 state...?
  // const [loginUser, setLoginUser] = useState();

  const navigate = useNavigate('');

  useEffect(() => {
    onAuthStateChanged(auth, user => {
      console.log('userUseEffect1', user);
    });
  }, []);

  const user = auth.currentUser;

  const logoutHandler = async () => {
    await signOut(auth);
    navigate('/');
  };

  return (
    <div>
      <h1 onClick={() => navigate('/')}>
        {/* <img src={todayTrip} alt="오늘의 여행 로고" /> */}
        오늘의 여행
      </h1>
      {/* 검색창 */}
      <div>
        <label htmlFor="">검색창</label>
        <input type="text" />
        <button>검색</button>
      </div>
      {/* 로그인버튼 */}
      <div>
        {user ? (
          <StButton onClick={logoutHandler} $btnSize="small">
            로그아웃
          </StButton>
        ) : (
          <>
            <button
              onClick={() => {
                navigate('/login');
              }}
            >
              로그인
            </button>
            <button
              onClick={() => {
                navigate('/join');
              }}
            >
              회원가입
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Header;
