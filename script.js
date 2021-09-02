class Calculator {
  constructor(topContainerTextElement, bottomContainerTextElement) {
    this.topContainerTextElement = topContainerTextElement;
    this.bottomContainerTextElement = bottomContainerTextElement;
    this.clear();
  }

  clear() {
    this.bottomContainer = "";
    this.topContainer = "";
    this.operation = undefined;
  }

  delete() {
    this.bottomContainer = this.bottomContainer.toString().slice(0, -1);
  }

  appendNumber(number) {
    let zeroPresent = true;
    if (number === "." && this.bottomContainer.includes(".")) {
      return;
    }
    this.bottomContainer = this.bottomContainer.toString() + number.toString();
  }

  chooseOperation(operation) {
    if (this.bottomContainer === "") return;
    if (this.topContainer !== "") {
      this.compute();
    }
    this.operation = operation;
    this.topContainer = this.bottomContainer;
    this.bottomContainer = "";
  }

  compute() {
    let computation;
    const lhs = parseFloat(this.topContainer);
    const rhs = parseFloat(this.bottomContainer);
    if (isNaN(rhs) || isNaN(lhs)) return;
    switch (this.operation) {
      case "+":
        computation = lhs + rhs;
        break;
      case "-":
        computation = lhs - rhs;
        break;
      case "*":
        computation = lhs * rhs;
        break;
      case "÷":
        if (lhs === 0 && rhs === 0) {
          break;
        }
        computation = lhs / rhs;
        break;
      default:
        return;
    }
    this.bottomContainer = computation;
    this.topContainer = "";
    this.operation = undefined;
  }

  updateDisplay() {
    this.bottomContainerTextElement.innerText = this.bottomContainer;
    if (this.operation != null) {
      this.topContainerTextElement.innerText = `${this.topContainer} ${this.operation}`;
    } else {
      this.topContainerTextElement.innerText = "";
    }
  }
}

const numberButtons = document.querySelectorAll("[data-number]");
const operationButtons = document.querySelectorAll("[data-operation]");
const equalsButton = document.querySelector("[data-equals]");
const deleteButton = document.querySelector("[data-delete]");
const allClearButton = document.querySelector("[data-all-clear]");
const topContainer = document.querySelector("[data-top-container]");
const bottomContainer = document.querySelector("[data-bottom-container]");

const calculator = new Calculator(topContainer, bottomContainer);

numberButtons.forEach((button) => {
  button.addEventListener("click", () => {
    calculator.appendNumber(button.innerText);
    calculator.updateDisplay();
  });
});

operationButtons.forEach((button) => {
  button.addEventListener("click", () => {
    calculator.chooseOperation(button.innerText);
    calculator.updateDisplay();
  });
});

equalsButton.addEventListener("click", () => {
  calculator.compute();
  calculator.updateDisplay();
});
deleteButton.addEventListener("click", () => {
  calculator.delete();
  calculator.updateDisplay();
});
allClearButton.addEventListener("click", () => {
  calculator.clear();
  calculator.updateDisplay();
});
