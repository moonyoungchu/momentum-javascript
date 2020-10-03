const body = document.querySelector("body");

const IMG_NUMBER = 3;

//기능 : 랜덤번호 추출
function getRandom() {
  const number = Math.floor(Math.random() * IMG_NUMBER);
  return number;
}

//기능 : 새로고침 시 배경이미지 랜덤으로
function paintImage(imgNumber) {
  const image = new Image();
  image.src = `images/${imgNumber + 1}.jpg`;
  image.classList.add("bgimage"); //css클래스 추가
  body.prepend(image); // 콘텐츠를 선택한 요소 내부의 시작 부분에서 삽입
}

function init() {
  const randomNumber = getRandom();
  paintImage(randomNumber);
}

init();
