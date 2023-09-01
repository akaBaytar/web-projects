// dom variables
const form = document.querySelector("form");
const username = document.querySelector("#username");
const email = document.querySelector("#email");
const password = document.querySelector("#password");
const password2 = document.querySelector("#password2");
const button = document.querySelector("button");

//functions
function isRequired(inputs) {
  inputs.forEach((input) => {
    if (input.value === "") {
      showError(input, `${errorMessageID(input)} is required.`);
    } else {
      showSuccess(input);
    }
  });
}

function showSuccess(input) {
  input.parentNode.className = "form-control success";
}

function showError(input, errorMessage) {
  input.parentNode.className = "form-control error";
  input.nextElementSibling.innerText = errorMessage;
}

function errorMessageID(input) {
  let id = input.id.charAt(0).toUpperCase() + input.id.slice(1);
  return id;
}

function checkLength(input, min, max) {
  if (input.value.length < 4) {
    showError(
      input,
      `${errorMessageID(input)} must be longer than ${min} characters.`
    );
  } else if (input.value.length > max) {
    showError(
      input,
      `${errorMessageID(input)} must be shorter than ${max} characters.`
    );
  } else {
    showSuccess(input);
  }
}

function validEmail(input) {
  const re =
    /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

  if (input.value.toLowerCase().match(re)) {
    showSuccess(input);
  } else {
    showError(input, `Your e-mail is not valid.`);
  }
}

function validConfirmPassword(input) {
  if (password.value !== password2.value) {
    showError(password2, "Confirm password does not match.");
  }
}

//event listener
form.addEventListener("submit", (e) => {
  e.preventDefault();
  isRequired([username, email, password, password2]);
  checkLength(username, 3, 20);
  checkLength(password, 6);
  validEmail(email);
  validConfirmPassword(password, password2);
});
