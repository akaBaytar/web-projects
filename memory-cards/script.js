//DOM variables
const cardsContainerDOM = document.querySelector(".cards-container");
const currentDOM = document.querySelector(".current");

const prevButtonDOM = document.querySelector("#prev");
const nextButtonDOM = document.querySelector("#next");
const deleteButtonDOM = document.querySelector(".delete-card");
const addNewCardButtonDOM = document.querySelector(".add-card");

const newCardContainerDOM = document.querySelector(".new-card-container");
const newQuestionDOM = document.querySelector("#new-question");
const newAnswerDOM = document.querySelector("#new-answer");

const addCardButtonDOM = document.querySelector(".add-new-button");
const XButtonDOM = document.querySelector(".x-button");

const confirmContainerDOM = document.querySelector(".confirm-delete");
const yesButtonDOM = document.querySelector("#yes");
const noButtonDOM = document.querySelector("#no");

//variables
let current = 0;
const cardDOM = [];
const cardsData = getCards();

//functions
function createCards() {
  cardsData.forEach((data, index) => createCard(data, index));
}

function createCard(data, index) {
  const card = document.createElement("div");
  card.classList.add("card");
  if (index == 0) {
    card.classList.add("active");
  }
  card.innerHTML = `
    <div class="inner-card">
        <div class="front-face">
            <h4 class="question">${data.question}</h4>
        </div>
        <div class="back-face">
            <p class="answer">${data.answer}</p>
        </div>
    </div>
  `;
  cardDOM.push(card);
  cardsContainerDOM.appendChild(card);

  updateCurrent();
}

function updateCurrent() {
  currentDOM.innerHTML = `${current + 1} / ${cardDOM.length}`;
}

//local storage
function getCards() {
  const cards = JSON.parse(localStorage.getItem("cards"));
  return cards !== null ? cards : [];
}

function setCards(cards) {
  localStorage.setItem("cards", JSON.stringify(cards));
  window.location.reload();
}

//event listeners
cardsContainerDOM.addEventListener("click", () =>
  cardsContainerDOM.classList.toggle("show-answer")
);

nextButtonDOM.addEventListener("click", () => {
  cardDOM[current].className = "card left";
  current++;
  if (current > cardDOM.length - 1) {
    current = cardDOM.length - 1;
  }
  cardDOM[current].className = "card active";
  updateCurrent();
});

prevButtonDOM.addEventListener("click", () => {
  cardDOM[current].className = "card left";
  current--;
  if (current < 0) {
    current = 0;
  }
  cardDOM[current].className = "card active";
  updateCurrent();
});

addNewCardButtonDOM.addEventListener("click", () => {
  newCardContainerDOM.classList.add("show");
});

XButtonDOM.addEventListener("click", () =>
  newCardContainerDOM.classList.remove("show")
);

addCardButtonDOM.addEventListener("click", () => {
  const question = newQuestionDOM.value;
  const answer = newAnswerDOM.value;

  if (question.trim() && answer.trim()) {
    const newCard = { question, answer };
    createCard(newCard);

    newQuestionDOM.value = "";
    newAnswerDOM.value = "";

    newCardContainerDOM.classList.remove("show");

    cardsData.push(newCard);
    setCards(cardsData);
  }
});

deleteButtonDOM.addEventListener("click", () => {
  confirmContainerDOM.classList.add("show");
});

yesButtonDOM.addEventListener("click", () => {
  localStorage.clear();
  cardsContainerDOM.innerHTML = "";
  window.location.reload();
});

noButtonDOM.addEventListener("click", () =>
  confirmContainerDOM.classList.remove("show")
);

//function call
createCards();
