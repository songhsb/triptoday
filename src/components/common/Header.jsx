import React from 'react';
// import todayTrip from '../public/todayTrip.png';

const Header = () => {
  return (
    <div>
      <h1>
        <a href="">
          {/* <img src={todayTrip} alt="오늘의 여행 로고" /> */}
          오늘의 여행
        </a>
      </h1>
      {/* 검색창 */}
      <div>
        <label htmlFor="">검색창</label>
        <input type="text" />
        <button>검색</button>
      </div>
      {/* 로그인버튼 */}
      <div>
        <button>로그인</button>
        <button>회원가입</button>
      </div>
    </div>
  );
};

export default Header;
