import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const { kakao } = window;

/**
 *
 * @param {데이터베이스에 저장되어 있는 위도} latitude
 * @param {데이터베이스에 저장되어 있는 경도} longitude
 * @returns
 */
const ReadMapInPost = ({ latitude, longitude }) => {
  const [mapMessage, setMapMessage] = useState(true);
  // NOTE 데이터베이스에서 정보 못가져오니까 latitude랑 longitude 임시로 할당중
  latitude = 33.450701;
  longitude = 126.570667;
  const 지도클릭시뜨는이름 = '여기';

  useEffect(() => {
    // * 📌 기본 map 공통 시작
    //지도를 담을 영역의 DOM 레퍼런스
    let container = document.getElementById('map');
    //지도를 생성할 때 필요한 기본 옵션
    let options = {
      center: new kakao.maps.LatLng(latitude, longitude),
      draggable: false, // 지도 이동 막음
      disableDoubleClickZoom: true,
      level: 3,
    };

    //지도 생성 및 객체 리턴
    let map = new kakao.maps.Map(container, options);
    // * 기본 map 공통 끝

    // 지도를 클릭한 위치에 표출할 마커입니다
    let marker = new kakao.maps.Marker({
      // 지도 중심좌표에 마커를 생성합니다
      position: map.getCenter(),
    });
    // 지도에 마커를 표시합니다
    marker.setMap(map);
  }, []);
  return (
    <div>
      <h1>this is practicing area for kakao map</h1>
      <div id="map" style={{ width: '500px', height: '500px', backgroundColor: 'beige' }}></div>
      <p>
        <em>지도 클릭해봐여</em>
      </p>
      {/* 새로운 탭에 카카오 맵지도로 상세보기 (위치 더 정확하게 지정하고 싶으면 여기(https://apis.map.kakao.com/web/guide/#searchurl)들어가서 다른걸로 바꾸기) */}
      <button
        onClick={() => {
          window.open(`https://map.kakao.com/link/map/${지도클릭시뜨는이름},${latitude},${longitude}`, '_black');
        }}
      >
        큰 지도로 보기
      </button>
      {/* <div id="clickLatlng"></div> */}
      <p>{mapMessage}</p>
    </div>
  );
};

export default ReadMapInPost;
