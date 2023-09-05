//DOM variables
const balanceDOM = document.querySelector("#balance");
const incomeDOM = document.querySelector("#income");
const expenseDOM = document.querySelector("#expense");

const listDOM = document.querySelector(".transaction-list");

const formDOM = document.querySelector(".transaction-form");
const transactionDOM = document.querySelector("#transaction");
const amountDOM = document.querySelector("#amount");

//variables
let transactions = localStorage.getItem("transactions")
  ? JSON.parse(localStorage.getItem("transactions"))
  : [];

//functions
function addTransaction(transaction) {
  const sign = transaction.amount < 0 ? "-" : "+";
  const listItem = document.createElement("li");
  listItem.classList.add("list-item");
  listItem.classList.add(sign == "-" ? "minus" : "plus");
  listItem.innerHTML = `
        <p class="transaction">
            ${
              transaction.name.charAt(0).toUpperCase() +
              transaction.name.slice(1)
            }
        </p>
        <p class="amount">${sign}${Math.abs(transaction.amount)}</p>
        <button onclick="removeTransaction(${transaction.id})">
            <i class="bi bi-x"></i>
        </button>
    `;
  listDOM.appendChild(listItem);
}

function updateBalance() {
  const amounts = transactions.map((transaction) => transaction.amount);
  const balance = amounts.reduce((acc, amount) => (acc += amount), 0);
  const income = amounts
    .filter((amount) => amount > 0)
    .reduce((acc, amount) => (acc += amount), 0);
  const expense = amounts
    .filter((amount) => amount < 0)
    .reduce((acc, amount) => (acc += amount), 0);
  balanceDOM.innerHTML = `${balance.toFixed(2)}₺`;
  incomeDOM.innerHTML = `${income.toFixed(2)}₺`;
  expenseDOM.innerHTML = `${(expense * -1).toFixed(2)}₺`;
}

function addNewTransaction(e) {
  e.preventDefault();
  if (!transactionDOM.value == "" || !amountDOM.value == "") {
    const transaction = {
      id: getRandomID(),
      name: transactionDOM.value,
      amount: +amountDOM.value,
    };

    transactions.push(transaction);
    addTransaction(transaction);
    updateLocalStorage();
    updateBalance();

    transactionDOM.value = "";
    amountDOM.value = "";
  }
}

function getRandomID() {
  return Math.floor(Math.random() * 1000000);
}

function removeTransaction(id) {
  transactions = transactions.filter((transaction) => transaction.id !== id);
  updateLocalStorage();
  init();
}

function updateLocalStorage() {
  localStorage.setItem("transactions", JSON.stringify(transactions));
}

function init() {
  listDOM.innerHTML = "";
  transactions.forEach(addTransaction);
  updateBalance();
}

//function call
init();

//event listener
formDOM.addEventListener("submit", addNewTransaction);
