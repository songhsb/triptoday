/*global kakao*/
import React, { useEffect } from 'react';

const TestMap = ({ fetchData }) => {
  useEffect(() => {
    let mapContainer = document.getElementById('map'), // 지도를 표시할 div
      mapOption = {
        center: new kakao.maps.LatLng(33.450701, 126.570667), // 지도의 중심좌표
        level: 10, // 지도의 확대 레벨
      };

    let map = new kakao.maps.Map(mapContainer, mapOption); // 지도를 생성합니다

    // 지도에 마커를 표시합니다
    const displayMarkers = data => {
      const markerPosition = new kakao.maps.LatLng(36.469287, 128.0803538);
      // 지도 위 커스텀 오버레이 에 줄 효과
      const contentInner = `<div style="padding: 10px 15px;
      position: relative; bottom:20px; border-radius: 28px; background-color: rgb(255, 255, 255);
      box-shadow: rgb(0 0 0 / 4%) 0px 0px 0px 1px, rgb(0 0 0 / 18%) 0px 2px 4px;
      color: rgb(34, 34, 34); text-align:center;
      font-size: 14px;
      font-weight: 880;"> </div>`;

      const content = document.createElement('div');
      content.innerHTML = contentInner;
      content.addEventListener('mouseover', () => {
        blackOverlay.setMap(map);
        whiteOverlay.setMap(null);
      });

      const blackContentInner = `<div style="padding: 10px 15px;
      position: relative; bottom:20px; border-radius: 28px; background-color: black;
      box-shadow: rgb(0 0 0 / 4%) 0px 0px 0px 1px, rgb(0 0 0 / 18%) 0px 2px 4px;
      color: rgb(255, 255, 255); text-align:center;
      font-size: 14px;
      font-weight: 880;"> </div>`;

      const blackContent = document.createElement('div');
      blackContent.innerHTML = blackContentInner;
      blackContent.addEventListener('mouseout', () => {
        whiteOverlay.setMap(map);
        blackOverlay.setMap(null);
      });

      const whiteOverlay = new kakao.maps.CustomOverlay({
        content: content,
        map: map,
        position: markerPosition,
      });

      const blackOverlay = new kakao.maps.CustomOverlay({
        content: blackContent,
        map: null,
        position: markerPosition,
      });
    };

    // 지도에 확대 축소 컨트롤을 생성한다
    let zoomControl = new kakao.maps.ZoomControl();

    // 지도의 우측에 확대 축소 컨트롤을 추가한다
    map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);

    displayMarkers();
  }, []);

  return <div id="map" style={{ width: '100%', height: '100vh' }} />;
};

export default TestMap;
