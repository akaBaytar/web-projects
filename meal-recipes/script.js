//dom variables
const formDOM = document.querySelector("#search-form");
const searchDOM = document.querySelector("#search");
const searchButtomDOM = document.querySelector("#search-button");
const randomButtonDOM = document.querySelector("#random-button");
const resultTitleDOM = document.querySelector(".result-title");
const resultsDOM = document.querySelector(".results");
const mealModalDOM = document.querySelector(".modal-details");
const mealDetailsDOM = document.querySelector(".container-details");

//functions
async function searchMeal(e) {
  e.preventDefault();

  resultsDOM.innerHTML = "";
  resultTitleDOM.innerHTML = "";
  mealModalDOM.style.display = "none";
  mealDetailsDOM.style.display = "none";

  const search = searchDOM.value.trim().toLowerCase();
  const URL = `https://www.themealdb.com/api/json/v1/1/search.php?s=${search}`;

  if (search) {
    const res = await fetch(URL);
    const data = await res.json();

    resultTitleDOM.innerHTML = `Results for <span>"${search}"</span>`;
    if (data.meals === null) {
      resultTitleDOM.innerHTML = `<strong>There no search result.</strong>`;
    } else {
      resultsDOM.innerHTML = data.meals
        .map(
          (meal) =>
            `
          <div class="meal">
            <strong class="meal-name" data-id="${meal.idMeal}">${meal.strMeal}</strong>
            <img src="${meal.strMealThumb}" alt="${meal.strMeal}" />
          </div>
          `
        )
        .join("");
    }
  }
  searchDOM.value = "";
}

async function getMealDetail(id) {
  const URL = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
  const res = await fetch(URL);
  const data = await res.json();

  const meal = data.meals[0];
  showMeal(meal);
}

async function getRandomMeal() {
  const URL = `https://www.themealdb.com/api/json/v1/1/random.php`;
  const res = await fetch(URL);
  const data = await res.json();

  const meal = data.meals[0];
  showMeal(meal);
}

function showMeal(meal) {
  const ingredients = [];

  for (i = 1; i <= 20; i++) {
    if (meal[`strIngredient${i}`]) {
      ingredients.push(
        `${meal[`strMeasure${i}`]} - ${meal[`strIngredient${i}`]}`
      );
    } else {
      break;
    }
  }

  mealModalDOM.style.display = "flex";
  mealDetailsDOM.style.display = "flex";
  mealDetailsDOM.innerHTML = `
    <div class="meal-details">
      <button id="close-button"><i class="bi bi-x-lg"></i></button>
      <h2 class="meal-title">${meal.strMeal}</h2>
      <img src="${meal.strMealThumb}" alt="${meal.strMeal}" />
      <div class="meal-info">
        ${
          meal.strCategory
            ? `<p><strong>Category: </strong>${meal.strCategory}</p>`
            : ""
        }
        ${
          meal.strArea ? `<p><strong>Region: </strong> ${meal.strArea}</p>` : ""
        }
      </div>
      <div class="instructions">
        <p>${meal.strInstructions}</p>
        <h4>Ingredients</h4>
          <ul>
            ${ingredients
              .map((ingredient) => `<li>${ingredient}</li>`)
              .join("")}
          </ul>
      </div>
    </div>
  `;

  const closeButton = mealDetailsDOM.querySelector("#close-button");
  window.addEventListener("click", (e) => {
    if (!e.composedPath().includes(mealDetailsDOM)) {
      mealModalDOM.style.display = "none";
    } else if (e.composedPath().includes(closeButton)) {
      mealModalDOM.style.display = "none";
    }
  });
}

//event listeners
formDOM.addEventListener("submit", searchMeal);

resultsDOM.addEventListener("click", (e) => {
  if (e.target.classList.contains("meal-name")) {
    const mealID = e.target.getAttribute("data-id");
    getMealDetail(mealID);
  }
});

randomButtonDOM.addEventListener("click", getRandomMeal);
