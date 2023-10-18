import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const startButton = document.querySelector('[data-start]');
startButton.disabled = true;
const datetimePicker = document.querySelector('#datetime-picker');
const daysElement = document.querySelector('[data-days]');
const hoursElement = document.querySelector('[data-hours]');
const minutesElement = document.querySelector('[data-minutes]');
const secondsElement = document.querySelector('[data-seconds]');

let counter;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const selectedDate = new Date(selectedDates[0]);
    if (selectedDate.getTime() > Date.now()) {
      startButton.disabled = false;
    } else {
      Notiflix.Notify.failure('Please choose a date in the future');
      startButton.disabled = true;
    }
  },
};

function timer(seconds) {
  clearInterval(counter);

  const now = Date.now();
  const then = now + seconds * 1000;

  counter = setInterval(() => {
    const secondsLeft = Math.round((then - Date.now()) / 1000);
    console.log(counter);
    if (secondsLeft < 0) {
      clearInterval(counter);
      return;
    }

    displayTimeLeft(secondsLeft);
  }, 1000);
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function displayTimeLeft(seconds) {
  const days = Math.floor(seconds / (3600 * 24));
  const hours = Math.floor((seconds % (3600 * 24)) / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  seconds = seconds % 60;

  daysElement.textContent = addLeadingZero(days);
  hoursElement.textContent = addLeadingZero(hours);
  minutesElement.textContent = addLeadingZero(minutes);
  secondsElement.textContent = addLeadingZero(seconds);
}

startButton.addEventListener('click', onStart);

function onStart(event) {
  const seconds =
    (new Date(datetimePicker.value).getTime() - Date.now()) / 1000;

  if (seconds > 0) {
    timer(seconds);
    startButton.disabled = true;
  }
}

flatpickr('#datetime-picker', options);
