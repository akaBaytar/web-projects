//dom variables
const container = document.querySelector(".seats-and-screen");
const ticketDOM = document.querySelector("#ticket");
const seats = document.querySelectorAll(".seat-row .seat:not(.occupied)");
const totalSeat = document.querySelector(".total-seat");
const totalPrice = document.querySelector(".total");

getData();

//variables
let price = +ticketDOM.value;

//functions
function updateShowcase() {
  const selectedSeats = document.querySelectorAll(".seat-row .seat.selected");
  const seatsIndex = [...selectedSeats].map((i) => [...seats].indexOf(i));
  const selectedSeatsCount = selectedSeats.length;

  localStorage.setItem("selectedSeats", JSON.stringify(seatsIndex));

  totalSeat.innerText = selectedSeatsCount;
  totalPrice.innerText = selectedSeatsCount * price;
}

//local  storage
function setData(index, price) {
  localStorage.setItem("selectedMovieIndex", index);
  localStorage.setItem("selectedMoviePrice", price);
}

function getData() {
  const selectedSeats = JSON.parse(localStorage.getItem("selectedSeats"));
  if (selectedSeats) {
    seats.forEach((seat, index) => {
      if (selectedSeats.indexOf(index) > -1) {
        seat.classList.add("selected");
      }
    });
  }

  const selectedMovieIndex = localStorage.getItem("selectedMovieIndex");
  if (selectedMovieIndex) {
    ticketDOM.selectedIndex = selectedMovieIndex;
  }
}

//event listeners
container.addEventListener("click", (e) => {
  if (
    e.target.classList.contains("seat") &&
    !e.target.classList.contains("occupied")
  ) {
    e.target.classList.toggle("selected");
  }

  updateShowcase();
});

ticketDOM.addEventListener("change", (e) => {
  price = +e.target.value;
  setData(e.target.selectedIndex, e.target.value);

  updateShowcase();
});

updateShowcase();
