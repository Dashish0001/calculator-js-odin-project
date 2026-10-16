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
    if (b === 0){
        return "error"
    }
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
    if (
        firstNumber === null ||
        operator === null ||
        waitingForSecondNumber
    ) {
        return;
    }

    const secondNumber = Number(display.textContent);
    const result = operate(operator, firstNumber, secondNumber);

    if (result === "error" || !Number.isFinite(result)) {
        display.textContent = "Error";
    } else {
        display.textContent = String(Number(result.toFixed(2)));
    }

    firstNumber = null;
    operator = null;
    waitingForSecondNumber = false;
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

const decimalButton = document.querySelector("#decimal");

decimalButton.addEventListener("click", function () {
    if (waitingForSecondNumber || resultDisplayed) {
        display.textContent = "0.";
        waitingForSecondNumber = false;
        resultDisplayed = false;
    } else if (!display.textContent.includes(".")) {

        display.textContent += ".";
    }
});

const backspaceButton = document.querySelector("#backspace");

backspaceButton.addEventListener("click", function (){
    if (waitingForSecondNumber || resultDisplayed) {
        return;
    }

    if (display.textContent.length > 1) {
        display.textContent = display.textContent.slice(0, -1);

    } else {
        display.textContent = 0;
    }
});

const clearButton = document.querySelector("#clear");

clearButton.addEventListener("click", function () {
    display.textContent = "0";
    firstNumber = null;
    operator = null;
    resultDisplayed = false;
    waitingForSecondNumber = false;
});


document.addEventListener("keydown", function (event) {
    const key = event.key;
    if (/^[0-9]$/.test(key)) {
        const digitButton = [...numberButtons].find(
            button => button.textContent === key
        );
        digitButton?.click();
    } else if (["+", "-", "*", "/"].includes(key)) {
        const symbols = { "+": "+", "-": "−", "*": "×", "/": "÷" };
        const operatorButton = [...operatorButtons].find(
            button => button.textContent === symbols[key]
        );
        operatorButton?.click();
    } else if (key === "Enter" || key === "=") {
        event.preventDefault();
        equalsButton.click();
    } else if (key === "Backspace") {
        backspaceButton.click();
    } else if (key === "Escape") {
        clearButton.click();
    } else if (key === ".") {
        decimalButton.click();
    }
});
