let operator = "";
let previousValue = "";
let currentValue = "";

document.addEventListener("DOMContentLoaded", function () {
  const clear = document.querySelector(".clear-btn");
  const equal = document.querySelector(".equal-sign");
  const decimal = document.querySelector(".decimal-point");
  const previousScreen = document.querySelector("#previous-input");
  const currentScreen = document.querySelector("#current-input");
  const operators = document.querySelectorAll(".operator");
  const numbers = document.querySelectorAll(".number");

  operators.forEach((op) =>
    op.addEventListener("click", function (e) {
      if (currentValue !== "" && previousValue !== "") {
        calculate();
        currentScreen.textContent = previousValue;
      }
      handleOperator(e.target.textContent);
      previousScreen.textContent = `${previousValue} ${operator}`;
      currentValue = "";
    })
  );

  numbers.forEach((number) =>
    number.addEventListener("click", function (e) {
      handleNumber(e.target.textContent);
      currentScreen.textContent = currentValue;
    })
  );

  clear.addEventListener("click", function () {
    previousValue = "";
    currentValue = "";
    operator = "";
    currentScreen.textContent = currentValue;
    previousScreen.textContent = currentValue;
  });

  equal.addEventListener("click", function () {
    if (currentValue !== "" && previousValue !== "") {
      calculate();
      previousScreen.textContent = "";
      if (previousValue.length <= 12) {
        currentScreen.textContent = previousValue;
      } else {
        currentScreen.textContent = previousValue.slice(0, 12);
      }
      currentValue = "";
    }
  });

  decimal.addEventListener("click", function () {
    addDecimal();
  });
});

const calculate = () => {
  previousValue = Number(previousValue);
  currentValue = Number(currentValue);
  switch (operator) {
    case "+":
      previousValue += currentValue;
      break;
    case "-":
      previousValue -= currentValue;
      break;
    case "x":
      previousValue *= currentValue;
      break;
    case "/":
      previousValue /= currentValue;
      break;
    default:
      break;
  }
  previousValue = roundNumber(previousValue);
  currentValue = "";
};

const handleOperator = (opr) => {
  if (currentValue !== "" && previousValue !== "") {
    calculate();
    const currentInput = document.querySelector("#current-input");
    currentInput.textContent = previousValue;
  }

  operator = opr;

  if (currentValue !== "" && previousValue === "") {
    previousValue = currentValue;
    currentValue = "";
  }

  const previousInput = document.querySelector("#previous-input");
  previousInput.textContent = `${previousValue} ${operator}`;
};


const handleNumber = (num) => {
  if (currentValue.length < 12) {
    // Ardışık sıfırların eklenmesini engelle
    if (!(currentValue === "0" && num === "0")) {
      currentValue += num;
    }
  }
};


const roundNumber = (num) => {
  return Math.round(num * 1000) / 1000;
};

const addDecimal = () => {
  if (!currentValue.includes(".")) {
    currentValue += ".";
  }
};
