import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { styled } from 'styled-components';
import { StButton } from './Button';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { collection, getDocs, query } from 'firebase/firestore';
import { auth, db } from '../../firebase';
import logoimg from '../../assets/img/logo.svg';
import Search from '../../assets/img/Search.png';
import { useQuery } from 'react-query';
import { getPosts } from '../../api/posts';
import LoadingSpinner from './LoadingSpinner';
import useInput from '../../hooks/useInput';
import { EmailAtom, SearchAtom } from '../../recoil/SearchAtom';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import TopBtn from './TopBtn';

const Header = () => {
  const navigate = useNavigate('');
  const [userEmail, setUserEmail] = useState('');
  const [allUsers, setAllUsers] = useState([]);
  const { isLoading, isError, data: posts } = useQuery('postsData', getPosts);
  const [post, setHandlePost, setPost] = useInput();
  const [searchValue, setSearchValue, setSearch] = useInput();

  // 전역 변수 사용
  const searchList = useRecoilValue(SearchAtom);
  const setSearchList = useSetRecoilState(SearchAtom);
  const EmailDisCharge = useRecoilValue(EmailAtom);
  const setEmailDischarge = useSetRecoilState(EmailAtom);

  useEffect(() => {
    onAuthStateChanged(auth, user => {
      // console.log('UseEffect1-유저모든정보', user);
      setUserEmail(user?.email);
      setEmailDischarge(user?.email);
      //로그인 사용자의 이메일
      // console.log('user', user);
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

  // post.data 정보 가지고 오기
  const locationData = async () => {
    try {
      if (posts?.data) {
        const data = posts.data;
        setPost(data);
      } else {
        setPost([]);
      }
    } catch (error) {
      return;
    }
  };
  // 새로고침 후 검색창 초기화
  useEffect(() => {
    locationData();
    setSearch('');
    setSearchList([]);
  }, [isLoading, posts]);

  if (isLoading) {
    return <LoadingSpinner />;
  }
  // include 값 구하기

  const searchData = e => {
    e.preventDefault();
    const main = post.filter(item => item.location.includes(searchValue));
    setSearchList(main);
  };

  return (
    <StHeader>
      <StLogo onClick={() => navigate('/')}>
        <img src={logoimg} alt="로고" />
      </StLogo>
      {/* 검색창 */}
      <StContainer>
        <StSearchForm>
          <StSearchInput type="text" value={searchValue} onChange={setSearchValue} />
          <StSearchBtn onClick={searchData}>
            <img src={Search} />
          </StSearchBtn>
        </StSearchForm>
        &nbsp;
        {/* 로그인버튼 */}
        {thisUser?.isAdmin && (
          <>
            <StButton onClick={() => navigate('/write')}>글쓰기</StButton>
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
      </StContainer>
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
  width: 200px;
`;

const StContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
const StSearchForm = styled.div`
  display: flex;
`;
const StSearchInput = styled.input`
  width: 279px;
  height: 45px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 18px;
`;
const StSearchBtn = styled.button`
  border: 0; /* 버튼의 border를 0으로 설정하여 안 보이도록 합니다. */
  background-color: transparent; /* 버튼의 배경을 투명으로 만듭니다. */
  margin-right: 20px;
`;
