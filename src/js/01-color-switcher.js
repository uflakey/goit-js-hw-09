const btnStart = document.querySelector('[data-start]');
const btnStop = document.querySelector('[data-stop]');
let changeColorId;

btnStart.addEventListener('click', onStart);
btnStop.addEventListener('click', onStop);

btnStop.disabled = true;

function onStart(event) {
  btnStart.disabled = true;
  btnStop.disabled = false;
  changeColorId = setInterval(() => {
    document.body.style.backgroundColor = getRandomHexColor();
  }, 1000);
}

function onStop(event) {
  btnStart.disabled = false;
  btnStop.disabled = true;
  clearInterval(changeColorId);
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}
