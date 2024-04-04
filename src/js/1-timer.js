import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const input = document.querySelector("#datetime-picker");
const startBtn = document.querySelector("[data-start]");
const days = document.querySelector("[data-days]");
const hours = document.querySelector("[data-hours]");
const minutes = document.querySelector("[data-minutes]");
const seconds = document.querySelector("[data-seconds]");

let usersData = null;
let timer = null;
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    usersData = selectedDates[0];
    checkCorrectData();
  },
};
flatpickr(input, options);

function checkCorrectData() {
  if (!usersData || usersData <= new Date()) {
    iziToast.error({
      title: 'Error',
      message: 'Please choose a date in the future',
      position: 'topRight',
    });
    startBtn.disabled = true;
  } else {
    startBtn.disabled = false;
    iziToast.success({
      title: 'Success',
      message: 'It is correct date',
      position: 'topRight',
    });
  }
}

function refreshTimer() {
  const now = new Date();
  const timeDelta = usersData - now;
  if (timeDelta <= 0) {
    clearInterval(timer); 
    days.textContent = '00';
    hours.textContent = '00';
    minutes.textContent = '00';
    seconds.textContent = '00';
    return;
  }
  const timerDate = convertMs(timeDelta);
  days.textContent = timerDate.days;
  hours.textContent = timerDate.hours;
  minutes.textContent = timerDate.minutes;
  seconds.textContent = timerDate.seconds;
}

startBtn.addEventListener("click", e => {
  startBtn.disabled = true;
  input.disabled = true;
  refreshTimer();
  timer = setInterval(refreshTimer, 1000); 
});
document.addEventListener("DOMContentLoaded", function () {
  startBtn.disabled = true;
});

function convertMs(ms) {

  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;


  const days = prependZero(Math.floor(ms / day));
  
  const hours = prependZero(Math.floor((ms % day) / hour));

  const minutes = prependZero( Math.floor(((ms % day) % hour) / minute));
  
  const seconds = prependZero(Math.floor((((ms % day) % hour) % minute) / second));

  return { days, hours, minutes, seconds };
}

function prependZero(value) {
  return value.toString().padStart(2, "0");
}