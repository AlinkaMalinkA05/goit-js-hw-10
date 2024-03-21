import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const input = document.querySelector("#datetime-picker");
const startBtn = document.querySelector("[data-start]");
const timer = document.querySelectorAll(".timer.value");

let usersData = null;
let currentDate = null;
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    usersData = selectedDates[0];
    checkCorrectData()
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
function prependZero(value) {
  return value < 10 ? '0' + value : value;
}
function refreshTimer() {
  const now = new Date();
  const timeDelta = usersData - now;
  if (timeDelta <= 0) {
    clearInterval(currentDate);
    
    timer.forEach(element => (element.textContent = '00'));
    return;
  }
  const { days, hours, minutes, seconds } = convertMs(timeDelta);
  timer[0].textContent = prependZero(days);
  timer[1].textContent = prependZero(hours);
  timer[2].textContent = prependZero(minutes);
  timer[3].textContent = prependZero(seconds);
}

startBtn.addEventListener("click", e => {
  startBtn.disabled = true;
  input.disabled = true;
  refreshTimer();
  currentDate = setInterval(refreshTimer, 1000)
});
document.addEventListener("DOMContentLoaded", function () {
  startBtn.disabled = true;
});
function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}
