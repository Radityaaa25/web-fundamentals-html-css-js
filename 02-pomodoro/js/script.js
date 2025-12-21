const WORK_TIME = 25 * 60;
const BREAK_TIME = 5 * 60;

let totalSeconds = WORK_TIME;
let timerInterval = null;
let isRunning = false;

const minutesDisplay = document.getElementById("minutes");
const secondsDisplay = document.getElementById("seconds");
const startBtn = document.getElementById("start-btn");
const pauseBtn = document.getElementById("pause-btn");
const resetBtn = document.getElementById("reset-btn");
const workBtn = document.getElementById("work-btn");
const breakBtn = document.getElementById("break-btn");

const alarmSound = document.getElementById("alarm-sound")

function updateDisplay() {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  minutesDisplay.textContent = minutes.toString().padStart(2, "0");
  secondsDisplay.textContent = seconds.toString().padStart(2, "0");
}

function startTimer() {
  if (timerInterval !== null) return;
  
  isRunning = true;
  startBtn.style.display = "none";
  pauseBtn.style.display = "inline-block";

  timerInterval = setInterval(() => {
    if (totalSeconds > 0) {
      totalSeconds--;
      updateDisplay();
    } else {
      clearInterval(timerInterval);
      timerInterval = null;
      isRunning = false;
      
      alarmSound.play();
      
      setTimeout(() => {
        alert("Waktu Habis!! Istirahat atau mulai kerja lagi.");
      }, 5000);

      resetTimer();
    }
  }, 1000);
}

function pauseTimer() {
  clearInterval(timerInterval);
  timerInterval = null;
  isRunning = false;

  pauseBtn.style.display = "none";
  startBtn.style.display = "inline-block";
}

function resetTimer() {
  pauseTimer();

  if (workBtn.classList.contains('active')) {
    totalSeconds = WORK_TIME;
  } else {
    totalSeconds = BREAK_TIME;
  }

  updateDisplay();
}

function setWorkMode() {
  pauseTimer();
  totalSeconds = WORK_TIME;
  updateDisplay();

  workBtn.classList.add("active");
  breakBtn.classList.remove("active");
}

function setBreakMode() {
  pauseTimer();
  totalSeconds = BREAK_TIME;
  updateDisplay();

  breakBtn.classList.add("active");
  workBtn.classList.remove("active");
}

updateDisplay();

startBtn.addEventListener("click", startTimer);
pauseBtn.addEventListener("click", pauseTimer);
resetBtn.addEventListener("click", resetTimer);

workBtn.addEventListener("click", setWorkMode);

breakBtn.addEventListener("click", setBreakMode);