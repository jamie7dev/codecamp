const messageContainer = document.querySelector("#d-day-message");
const container = document.querySelector("#d-day-container");
const savedDate = localStorage.getItem("saved-date");
const intervalIdArr = [];

container.style.display = "none";
messageContainer.innerHTML = "<h3>D-Day를 입력해주세요.</h3>";

const dateFormMaker = function () {
  const inputYear = document.querySelector("#target-year-input").value;
  const inputMonth = document.querySelector("#target-month-input").value;
  const inputDate = document.querySelector("#target-date-input").value;

  const dateFormat = `${inputYear}-${inputMonth}-${inputDate}`;
  return dateFormat;
};

// 선언문으로 작성된 함수는 호이스팅 적용됨 (위로 끌어올려진 것처럼 동작) => 의도하지 않은 동작 가능, 예측 어려움
// 표현식은 함수 선언되기 이전에 호출되면 에러 => 주로 이렇게 사용하자
// 화살표 함수: method 내에서 함수 써야 하는 경우 많이 사용

const counterMaker = function (data) {
  if (data !== savedDate) {
    localStorage.setItem("saved-date", data);
  }

  const nowDate = new Date();
  const targetDate = new Date(data).setHours(0, 0, 0, 0); // 자정 기준
  const remaining = (targetDate - nowDate) / 1000;

  if (remaining <= 0) {
    // 만약 remaining이 0이라면, 타이머가 종료되었습니다. 출력
    container.style.display = "none";
    messageContainer.innerHTML = "<h3>타이머가 종료되었습니다.</h3>";
    messageContainer.style.display = "flex";
    setclearInterval();
    return;
  } else if (isNaN(remaining)) {
    // 만약 잘못된 날짜가 들어왔다면, 유효한 시간대가 아닙니다. 출력
    container.style.display = "none";
    messageContainer.innerHTML = "<h3>유효한 시간대가 아닙니다.</h3>";
    messageContainer.style.display = "flex";
    setclearInterval();
    return;
  }

  const remainingObj = {
    remainingDate: Math.floor(remaining / 3600 / 24),
    remainingHours: Math.floor(remaining / 3600) % 24,
    remainingMin: Math.floor(remaining / 60) % 60,
    remainingSec: Math.floor(remaining) % 60,
  };
  const documentArr = ["days", "hours", "min", "sec"];
  const timeKeys = Object.keys(remainingObj);

  const format = function (time) {
    // 매개변수 받아서 10초 이하일 때 '09'로 표현
    if (time < 10) {
      return "0" + time;
    } else {
      return time;
    }
  };

  let i = 0;
  for (let tag of documentArr) {
    const remainingTime = format(remainingObj[timeKeys[i]]);
    document.getElementById(tag).textContent = remainingTime;
    i++;
  }
};

const starter = function (targetDateInput) {
  if (!targetDateInput) {
    targetDateInput = dateFormMaker();
  }

  container.style.display = "flex";
  messageContainer.style.display = "none";
  setclearInterval();
  counterMaker(targetDateInput); // setInterval은 지정된 시간 이후부터 실행되므로 최초 함수를 실행해야 함
  const intervalId = setInterval(() => counterMaker(targetDateInput), 1000);
  intervalIdArr.push(intervalId);
};

const setclearInterval = function () {
  localStorage.removeItem("saved-date");
  for (let i = 0; i < intervalIdArr.length; i++) {
    clearInterval(intervalIdArr[i]);
  }
};

const resetTimer = function () {
  container.style.display = "none";
  messageContainer.innerHTML = "<h3>D-Day를 입력해주세요.</h3>";
  messageContainer.style.display = "flex";
  setclearInterval();
};

if (savedDate) {
  starter(savedDate);
} else {
  container.style.display = "none";
  messageContainer.innerHTML = "<h3>D-Day를 입력해주세요.</h3>";
}
