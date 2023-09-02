//dom variables
const currencyFromDOM = document.querySelector("#currency1");
const currencyToDOM = document.querySelector("#currency2");

const amountFromDOM = document.querySelector("#amount1");
const amountToDOM = document.querySelector("#amount2");

const rateDOM = document.querySelector(".rate");
const button = document.querySelector(".swap-button");

//fetch api
async function calculate() {
  const url = `https://v6.exchangerate-api.com/v6/6f48b3779220f9f01938034c/latest/${currencyFromDOM.value}`;
  const res = await fetch(url);
  const data = await res.json();

  const rates = data.conversion_rates[currencyToDOM.value];
  rateDOM.innerText = `1 ${currencyFromDOM.value} = ${rates} ${currencyToDOM.value}`;

  amountToDOM.value = (amountFromDOM.value * rates).toFixed(2);
}

//event listeners
currencyFromDOM.addEventListener("change", calculate);
currencyToDOM.addEventListener("change", calculate);

amountFromDOM.addEventListener("input", calculate);
amountToDOM.addEventListener("input", calculate);

button.addEventListener("click", () => {
  let tempCurrency = currencyFromDOM.value;
  currencyFromDOM.value = currencyToDOM.value;
  currencyToDOM.value = tempCurrency;
  calculate();
});

//call function
calculate();
