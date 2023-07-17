import React from 'react';

const Main = () => {
  return (
    <>
      {/* // 메인배너  */}
      <div>
        <ul>
          <li>
            <img src="" alt="slide1" /> Main banner 1
          </li>
          <li>
            <img src="" alt="slide1" /> Main banner 2
          </li>
          <li>
            <img src="" alt="slide1" /> Main banner 3
          </li>
        </ul>
      </div>

      {/* 베스트 여행지  */}
      <div>
        <div>
          1위
          {/* 호버 */}
          <div>
            <div>타이틀</div>
            <div>소개</div>
          </div>
        </div>
        <div>
          2위
          {/* 호버 */}
          <div>
            <div>타이틀</div>
            <div>소개</div>
          </div>
        </div>
        <div>
          3위
          {/* 호버 */}
          <div>
            <div>타이틀</div>
            <div>소개</div>
          </div>
        </div>
      </div>

      <div>
        {/* 셀렉트박스  */}
        <ul>
          <li>
            <button>전체</button>
          </li>
          <li>
            <button>서울</button>
          </li>
          <li>
            <button>경기</button>
          </li>
          <li>
            <button>강원</button>
          </li>
          <li>
            <button>부산</button>
          </li>
        </ul>
        <ul>
          <li>
            <img src="" alt="여행지1" />
          </li>
          <li>
            <img src="" alt="여행지2" />
          </li>
          <li>
            <img src="" alt="여행지3" />
          </li>
          <li>
            <img src="" alt="여행지4" />
          </li>
          <li>
            <img src="" alt="여행지5" />
          </li>
          <li>
            <img src="" alt="여행지6" />
          </li>
          <li>
            <img src="" alt="여행지7" />
          </li>
          <li>
            <img src="" alt="여행지8" />
          </li>
          <li>
            <img src="" alt="여행지9" />
          </li>
          <li>
            <img src="" alt="여행지10" />
          </li>
        </ul>
      </div>
    </>
  );
};

export default Main;
