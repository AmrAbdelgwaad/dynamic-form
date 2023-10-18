const form = document.querySelector("form");
const inputs = document.querySelectorAll("input");
const complete = document.querySelector(".complete");
const completeBtn = document.querySelector(".complete__btn");

const cvcInput = document.getElementById("cvc");
const cardNumberInput = document.getElementById("cardNumber");
const nameInput = document.getElementById("name");
const monthInput = document.getElementById("month");
const yearInput = document.getElementById("year");

const nameError = document.getElementById("nameError");
const cardNumberError = document.getElementById("numberError");
const monthError = document.getElementById("monthError");
const yearError = document.getElementById("yearError");
const cvcError = document.getElementById("cvcError");

const inputOutputPairs = {
  name: "name-output",
  cardNumber: "cardNumberOutput",
  month: "monthOutput",
  year: "yearOutput",
  cvc: "cvc-output",
};

inputs.forEach((input) => {
  input.addEventListener("input", function () {
    const output = document.querySelector(`#${inputOutputPairs[input.id]}`);
    output.textContent = input.value;
  });
});

cardNumberInput.addEventListener("input", () => {
  // adding the space in the number input
  const currentValue = cardNumberInput.value;
  const cleanValue = currentValue.replace(/\s/g, "");
  const groups = cleanValue.match(/.{1,4}/g);
  cardNumberInput.value = groups.join(" ");
});

form.addEventListener("submit", (event) => {
  event.preventDefault();
  if (
    !nameInput.validity.valid ||
    !cardNumberInput.validity.valid ||
    !monthInput.validity.valid ||
    !yearInput.validity.valid ||
    !cvcInput.validity.valid
  ) {
    showError();
    event.preventDefault();
  } else {
    form.classList.add("screen-reader");
    complete.classList.remove("screen-reader");
  }
});

function showError() {
  if (nameInput.validity.valueMissing) {
    nameError.textContent = "Can’t be blank";
  } else {
    nameError.textContent = "";
  }

  if (cardNumberInput.validity.valueMissing) {
    cardNumberError.textContent = "Can’t be blank";
  } else if (cardNumberInput.value.length < 19) {
    cardNumberError.textContent = "you should enter 16 digits";
  } else if (cardNumberInput.validity.patternMismatch) {
    cardNumberError.textContent = "Wrong format, numbers only";
  } else {
    cardNumberError.textContent = "";
  }

  if (monthInput.validity.valueMissing) {
    monthError.textContent = "Can’t be blank";
  } else if (monthInput.value <= 0 || monthInput.value > 12) {
    monthError.textContent = "invalid month";
  } else {
    monthError.textContent = "";
  }

  if (yearInput.validity.valueMissing) {
    yearError.textContent = "Can’t be blank";
  } else if (yearInput.value < 24) {
    yearError.textContent = "invalid year";
  } else {
    yearError.textContent = "";
  }

  if (cvcInput.validity.valueMissing) {
    cvcError.textContent = "Can’t be blank";
  } else if (cvcInput.value.length < 3) {
    cvcError.textContent = "too short";
  } else {
    cvcError.textContent = "";
  }
}

completeBtn.addEventListener("click", () => {
  form.classList.remove("screen-reader");
  complete.classList.add("screen-reader");
});
