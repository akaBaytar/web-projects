//dom variables
const yearDOM = document.querySelector(".year");
const daysDOM = document.querySelector("#days");
const hoursDOM = document.querySelector("#hours");
const minutesDOM = document.querySelector("#minutes");
const secondsDOM = document.querySelector("#seconds");

const container = document.querySelector(".container");
const spinner = document.querySelector(".spinner");

//variables
const currentYear = new Date().getFullYear();
const nextYear = new Date(`January 01 ${currentYear + 1} 00:00:00`);

yearDOM.innerText = currentYear + 1;

//functions
function updateCountDown() {
  let now = new Date();
  let diff = nextYear - now;
  let days = Math.floor(diff / 1000 / 60 / 60 / 24);
  let hours = Math.floor(diff / 1000 / 60 / 60) % 24;
  let minutes = Math.floor(diff / 1000 / 60) % 60;
  let seconds = Math.floor(diff / 1000) % 60;

  daysDOM.innerText = days;
  hoursDOM.innerText = hours < 10 ? "0" + hours : hours;
  minutesDOM.innerText = minutes < 10 ? "0" + minutes : minutes;
  secondsDOM.innerText = seconds < 10 ? "0" + seconds : seconds;
}

//function call
setInterval(updateCountDown, 1000);
setTimeout(() => {
  spinner.remove();
  container.style.display = "flex";
}, 1000);
