//typing game
import words from "./words.js";
//elements
const text = document.querySelector(".text");
const input = document.querySelector(".input");
const scoreEl = document.querySelector(".score");
const tiemEl = document.querySelector(".time .time-secund");
const timeMinEl = document.querySelector(".time .time-minute");
const scoreModal = document.querySelector(".scoreModal");
const overlayEl = document.querySelector(".overlay");
const restartBtn = document.querySelector(".restartBtn");
const select = document.querySelector(".select");
const level = document.querySelector(".level");
//random words
//
let random;
const randomWords = () => {
  random = words[Math.floor(Math.random() * words.length)];
  text.textContent = random;
};
randomWords();
//time
let time = 5;
let minute = Math.trunc(time / 60);
const timetextFn = () => {
  tiemEl.textContent = time < 10 ? "0" + time : time;
  timeMinEl.textContent = time > 59 ? "Time: " + minute : "Time: 00";
};

//score
let scoer = 0;
//input value
input.addEventListener("input", (e) => {
  let inpValue = e.target.value.toLowerCase();
  if (inpValue.length !== random.length) {
    return;
  } else {
  }
  if (inpValue === random) {
    scoer++;
    e.target.value = "";
    input.style.outline = "3px solid green";
    scoreEl.textContent = "Ball: " + scoer;
    minute = Math.trunc(time / 60);
    randomWords();
    if (select.value == "easy") {
      time += 5;
      level.textContent = "Level: easy";
    } else if (select.value == "medium") {
      time += 3;
      level.textContent = "Level: medium";
    } else if (select.value == "hard") {
      time += 2;
      level.textContent = "Level: hard";
    }

    ///
  } else {
    input.style.outline = "3px solid red";
    if (time !== 0) {
      if (time > 0) {
        time -= 2;
      } else {
        time = 0;
      }
      tiemEl.textContent = time < 10 ? "0" + time : time;
    }
  }
});

//Interval time
const timeFn = () => {
  let intervalTime = setInterval(() => {
    if (time > 0) {
      time--;
      minute = Math.round(time / 60);
      timeMinEl.textContent = time > 59 ? "Time: " + minute : "Time: 00";
    } else {
      time = 0;
      overlayEl.classList.remove("hidden");
      scoreModal.textContent = "Yig'ilgan Ball: " + scoer;
      select.classList.remove("hidden");
      clearInterval(intervalTime);
    }
    tiemEl.textContent = time < 10 ? "0" + time : time;
    timeMinEl.textContent = time > 59 ? "Time: " + minute : "Time: 00";
  }, 1000);
};
timeFn();
// restartFn
restartBtn.addEventListener("click", () => {
  time = 5;
  scoer = 0;
  randomWords();
  timetextFn();
  timeFn();
  overlayEl.classList.add("hidden");
  scoreEl.textContent = "Ball: " + scoer;
  input.focus();
  input.style.outline = "3px solid #123456";
  input.value = "";
});
