import React, { useEffect, useRef, useState } from 'react';
const { kakao } = window;
const MapForWrite = ({ markerInfo, setMarkerInfo }) => {
  const mapRef = useRef(null);
  const markerRef = useRef(null);
  const [map, setMap] = useState(null);
  const overlayRef = useRef(null);
  // const [markerInfo, setMarkerInfo] = useState(null);
  const [searchError, setSearchError] = useState(false);

  useEffect(() => {
    //맵을 보여줄 html요소에 Ref를 부여해 DOM 요소를 가져온다.
    const container = mapRef.current;
    //지도를 생성할 때 필요한 기본 옵션 (대한민국 지도의 중앙 위치, 제주를 제외한 한반도 다 보여주기)
    const options = {
      center: new kakao.maps.LatLng(36.469287, 128.0803538),
      level: 13, // 확대/축소 레벨
    };
    //
    //지도 생성 및 객체 리턴
    const newMap = new kakao.maps.Map(container, options);

    // 지도를 클릭했을 때 이벤트 핸들러(핀생성)
    const mapClickHandler = mouseEvent => {
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

    kakao.maps.event.addListener(newMap, 'click', mapClickHandler);
    const zoomControl = new kakao.maps.ZoomControl();
    newMap.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);

    const mapTypeControl = new kakao.maps.MapTypeControl();
    newMap.addControl(mapTypeControl, kakao.maps.ControlPosition.TOPRIGHT);
    setMap(newMap);
  }, []);

  //커스텀 오버레이 핸들러

  const showCustomOverlay = (map, position, address) => {
    //오버레이 초기화(지도에서 없애고 초기화)
    if (overlayRef.current) {
      overlayRef.current.setMap(null);
      overlayRef.current = null;
    }

    const content = `
    <div style="position: absolute; left: 50%; bottom: 40px; transform: translateX(-50%); background-color: #fff; padding: 5px; font-size: 12px; font-weight:800; border:2px solid">
    주소: ${address}
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

  // 검색 이벤트 핸들러
  const searchHandler = () => {
    //입력한 값 가져옴 // state로 변경 필요
    const keyword = document.getElementById('search-input').value;
    const ps = new kakao.maps.services.Places();
    ps.keywordSearch(keyword, (data, status) => {
      if (status === kakao.maps.services.Status.OK) {
        if (markerRef.current) {
          markerRef.current.setMap(null);
        }

        if (overlayRef.current) {
          overlayRef.current.setMap(null);
          overlayRef.current = null;
        }
        // 가져온 장소들의 좌표를 저장
        const bounds = new kakao.maps.LatLngBounds();
        data.forEach(place => {
          const position = new kakao.maps.LatLng(place.y, place.x);
          bounds.extend(position);
        });
        // 좌표들 기준으로 지도 설정
        map.setBounds(bounds);
        setSearchError(false); // 검색 에러 초기화
      } else {
        setSearchError(true); // 검색 에러 표시
        if (markerRef.current) {
          markerRef.current.setMap(null);
        }
      }
    });
  };
  const handleOnKeyPress = e => {
    e.preventDefault();
    if (e.key === 'Enter') {
      searchHandler(); // Enter 입력이 되면 클릭 이벤트 실행
    }
  };
  return (
    <div>
      <div>
        <input id="search-input" type="text" placeholder="장소를 검색하세요" onKeyPress={handleOnKeyPress} />
        <button type="button" onClick={searchHandler}>
          검색
        </button>
      </div>
      {searchError && <p>해당 장소를 찾을 수 없습니다.</p>}
      {markerInfo && (
        <div>
          <p>
            좌표: {markerInfo.position.getLat()}, {markerInfo.position.getLng()}
          </p>
          <p>주소: {markerInfo.address}</p>
        </div>
      )}
      <div ref={mapRef} style={{ width: '500px', height: '500px' }} />
    </div>
  );
};

export default MapForWrite;
