import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { styled } from 'styled-components';
import { StButton } from './Button';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { collection, getDocs, query } from 'firebase/firestore';
import { auth, db } from '../../firebase';
import logoimg from '../../assets/img/logo.svg';
import Search from '../../assets/img/Search.png';
import ModalForAlert from './ModalForAlert';

const Header = () => {
  const navigate = useNavigate('');
  const [userEmail, setUserEmail] = useState('');
  const [allUsers, setAllUsers] = useState([]);

  // 로그인된 사용자 정보
  useEffect(() => {
    onAuthStateChanged(auth, user => {
      // console.log('UseEffect1-유저모든정보', user);
      setUserEmail(user?.email);
      //로그인 사용자의 이메일
      console.log('user', user);
    });
  }, []);

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
  // console.log('allUsers-세팅! -------------------', allUsers);

  const user = auth.currentUser;
  // console.log(user);

  const thisUser = allUsers?.find(item => item.email === userEmail);
  // console.log(thisUser);

  // 로그아웃
  const logoutHandler = async () => {
    await signOut(auth);
    navigate('/');
  };

  return (
    <StHeader>
      {/* <ModalForAlert /> */}
      <StLogo onClick={() => navigate('/')}>
        <StTravelImg>
          <img src={logoimg} alt="로고" />
        </StTravelImg>
      </StLogo>
      {/* 검색창 */}
      <StContener>
        <StSearchText type="text" />
        <StSearchBtn>
          <StSearchimg src={Search} />
        </StSearchBtn>
        &nbsp;
        {/* 로그인버튼 */}
        {thisUser?.isAdmin && (
          <>
            <StButton $fontColor={'black'} onClick={() => navigate('/write')}>
              글쓰기
            </StButton>
          </>
        )}
        {user ? (
          <StButton onClick={logoutHandler}>로그아웃</StButton>
        ) : (
          <>
            <StButton
              onClick={() => {
                navigate('/login');
              }}
            >
              로그인
            </StButton>
            <StButton
              onClick={() => {
                navigate('/join');
              }}
            >
              회원가입
            </StButton>
          </>
        )}
      </StContener>
    </StHeader>
  );
};

export default Header;

const StHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
`;

const StLogo = styled.div`
  cursor: pointer;
  font-size: 22px;
  font-weight: 800;
`;
const StContener = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
export const StSearchText = styled.input`
  width: 279px;
  height: 45px;
  border: 1px solid #ccc;
  border-radius: 8px;
  margin-top: 10px;
  font-size: 18px;
  margin-bottom: 10px;
`;
const StTravelImg = styled.div`
  width: 200px;
`;

const StSearchBtn = styled.button`
  border: 0; /* 버튼의 border를 0으로 설정하여 안 보이도록 합니다. */
  background-color: transparent; /* 버튼의 배경을 투명으로 만듭니다. */
  width: 40px;
  height: 40px;
  margin-top: 10px;
  margin-right: 20px;
  margin-bottom: 10px;
`;
const StSearchimg = styled.img`
  width: 33px;
  height: 34px;
`;
