/**
  * 글 작성시 map
  * 클릭한 위치 좌표 (위도, 경도) => (latlng.getLat(),latlng.getLng() )
      ㄴ useEffect() 안에 있는 위의 값을 state로 따로 저장해서 사용!
  * 수정할 때에 (기존에 찍혀있던 위도, 경도 표시하려면) useEffect options에 있는  
    center: new kakao.maps.LatLng(36.469287, 128.0803538),
    ㄴ 위 부분애 위도, 경도 자리만 바꿔 보여주면 됨 (변수 넣어서 사용)
 */
import React, { useEffect, useState } from 'react';

const { kakao } = window;

const MapTestNormal = () => {
  const [mapMessage, setMapMessage] = useState(true);
  const [latitude, setLatitude] = useState(36.469287);
  const [longitude, setLongitude] = useState(128.0803538);

  useEffect(() => {
    // * 📌 기본 map 공통 시작
    //지도를 담을 영역의 DOM 레퍼런스
    let container = document.getElementById('map');
    //지도를 생성할 때 필요한 기본 옵션 (대한민국 지도의 중앙 위치, 제주를 제외한 한반도 다 보여주기)
    let options = {
      center: new kakao.maps.LatLng(36.469287, 128.0803538),
      level: 13,
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
      setLatitude(latlng.getLat());
      setLongitude(latlng.getLng());

      // * 아래 두 줄은 UI에 지도 위도/경도 표시 해주는 거
      // let resultDiv = document.getElementById('clickLatlng');
      // resultDiv.innerHTML = message;
    });

    // 일반 지도와 스카이뷰로 지도 타입을 전환할 수 있는 지도타입 컨트롤을 생성합니다
    var mapTypeControl = new kakao.maps.MapTypeControl();

    // 지도에 컨트롤을 추가해야 지도위에 표시됩니다
    // kakao.maps.ControlPosition은 컨트롤이 표시될 위치를 정의하는데 TOPRIGHT는 오른쪽 위를 의미합니다
    map.addControl(mapTypeControl, kakao.maps.ControlPosition.TOPRIGHT);

    // 지도 확대 축소를 제어할 수 있는  줌 컨트롤을 생성합니다
    var zoomControl = new kakao.maps.ZoomControl();
    map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);
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
      <p>
        얘네 둘은 form 태그 전송할 값들 | {latitude} : {longitude}
      </p>
    </div>
  );
};

export default MapTestNormal;
