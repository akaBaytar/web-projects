//dom variables
const formDOM = document.querySelector(".search-form");
const inputDOM = document.querySelector("#search");
const containerDOM = document.querySelector(".container");
const paginationDOM = document.querySelector(".pagination");

//variables
const URL = "https://api.lyrics.ovh";

//fetch
async function searchSongs(term) {
  const res = await fetch(`${URL}/suggest/${term}`);
  const data = await res.json();

  showSongs(data);
}

//functions
function showSongs(data) {
  containerDOM.innerHTML = `
    <ul class="song-list">
    ${data.data
      .map(
        (song) =>
          ` <li class="list-item">
                <img src="${song.album.cover}" alt="${song.title}" />
                <small>${song.artist.name}</small>
                <strong>${song.title}</strong>
                <button data-title="${song.title}" data-artist="${song.artist.name}">
                    Get Lyrics
                </button>  
            </li>`
      )
      .join("")}
    </ul>`;

  if (data.prev || data.next) {
    paginationDOM.innerHTML = `
        ${
          data.prev
            ? `<button onclick="getMoreSongs('${data.prev}')"> Prev </button>`
            : `<button disabled="disabled"> Prev </button>`
        }
        ${
          data.next
            ? `<button onclick="getMoreSongs('${data.next}')"> Next </button>`
            : `<button disabled="disabled"> Next </button>`
        }`;
  }
}

async function getMoreSongs(url) {
  const res = await fetch(`https://cors-anywhere.herokuapp.com/${url}`);
  const data = await res.json();

  showSongs(data);
}

async function getLyrics(artist, title) {
  const res = await fetch(`${URL}/v1/${artist}/${title}`);
  const data = await res.json();

  const lyrics = data.lyrics.replace(/\r\n|\r|\n/g, "<br />");

  containerDOM.innerHTML = lyrics;
  paginationDOM.innerHTML = "";
}

//event listeners
formDOM.addEventListener("submit", (e) => {
  e.preventDefault();

  let search = inputDOM.value.trim().toLowerCase();

  if (search) {
    searchSongs(search);
  }
});

containerDOM.addEventListener("click", (e) => {
  const listItem = e.target;

  if (listItem.tagName === "BUTTON") {
    let artist = listItem.getAttribute("data-artist");
    let title = listItem.getAttribute("data-title");

    getLyrics(artist, title);
  }
});
