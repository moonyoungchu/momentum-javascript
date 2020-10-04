const toDoForm = document.querySelector(".js-toDoForm");
const toDoInput = toDoForm.querySelector("input");
const toDoList = document.querySelector(".js-toDoList");

const TODOS_LS = "toDosArray";
let toDosArray = []; //array / let : 변수 재할당 가능

//기능 : 로컬스토리지에서 투두항목 가져오기
function loadToDo() {
  const loadedToDos = localStorage.getItem(TODOS_LS);

  if (loadedToDos !== null) {
    //빈값이 아니라면
    const parsedToDos = JSON.parse(loadedToDos); //로컬스토리지 항목 하나하나

    parsedToDos.forEach(function (toDo) {
      //each : array에 담겨 있는 것들 각각 한번씩 함수를 실행시켜줌
      makeToDo(toDo.text);
    });
  }
}

// 기능 : 투두리스트에 적기
function makeToDo(text) {
  //html요소 추가
  const li = document.createElement("li");
  const span = document.createElement("span");
  const newId = toDosArray.length + 1;
  const delBtn = document.createElement("button");

  //지우기버튼
  delBtn.innerText = "❌"; //버튼모양
  delBtn.addEventListener("click", deleteToDo);

  //투두 text
  span.innerText = text;
  li.appendChild(span); //appendChild : 선택한 요소 안에 자식 요소를 추가
  li.appendChild(delBtn);
  li.id = newId;
  toDoList.appendChild(li);
  const toDoObj = {
    text: text,
    id: newId,
  };
  toDosArray.push(toDoObj); // let toDosArray = [];에 push
  saveToDo(); //push한 후에 호출해야함
}

// 기능: 로컬스토리지에 투두항목 저장
function saveToDo() {
  localStorage.setItem(TODOS_LS, JSON.stringify(toDosArray));
  //JSON.stringify : 자바스크립트 object를 string으로 바꿔준다.
}

//기능 : 투두항목 지우기
function deleteToDo(event) {
  //console.dir(event.target.parentNode); // 어떤 todo가 삭제되었는지 알 수 있음

  const btn = event.target;
  const li = btn.parentNode;
  toDoList.removeChild(li);

  const cleanToDos = toDosArray.filter(function (toDo) {
    return toDo.id !== parseInt(li.id);
  });
  toDosArray = cleanToDos;
  saveToDo();
}

//기능: 폼을 submit 하면
function handleSubmit(event) {
  event.preventDefault(); //기본이벤트 금지
  const currentValue = toDoInput.value;
  makeToDo(currentValue); //입력값으로 makeToDo함수 실행
  toDoInput.value = ""; //엔터치면 submit
}

function init() {
  loadToDo();
  toDoForm.addEventListener("submit", handleSubmit); //이벤트 : 폼을 submit하면
}

init();
