function initMap2(lat, lng) {
    const location = new naver.maps.LatLng(lat, lng);
    const map = new naver.maps.Map("map2", {
        center: location,
        zoom: 16
    });

    const marker = new naver.maps.Marker({
        position: location,
        map: map
    });

    const contentString = `
        <div style='padding:5px;'>
            <div style='float:left;'>
                <p>위도: ${lat}, 경도: ${lng}</p>
            </div>
        </div>
    `;

    const infowindow = new naver.maps.InfoWindow({
        content: contentString,
    });

    // 클릭한 경우
    let num = 1;
    naver.maps.Event.addListener(marker, "click", function () {
        num % 2 === 1 ? infowindow.open(map, marker) : infowindow.close();
        num++;
    });
}
