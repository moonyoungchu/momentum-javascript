const weather = document.querySelector(".js-weather");
const API_KEY = "142111843d7e13903c21f76ce1f4d19b";
const COORDS = "coords";

// 1. 로드하기
function loadCoords() {
  const loadedCoords = localStorage.getItem(COORDS);

  if (loadedCoords === null) {
    //값이 없으면
    askForCoords();
  } else {
    //값이 있으면
    const parseCoords = JSON.parse(loadedCoords);
    getWeather(parseCoords.latitude, parseCoords.longitude);
  }
}

//기능 : 좌표찾기
function askForCoords() {
  navigator.geolocation.getCurrentPosition(handleGeoSucces, handleGeoError);
}

//기능 : 에러 표시
function handleGeoError() {
  console.log("Can't access geo location");
}

//기능 : 좌표구하기
function handleGeoSucces(position) {
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;
  const coordsObj = {
    latitude,
    longitude,
  };
  saveCoords(coordsObj);
  getWeather(latitude, longitude);
}

//기능 : 좌표 저장
function saveCoords(coordsObj) {
  localStorage.setItem(COORDS, JSON.stringify(coordsObj));
}

//기능 : api로 날씨 가져오기
function getWeather(lat, lng) {
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}&units=metric`
  )
    .then(function (response) {
      return response.json();
    })
    .then(function (json) {
      const temperature = json.main.temp;
      const mainweather = json.weather.main;
      const place = json.name;
      const country = json.sys.country;

      weather.innerText = `${mainweather} @ ${temperature} @ ${country} @ ${place}`;
    });
}

function init() {
  loadCoords();
}

init();
