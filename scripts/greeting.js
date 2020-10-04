const form = document.querySelector(".js-form");
const input = form.querySelector("input");
const greeting = document.querySelector(".js-greeting");

const USER_LS = "currentUser";
const SHOWING_CN = "showing";

//기능 : 로컬스토리지에서 이름 가져오기
function loadName() {
  const currentUser = localStorage.getItem(USER_LS);

  if (currentUser === null) {
    askForName(); //유저가 없으면
  } else {
    greetingText(currentUser); //유저가 있으면
  }
}

//기능 : 이름묻는 폼 보이기
function askForName() {
  form.classList.add(SHOWING_CN); // 이름묻는 폼 보이기 .showing(display: block;)추가
  form.addEventListener("submit", handleSubmit); //이벤트 : 폼을 submit하면
}

//기능 : 폼을 submit하면
function handleSubmit(event) {
  event.preventDefault(); //기본이벤트 금지
  //새로고침해도 입력값이 그대로 유지되도록

  const currentValue = input.value; //입력값

  greetingText(currentValue); //입력값으로 안녕@@아 보이기
  saveName(currentValue); //입력값으로 로컬스토리지에 이름 저장
}

//기능 : 안녕 @@아
function greetingText(text) {
  form.classList.remove(SHOWING_CN); // 이름묻기폼 숨기기 .showing(display: block;)삭제
  greeting.classList.add(SHOWING_CN); // 안녕@@아 보이기 .showing(display: block;) 추가
  greeting.innerText = `Hello! ${text}`; //안녕 @@아 <- 보여줄 문구
}

//기능 : 로컬스토리지에 이름 저장
function saveName(text) {
  localStorage.setItem(USER_LS, text);
}

function init() {
  loadName();
}

init();
