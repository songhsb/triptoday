export const touristAttraction = async location => {
  try {
    const response = await fetch(
      `https://apis.data.go.kr/B551011/KorService1/searchKeyword1?serviceKey=X11Rph8hBlLFPnEyziqabLagQlFkLQY5UqAv4b0olAECH5FFlBdLo2q9fha9sd5ufTZpP%2BlRZeeXNdZr0%2Bp3gw%3D%3D&numOfRows=10&pageNo=1&MobileOS=ETC&MobileApp=AppTest&_type=json&listYN=Y&arrange=A&keyword=${location}&contentTypeId=12`,
    );

    const data = await response.json();
    const regionData = data.response.body.items.item;
    return regionData;
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};
