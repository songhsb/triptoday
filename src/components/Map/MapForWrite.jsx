import React, { useEffect, useRef, useState } from 'react';
import { styled } from 'styled-components';
import useInput from '../../hooks/useInput';
const { kakao } = window;

const MapForWrite = ({
  markerInfo,
  setMarkerInfo,
  posts = {
    latLng: {
      latitude: 37.18610826882379,
      longitude: 128.45149303027506,
    },
    address: null,
  },
}) => {
  const mapRef = useRef(null);
  const markerRef = useRef(null);
  const overlayRef = useRef(null);
  const [map, setMap] = useState(null);
  const [searchError, setSearchError] = useState(false);
  const [mapInputValue, mapInputChangeHandler, mapInputReset] = useInput();
  useEffect(() => {
    const container = mapRef.current;
    const position = new kakao.maps.LatLng(posts.latLng.latitude, posts.latLng.longitude);
    const options = {
      center: position,

      level: posts.address != null ? 4 : 12, // 확대/축소 레벨
    };
    //지도 생성 및 객체 리턴
    const newMap = new kakao.maps.Map(container, options);
    if (posts.address != null) {
      markerRef.current = new kakao.maps.Marker({
        position,
      });
      markerRef.current.setMap(newMap);
      showCustomOverlay(newMap, position, posts.address);
    }

    // 지도를 클릭했을 때 이벤트 핸들러(핀생성)

    kakao.maps.event.addListener(newMap, 'click', e => mapClickHandler(e, newMap));
    const zoomControl = new kakao.maps.ZoomControl();
    newMap.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);

    const mapTypeControl = new kakao.maps.MapTypeControl();
    newMap.addControl(mapTypeControl, kakao.maps.ControlPosition.TOPRIGHT);

    setMap(newMap);
  }, []);

  const mapClickHandler = (mouseEvent, newMap) => {
    const position = mouseEvent.latLng;
    if (markerRef.current) {
      markerRef.current.setMap(null);
    }
    markerRef.current = new kakao.maps.Marker({
      position,
    });
    markerRef.current.setMap(newMap);
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
    <div style="position: absolute; left: 50%; bottom: 40px; transform: translateX(-50%); background-color: #fff; padding: 5px; font-size: 14px; font-weight:800; border:2px solid">
    주소: ${text}
  </div>
    `;

    const customOverlay = new kakao.maps.CustomOverlay({
      content,
      position,
      yAnchor: 1,
    });
    overlayRef.current = customOverlay;
    customOverlay.setMap(map);
  };

  const searchHandler = () => {
    const keyword = mapInputValue;
    mapInputReset();
    const ps = new kakao.maps.services.Places();
    ps.keywordSearch(keyword, (data, status) => {
      if (status === kakao.maps.services.Status.OK) {
        const bounds = new kakao.maps.LatLngBounds();
        if (markerRef.current) {
          markerRef.current.setMap(null);
        }

        if (overlayRef.current) {
          overlayRef.current.setMap(null);
          overlayRef.current = null;
        }

        data.forEach(place => {
          const position = new kakao.maps.LatLng(place.y, place.x);
          bounds.extend(position);
        });
        map.setBounds(bounds);
        setSearchError(false);
      } else {
        setSearchError(true);

        if (markerRef.current) {
          markerRef.current.setMap(null);
        }

        if (overlayRef.current) {
          overlayRef.current.setMap(null);
          overlayRef.current = null;
        }
      }
    });
  };
  const handleOnKeyPress = e => {
    e.preventDefault();
    if (e.key === 'Enter') {
      searchHandler();
    }
  };
  return (
    <div>
      {searchError && <p>해당 장소를 찾을 수 없습니다.</p>}
      {markerInfo && (
        <div>
          <p>주소: {markerInfo.address}</p>
        </div>
      )}
      <MapBox ref={mapRef}>
        <MapSearchInput className="" value={mapInputValue} onChange={mapInputChangeHandler} type="text" placeholder="장소를 검색하세요" onKeyPress={handleOnKeyPress} />
      </MapBox>
    </div>
  );
};
export default MapForWrite;

const MapBox = styled.div`
  width: 100%;
  height: 500px;
  margin: 30px 0;
  border-radius: 10px;
`;

const MapSearchInput = styled.input`
  width: 400px;
  height: 50px;
  position: absolute;
  left: 50%;
  top: 2%;
  transform: translate(-50%, 0);
  border: 0;
  border: solid 1px #ddd;
  padding: 13px;
  z-index: 2;
  font-size: 20px;
  border-radius: 10px;
`;
