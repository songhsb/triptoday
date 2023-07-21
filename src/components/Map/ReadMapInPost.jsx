import React, { useEffect, useRef, useState } from 'react';
import { styled } from 'styled-components';
import './Overlay.css';

const { kakao } = window;

const ReadMapInPost = ({ posts }) => {
  const mapRef = useRef(null);
  const markerRef = useRef(null);
  const overlayRef = useRef(null);
  const [map, setMap] = useState(null);
  useEffect(() => {
    const container = mapRef.current;
    const options = {
      center: new kakao.maps.LatLng(posts.latLng.latitude, posts.latLng.longitude),
      level: 9, // 확대/축소 레벨
      draggable: false, // 지도 이동 막음
      disableDoubleClickZoom: true,
    };
    //지도 생성 및 객체 리턴
    const newMap = new kakao.maps.Map(container, options);
    const position = new kakao.maps.LatLng(posts.latLng.latitude, posts.latLng.longitude);
    markerRef.current = new kakao.maps.Marker({
      position,
    });
    markerRef.current.setMap(newMap);
    showCustomOverlay(newMap, position, posts.address);
    setMap(newMap);
  }, []);

  const showCustomOverlay = (map, position, text) => {
    if (overlayRef.current) {
      overlayRef.current.setMap(null);
      overlayRef.current = null;
    }

    const content = `
    
    <a class="overLayLink" target="_blank" href=https://map.kakao.com/link/map/${posts.location},${posts.latLng.latitude},${posts.latLng.longitude}>
    ${posts.address}
  </a>
  
    `;

    const customOverlay = new kakao.maps.CustomOverlay({
      content,
      position,
      yAnchor: 1,
    });

    overlayRef.current = customOverlay;
    customOverlay.setMap(map);
  };

  // useEffect 여기에 위치
  return (
    <div>
      <div ref={mapRef} style={{ width: '1200px', height: '300px' }}></div>
    </div>
  );
};
export default ReadMapInPost;
