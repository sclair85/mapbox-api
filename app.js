


const currentLocation = (position) => {
  //console.log(longitude, latitude);
  document.querySelector('.lat').innerHTML = position.coords.latitude;
  document.querySelector('.lon').innerHTML = position.coords.longitude;
  
  mapCurrentLocation();
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

const mapCurrentLocation = () => {
  
  const lat = document.querySelector('.lat').innerHTML;
  const lon = document.querySelector('.lon').innerHTML;
  console.log(lat, lon)
  mapboxgl.accessToken = 'pk.eyJ1IjoibWF5dXJwYXRlbDc4NjQ1IiwiYSI6ImNrcDVrYjh0cjF5azAyb3RhbjBnOWN6ajIifQ.MS0bHsUsb-hMZ1dABPcqHQ';
  const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v11',
    center: [lon, lat], 
    zoom: 13
  });

  currentLocationMarker(map, lon, lat);
  
}



(function getUserLocation() {
  navigator.geolocation.getCurrentPosition(currentLocation, error);
}());



const mapSearch = async (userQuery) => {
  const lon = (document.querySelector('.lon').innerHTML);
  const lat = (document.querySelector('.lat').innerHTML);
  console.log(userQuery)
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${userQuery}.json?proximity=${[lon, lat]}&access_token=pk.eyJ1IjoibWF5dXJwYXRlbDc4NjQ1IiwiYSI6ImNrcDVrYjh0cjF5azAyb3RhbjBnOWN6ajIifQ.MS0bHsUsb-hMZ1dABPcqHQ`
  console.log(url)
  const userSearch = await fetch(url)
  const response = await userSearch.json()
  console.log(response)
  //response 
  //pass response to render
}


const inputForm = document.querySelector('.form');
inputForm.addEventListener('keydown', (e) => {
  if(e.keyCode === 13){
    e.preventDefault()
    e.target.value = ''
  }
  mapSearch(e.target.value);
});

// search text from input field html
// autocomplete
// 
//   /geocoding/v5/{mapbox.places}/{search_text}/autocomplete=true.json
