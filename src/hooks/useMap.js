// initial 좌표 받는다 => 맵 Ref 반환

import { useEffect, useRef, useState } from 'react';

// type 받는다 => Read, Update, Post => option 설정

// 세 타입에 모두 해당되는 부분 => 맵불러오기, 마커, 오버레이

// Post와 Update에만 있는 부분 => 마커변경함수, 오버레이변경
const { kakao } = window;
//mapRef를 받아 변경, 실행순서
const useMap = (latlng, mapRef, address = null) => {
  const { latitude, longitude } = latlng;
  const markerRef = useRef(null);
  const overlayRef = useRef(null);
  const [map, setMap] = useState(null);
  const [markerInfo, setMarkerInfo] = useState(null);
  useEffect(() => {
    const container = mapRef.current;
    const options = {
      center: new kakao.maps.LatLng(latitude, longitude),
      level: 9, // 확대/축소 레벨
    };
    //지도 생성 및 객체 리턴
    const newMap = new kakao.maps.Map(container, options);
    //address가 들어온경우(Read, Update)
    if (address) {
      const position = new kakao.maps.LatLng(latitude, longitude);
      markerRef.current = new kakao.maps.Marker({
        position,
      });
      markerRef.current.setMap(newMap);
      showCustomOverlay(newMap, position, address);
    }
    setMap(newMap);
  }, []);

  const mapClickHandler = (mouseEvent, newMap) => {
    // 클릭한 위도, 경도 정보를 가져옵니다
    const position = mouseEvent.latLng;
    // 이미 마커가 있는 경우 초기화
    if (markerRef.current) {
      markerRef.current.setMap(null);
    }
    //마커 위치 최신화
    markerRef.current = new kakao.maps.Marker({
      position,
    });

    markerRef.current.setMap(newMap);
    // 주소-좌표 변환 객체를 생성
    const geocoder = new kakao.maps.services.Geocoder();
    geocoder.coord2Address(position.getLng(), position.getLat(), (result, status) => {
      if (status === kakao.maps.services.Status.OK) {
        const address = result[0].address.address_name;
        setMarkerInfo({ position, address });
        showCustomOverlay(newMap, position, address);
      }
    });
  };

  const showCustomOverlay = (map, position, text) => {
    if (overlayRef.current) {
      overlayRef.current.setMap(null);
      overlayRef.current = null;
    }
    const content = `
    <a class="overLayLink" target="_blank" href=https://map.kakao.com/link/map/${posts.location},${posts.latLng.latitude},${posts.latLng.longitude}>
    주소: ${address}
  </a>`;

    const customOverlay = new kakao.maps.CustomOverlay({
      content,
      position,
      yAnchor: 1,
    });
  };

  overlayRef.current = customOverlay;
  customOverlay.setMap(map);

  return [mapRef];
  // mapRef,   , submitHandler
};
