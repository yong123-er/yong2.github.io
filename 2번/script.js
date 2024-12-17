const textContainer = document.getElementById("textContainer");

// 원본 텍스트
const originalText = `
우린 불안 때문에 삶을 규칙적으로 만든다. 면밀하게 계획을 세우고 그 계획에 삶을 맞춘다.
우리는 삶을 반복적이고 규칙적으로 움직이게 해서 가장 효율적인 시스템이 우리의 삶을 지배하게 만든다.
습관과 규칙의 힘으로 살아가는 삶 말이다. 하지만 효율적인 삶이라니 그런 삶이 세상에 있을까.
혹시 효율적인 삶이라는 건 늘 똑같이 살고 있기 때문에 죽기 전에 기억할 만한 멋진 날이 몇 개 되지 않는 삶을 말하는 것은 아닐까.
`;

// 상태별 텍스트 처리
const sanitizedText = originalText.replace(/\s+/g, ''); // 띄어쓰기 제거
const textChunks = {
  original: originalText.split(' '), // 띄어쓰기 유지
  fourChar: sanitizedText.match(/.{1,4}/g), // 4글자씩 나누기
  twoChar: sanitizedText.match(/.{1,2}/g), // 2글자씩 나누기
};

// 현재 상태 관리
let stateIndex = 0;
const states = ['original', 'fourChar', 'twoChar'];
let textIndex = 0; // 현재 출력 중인 문장의 위치

// 텍스트 추가 함수
function appendText() {
  const textArray = textChunks[states[stateIndex]]; // 현재 상태의 텍스트 배열
  const word = textArray[textIndex] + (stateIndex === 0 ? ' ' : '\n'); // 띄어쓰기 처리
  const span = document.createElement("span");
  span.textContent = word;
  textContainer.appendChild(span);

  // 텍스트 위치 증가
  textIndex++;
  if (textIndex >= textArray.length) textIndex = 0; // 문장 끝나면 처음으로

  // 스크롤 하단으로 이동
  textContainer.scrollTop = textContainer.scrollHeight;

  // 무한 반복
  setTimeout(appendText, 200); // 0.2초 간격으로 텍스트 추가
}

// 클릭 이벤트로 상태 변경
document.body.addEventListener("click", () => {
  stateIndex = (stateIndex + 1) % states.length; // 상태 순환
  textIndex = 0; // 문장 시작 위치 초기화
  textContainer.textContent = ""; // 기존 텍스트 초기화
  appendText(); // 새 상태로 다시 시작
});

// 초기 실행
appendText();
