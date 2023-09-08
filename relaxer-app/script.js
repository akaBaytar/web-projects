//dom variables
const container = document.querySelector(".container");
const text = document.querySelector(".text");
const pointer = document.querySelector(".pointer-container");

//variables
let total = 7500;
let breathe = (total / 5) * 2;
let hold = total / 5;
let timer = total / 4;

//functions
function letsStart() {
  text.style.fontSize = "1.5rem";
  text.innerText = "Breathe In";
  container.className = "container grow";
  pointer.className = "pointer-container start";
  setTimeout(() => {
    text.innerText = "Hold";
    setTimeout(() => {
      text.innerText = "Breathe out";
      container.className = "container shrink";
    }, hold);
  }, breathe);
}

function countDown() {
  setTimeout(() => {
    text.style.fontSize = "5rem";
    text.innerText = "3";
    setTimeout(() => {
      text.innerText = "2";
      setTimeout(() => {
        text.innerText = "1";
      }, timer);
    }, timer);
  }, timer);
}

//function call
setInterval(letsStart, total);
setTimeout(countDown, 500);
