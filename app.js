


const currentLocation = (position) => {
  //console.log(longitude, latitude);
  document.querySelector('.lat').innerHTML = position.coords.latitude;
  document.querySelector('.lon').innerHTML = position.coords.longitude;
  
  mapCurrentLocation();
}

const error = () => {
  console.error('Unable to retrieve location');
}
let marker1;
const currentLocationMarker = (map, longitude, latitude) => {
  marker1 = new mapboxgl.Marker()
  .setLngLat([longitude, latitude])
  .addTo(map);
}
let map;
const mapCurrentLocation = () => {
  const lat = document.querySelector('.lat').innerHTML;
  const lon = document.querySelector('.lon').innerHTML;
  mapboxgl.accessToken = 'pk.eyJ1IjoibWF5dXJwYXRlbDc4NjQ1IiwiYSI6ImNrcDVrYjh0cjF5azAyb3RhbjBnOWN6ajIifQ.MS0bHsUsb-hMZ1dABPcqHQ';
  map = new mapboxgl.Map({
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
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${userQuery}.json?limit=10&proximity=${[lon, lat]}&access_token=pk.eyJ1IjoibWF5dXJwYXRlbDc4NjQ1IiwiYSI6ImNrcDVrYjh0cjF5azAyb3RhbjBnOWN6ajIifQ.MS0bHsUsb-hMZ1dABPcqHQ`
  const userSearch = await fetch(url)
  const response = await userSearch.json()
  calculateDistance(lon, lat, response)
}

const calculateDistance = (lon, lat, response) => {
  const poiArr = [];
  let poiObject = {};
  console.log(response.features);
  response.features.forEach( poi => {
    const poiLon = poi.geometry.coordinates[0];
    const poiLat = poi.geometry.coordinates[1];
    const distance = (turf.distance([poiLon,poiLat], [lon,lat],{units:'kilometers'} )).toFixed(2);
    poiObject = {
      name: poi.text,
      address: poi.properties.address?? '',
      distance: distance,
      latitude: poiLat,
      longitude: poiLon,
    }
    poiArr.push(poiObject);
  });
  console.log(poiArr);
  render(poiArr);
}

const render = (poiArr) => {
  const pointsOfInterests = document.querySelector('.points-of-interest');
  pointsOfInterests.innerHTML = '';
  poiArr.forEach(poi => {
    pointsOfInterests.insertAdjacentHTML('beforeend', 
    `<li class="poi" data-long="${poi.longitude}" data-lat="${poi.latitude}">
      <ul>
        <li class="name">${poi.name}</li>
        <li class="street-address">${poi.address}</li>
        <li class="distance">${poi.distance} KM</li>
      </ul>
    </li>`);
  });
}


const inputForm = document.querySelector('.form');
inputForm.addEventListener('input', (e) => {
  const pointsOfInterests = document.querySelector('.points-of-interest');
  if (e.target.nodeName === 'INPUT') {
    mapSearch(e.target.value);
  }
  if (e.target.value === '') {
    const pointsOfInterests = document.querySelector('.points-of-interest');
    pointsOfInterests.innerHTML = '';
    e.preventDefault();
  }
  pointsOfInterests.addEventListener('click', handleClick);
});

let marker2;
const handleClick = (e) => {
  if (e.target.nodeName === 'LI') {
    console.log(e.target.closest('.poi').dataset.long);
    map.flyTo({
      center: [e.target.closest('.poi').dataset.long, e.target.closest('.poi').dataset.lat], 
      zoom: 14
    });
    marker1.remove();
    marker2 = new mapboxgl.Marker()
    .setLngLat([e.target.closest('.poi').dataset.long, e.target.closest('.poi').dataset.lat])
    .addTo(map);
  }
}