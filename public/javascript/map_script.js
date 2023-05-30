function initMap() {
	const cbnuLocation = new naver.maps.LatLng(36.62563026275683, 127.4544004838527);
	const map = new naver.maps.Map("map", {
		center: cbnuLocation,
		zoom: 16
	});
	
	const marker = new naver.maps.Marker({
		position: cbnuLocation,
		map: map
	});
	
	
	const contentString = ["<div style='padding:10px;'>" +
	"<div style='float:left;'>" +
	"<h4>충북대학교 S4-1</h4>"+
	"<a href='https://map.kakao.com/?urlX=601621.0&urlY=868907.0&itemId=1236538181&q=%EC%B6%A9%EB%B6%81%EB%8C%80%ED%95%99%EA%B5%90%20%EC%A0%84%EC%9E%90%EC%A0%95%EB%B3%B4%EB%8C%80%ED%95%993%EA%B4%80&srcid=1236538181&map_type=TYPE_MAP&from=roughmap' target='_blank'>길찾기</a></div></div>"
].join('');
	
	const infowindow = new naver.maps.InfoWindow({
		content: contentString,
	});
	
	naver.maps.Event.addListener(marker, "click", function () {
		infowindow.open(map, marker);
	});
}