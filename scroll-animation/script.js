//dom variables
const searchDOM = document.querySelector("#search");
const commentsDOM = document.querySelector(".comments");
const loadingDOM = document.querySelector(".scroll-circles");
const buttonDOM = document.querySelector("button");

//variables
let limit = 6;
let page = 1;

//fecth
async function getComments() {
  const URL = `https://jsonplaceholder.typicode.com/comments?_limit=${limit}&_page=${page}`;
  const response = await fetch(URL);
  const data = await response.json();
  return data;
}

//functions
async function showComments() {
  const comments = await getComments();
  comments.forEach((comment) => {
    const commentDOM = document.createElement("div");
    commentDOM.classList.add("comment");
    commentDOM.innerHTML = `
        <h4 class="comment-title">
            ${comment.name.charAt(0).toUpperCase() + comment.name.slice(1)}
        </h4>
        <small class="user-mail">
            ${comment.email.charAt(0).toLowerCase() + comment.email.slice(1)}
        </small>
        <p class="comment-text">${comment.body}</p>
        <span class="comment-id">${comment.id}</span>
    `;
    commentsDOM.appendChild(commentDOM);
  });
}

function loadingAnimation() {
  loadingDOM.classList.add("loading");
  setTimeout(() => {
    loadingDOM.classList.remove("loading");
  }, 800);
  setTimeout(() => {
    page++;
    showComments();
  }, 1000);
}

function filterComment(e) {
  const search = e.target.value.trim().toLowerCase();
  const comments = document.querySelectorAll(".comment");

  comments.forEach((comment) => {
    const text = comment.querySelector(".comment-text").innerText.toLowerCase();
    const title = comment
      .querySelector(".comment-title")
      .innerText.toLowerCase();

    if (text.includes(search) || title.includes(search)) {
      comment.style.display = "block";
    } else {
      comment.style.display = "none";
    }
  });
}

function scrollUp() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}

//event listener
window.addEventListener("scroll", () => {
  const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
  if (scrollTop + clientHeight >= scrollHeight - 1) {
    loadingAnimation();
  }
});

document.addEventListener("scroll", () => {
  if (window.scrollY > 200) {
    buttonDOM.classList.add("show");
    buttonDOM.addEventListener("click", scrollUp);
  } else {
    buttonDOM.classList.remove("show");
  }
});

searchDOM.addEventListener("input", filterComment);

//call function
showComments();
