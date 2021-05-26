const currentLocation = (position) => {
  const {latitude, longitude} = position.coords;
  console.log(longitude, latitude);
  mapCurrentLocation(longitude, latitude);
}

const error = () => {
  console.error('Unable to retrieve location');
}

const currentLocationMarker = (map, longitude, latitude) => {
  console.log(map);
  const marker1 = new mapboxgl.Marker()
  .setLngLat([longitude, latitude])
  .addTo(map);
  console.log(marker1);
}

const mapCurrentLocation = (longitude, latitude) => {
  mapboxgl.accessToken = 'pk.eyJ1IjoibWF5dXJwYXRlbDc4NjQ1IiwiYSI6ImNrcDVrYjh0cjF5azAyb3RhbjBnOWN6ajIifQ.MS0bHsUsb-hMZ1dABPcqHQ';
  const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v11',
    center: [longitude, latitude], 
    zoom: 13
  });
  currentLocationMarker(map, longitude, latitude);
}

(function getUserLocation() {
  navigator.geolocation.getCurrentPosition(currentLocation, error);
}());
