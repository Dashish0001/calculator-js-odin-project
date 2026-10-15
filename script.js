function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide (a, b) {
    return a / b;
}


function operate (operator, a, b) {
    switch(operator) {
        case "+":
            return add (a, b);

            case "-":
                return subtract (a, b);

                case "*":
                    return multiply (a, b);

                    case "/":
                        return divide (a, b);

                        default:
                            return "invalid operator"
    }
}


const display = document.querySelector("#display");
let resultDisplayed = false;

let firstNumber = null;
let operator= null;
let waitingForSecondNumber = false;

const operatorButtons = document.querySelectorAll(".operator");

operatorButtons.forEach(function (button) {
    button.addEventListener("click", function () {
        const nextOperator = button.textContent === "÷" ? "/" :
            button.textContent === "×" ? "*" :
            button.textContent === "−" ? "-" : "+";

        const currentNumber = Number(display.textContent);

        if (firstNumber !== null && operator !== null && !waitingForSecondNumber) {
            const result = operate(operator, firstNumber, currentNumber);
            display.textContent = result;
            firstNumber = result;
        } else {
            firstNumber = currentNumber;
        }

        operator = nextOperator;
        waitingForSecondNumber = true;
        resultDisplayed = false;
    });
});


const equalsButton = document.querySelector("#equals");

equalsButton.addEventListener("click", function () {
    const secondNumber = Number(display.textContent);

    const result = operate(operator, firstNumber, secondNumber);

    display.textContent = result;
    resultDisplayed = true;
});

 const numberButtons = document.querySelectorAll(".digit");

numberButtons.forEach(function (button) {
    button.addEventListener("click", function () {
        if (waitingForSecondNumber || resultDisplayed) {
            display.textContent = button.textContent;
            waitingForSecondNumber = false;
            resultDisplayed = false;
        } else if (display.textContent === "0") {
            display.textContent = button.textContent;
        } else {
            display.textContent += button.textContent;
        }
    });
});

const clearButton = document.querySelector("#clear");

clearButton.addEventListener("click", function () {
    display.textContent = "0";
    firstNumber = null;
    operator = null;
    resultDisplayed = false;
    waitingForSecondNumber = false;
});