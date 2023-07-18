// MapTestNormal 초기에서 안건드림

import React, { useEffect, useState } from 'react';

const { kakao } = window;

const MapTestSearch = () => {
  const [mapMessage, setMapMessage] = useState(true);

  useEffect(() => {
    // * 📌 기본 map 공통 시작
    //지도를 담을 영역의 DOM 레퍼런스
    let container = document.getElementById('map');
    //지도를 생성할 때 필요한 기본 옵션
    let options = {
      center: new kakao.maps.LatLng(33.450701, 126.570667),
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

    // 지도에 클릭 이벤트를 등록합니다
    // 지도를 클릭하면 마지막 파라미터로 넘어온 함수를 호출합니다
    kakao.maps.event.addListener(map, 'click', function (mouseEvent) {
      // 클릭한 위도, 경도 정보를 가져옵니다
      let latlng = mouseEvent.latLng;

      // 마커 위치를 클릭한 위치로 옮깁니다
      marker.setPosition(latlng);

      let message = '클릭한 위치의 위도는 ' + latlng.getLat() + ' 이고, ';
      message += '경도는 ' + latlng.getLng() + ' 입니다';
      setMapMessage(message);

      // * 아래 두 줄은 UI에 지도 위도/경도 표시 해주는 거
      // let resultDiv = document.getElementById('clickLatlng');
      // resultDiv.innerHTML = message;
    });
  }, []);
  return (
    <div>
      <h1>this is practicing area for kakao map</h1>
      <div id="map" style={{ width: '500px', height: '500px', backgroundColor: 'beige' }}></div>
      <p>
        <em>지도 클릭해봐여</em>
      </p>
      <div id="clickLatlng"></div>
      <p>{mapMessage}</p>
    </div>
  );
};

export default MapTestSearch;
