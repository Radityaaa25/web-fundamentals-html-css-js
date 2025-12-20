const minutesE1 = document.getElementById("minutes");
const secondsE1 = document.getElementById("seconds");

const startBtn = document.getElementById("start-btn");
const pauseBtn = document.getElementById("pause-btn");
const resetBtn = document.getElementById("reset-btn");

const workBtn = document.getElementById("work-btn");
const breakBtn = document.getElementById("break-btn");

let totalSeconds = 25 * 60;
let timeInterval = null;

const WORK_TIME = 25 * 60;
const BREAK_TIME = 5 * 60;

function updateDisplay() {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  
  minutesE1.textContent = minutes;
  secondsE1.textContent = seconds < 10 ? "0" + seconds: seconds;
}

function startTimer(){
  if(timeInterval !== null) return;

  timeInterval = setInterval(() => {
    if (totalSeconds <= 0) {
      clearInterval(timeInterval);
      timeInterval = null;
      return;
    }

    totalSeconds--;
    updateDisplay();
  }, 1000);
}

function pauseTimer() {
  clearInterval(timeInterval);
  timeInterval = null;
}

function resetTimer() {
  pauseTimer();
  totalSeconds = 25 * 60;
  updateDisplay();
}

startBtn.addEventListener("click", startTimer);
pauseBtn.addEventListener("click", pauseTimer);
resetBtn.addEventListener("click", resetTimer);

updateDisplay();

function setWorkMode() {
  clearInterval(timeInterval);
  timeInterval = null;

  totalSeconds = WORK_TIME;
  updateDisplay();

  workBtn.classList.add("active");
  breakBtn.classList.remove("active");
}

workBtn.addEventListener("click", setWorkMode);
breakBtn.addEventListener("click", setWorkMode);