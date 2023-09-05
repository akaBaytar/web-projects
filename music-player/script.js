//dom variables
const containerDOM = document.querySelector(".container");
const titleDOM = document.querySelector(".music-title");
const progressBarDOM = document.querySelector(".progress-bar");
const progressDOM = document.querySelector(".progress");
const musicDOM = document.querySelector("#music");
const coverDOM = document.querySelector("#cover");

const prevButton = document.querySelector("#prev");
const playButton = document.querySelector("#play");
const nextButton = document.querySelector("#next");

//variables
let songs = [
  "blast",
  "deep-future-garage",
  "inside-you",
  "into-the-night",
  "king-around-here",
  "lifelike",
  "lofi-study",
  "price-of-freedom",
  "the-blackest-bouquet",
  "tokyo-cafe",
];

let i = 0;

//functions
function updateDetails(song) {
  titleDOM.innerText =
    song.charAt(0).toUpperCase() + song.slice(1).replaceAll("-", " ");
  musicDOM.src = `./sound/${song}.mp3`;
  coverDOM.src = `./img/${song}.png`;
}
updateDetails(songs[i]);

function playSong() {
  musicDOM.play();
  containerDOM.classList.add("play");
  playButton.querySelector(".bi").classList.remove("bi-play-fill");
  playButton.querySelector(".bi").classList.add("bi-pause");
}

function pauseSong() {
  musicDOM.pause();
  containerDOM.classList.remove("play");
  playButton.querySelector(".bi").classList.remove("bi-pause");
  playButton.querySelector(".bi").classList.add("bi-play-fill");
}

function prevSong() {
  i--;
  if (i < 0) {
    i = songs.length - 1;
  }
  updateDetails(songs[i]);
  playSong();
}

function nextSong() {
  i++;
  if (i > songs.length - 1) {
    i = 0;
  }
  updateDetails(songs[i]);
  playSong();
}

function updateProgress(e) {
  const { currentTime, duration } = e.srcElement;
  const progress = (currentTime / duration) * 100;
  progressDOM.style.width = `${progress}%`;
}

function setProgress(e) {
  const total = this.clientWidth;
  const click = e.offsetX;
  const { duration } = musicDOM;

  musicDOM.currentTime = (click / total) * duration;
}

//event listeners
playButton.addEventListener("click", () => {
  const play = containerDOM.classList.contains("play");
  if (play) {
    pauseSong();
  } else {
    playSong();
  }
});

prevButton.addEventListener("click", prevSong);
nextButton.addEventListener("click", nextSong);

musicDOM.addEventListener("ended", nextSong);

musicDOM.addEventListener("timeupdate", updateProgress);
progressBarDOM.addEventListener("click", setProgress);
