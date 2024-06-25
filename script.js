let firstOperand;
let operator;
let secondOperand;

const buttons = document.querySelectorAll(".btn");
const numberPanel = document.querySelector("#number");
const expressionPanel = document.querySelector("#expression");

numberPanel.textContent = "0";

buttons.forEach(btn => btn.addEventListener("click", (e) => {
    let input = e.target.textContent;
    displayNumbers(input);

    allowedOperations = ["+", "-", "x", "/", "%"];
    if (allowedOperations.includes(input)) {
        firstOperand = Number(numberPanel.textContent);
        operator = input;

        if (allowedOperations.includes(expressionPanel.textContent.slice(-1))){
            expressionPanel.textContent = expressionPanel.textContent.slice(0, -1) + operator;
        } else {
            expressionPanel.textContent = numberPanel.textContent += operator;
        }

        numberPanel.textContent = "";
        firstOperand = Number(expressionPanel.textContent.slice(0, -1));
    }

    if (input === "=") {
        secondOperand = Number(numberPanel.textContent);
        numberPanel.textContent = operate(operator, firstOperand, secondOperand) ?? numberPanel.textContent; // In case user presses equal sign when there is only one operand, return the operand
        expressionPanel.textContent += secondOperand + "=";
        operator = undefined;
    }

    if (input === "DEL") {
        if (numberPanel.textContent !== "0") {
            numberPanel.textContent = numberPanel.textContent.substring(0, numberPanel.textContent.length - 1);
        }
    }

    if (input === "C") {
        numberPanel.textContent = "0";
        expressionPanel.textContent = "";
    }
}));

function displayNumbers(input) {
    const allowedCharacters = ["0","1","2","3","4","5","6","7","8","9","0"];
    
    if (allowedCharacters.includes(input)) {
        if (numberPanel.textContent === "0" || numberPanel.textContent === "-0") { // if there is only a zero or a negative zero in the number panel, replace it with input but keep the negative sign
            numberPanel.textContent = numberPanel.textContent.slice(0, -1) + input;
        } else { // else append the input value/
            numberPanel.textContent += input;
        }
    }

    if (input === "+/-") {
        if (numberPanel.textContent[0] !== "-") { // if there is no negate sign (number is positive), then add negate sign
            numberPanel.textContent = "-" + numberPanel.textContent;
        } else { // else if there is a negate sign (number is negative), remove the negate sign
            numberPanel.textContent = numberPanel.textContent.substring(1);
        }
    }

    if (input === ".") {
        if (numberPanel.textContent.split("").includes(input)) { // if there is a decimal included in the number panel, then leave the content the same
            numberPanel.textContent = numberPanel.textContent;
        } else { // else add the decimal
            numberPanel.textContent += ".";
        }
    }
}

function operate(operation, operand1, operand2) {
    let result;
    switch(operation) {
        case "+":
            result = add(operand1, operand2);
            break;
        case "-":
            result = subtract(operand1, operand2);
            break;
        case "x":
            result = multiply(operand1, operand2);
            break;
        case "/":
            result = divide(operand1, operand2);
            break;
        case "%":
            result = modulo(operand1, operand2);
            break;
        default:
            break;
    }
    if (typeof result === "number") { // If the result is a number
        return Math.round(result * 1000)/1000; // Return the result to the thousandth decimal place
    }
    return result; // Result could be undefined
}

function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    if (b !== 0) {
        return a / b;
    } else {
        return "Can't compute";
    }
    
}

function modulo(a, b) {
    if (b !== 0) {
        return a % b;
    } else {
        return "Can't compute";
    }
}