const currentLocation = (position) => {
  const {latitude, longitude} = position.coords;
  console.log(latitude, longitude);
}

const error = () => {
  console.error('Unable to retrieve location');
}

(function getUserLocation() {
  navigator.geolocation.getCurrentPosition(currentLocation, error);
}());
