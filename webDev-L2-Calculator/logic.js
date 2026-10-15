const expressionDisplay = document.getElementById("expression");
const resultDisplay = document.getElementById("result");
const buttons = document.querySelector(".buttons");

let expression = "";
let justCalculated = false;

function updateDisplay() {
    expressionDisplay.textContent = expression || "0";
}

function showError(message) {
    resultDisplay.textContent = message;
}

function clearCalculator() {
    expression = "";
    justCalculated = false;
    resultDisplay.textContent = "Ready";
    updateDisplay();
}

function addNumber(number) {
    if (justCalculated) {
        expression = "";
        justCalculated = false;
    }

    expression += number;
    updateDisplay();
    resultDisplay.textContent = "Calculating...";
}

function addDecimal() {
    if (justCalculated) {
        expression = "";
        justCalculated = false;
    }

    const currentNumber = expression.split(/[+\-*/]/).pop();

    if (currentNumber.includes(".")) {
        return;
    }

    if (expression === "" || /[+\-*/]$/.test(expression)) {
        expression += "0";
    }

    expression += ".";
    updateDisplay();
}

function addOperator(operator) {
    if (expression === "") {
        if (operator === "-") {
            expression = "-";
            updateDisplay();
        }
        return;
    }

    if (expression === "-") {
        return;
    }

    justCalculated = false;

    if (/[+\-*/]$/.test(expression)) {
        expression = expression.slice(0, -1);
    }

    expression += operator;
    updateDisplay();
}

function backspace() {
    expression = expression.slice(0, -1);
    justCalculated = false;
    resultDisplay.textContent = "Ready";
    updateDisplay();
}

// Safely calculate an expression using a basic arithmetic parser.
function calculate(input) {
    let position = 0;

    function skipSpaces() {
        while (input[position] === " ") {
            position++;
        }
    }

    function parseNumber() {
        skipSpaces();

        const start = position;
        let dots = 0;

        while (
            position < input.length &&
            /[0-9.]/.test(input[position])
        ) {
            if (input[position] === ".") {
                dots++;
            }

            position++;
        }

        const value = input.slice(start, position);

        if (!value || dots > 1 || value === ".") {
            throw new Error("Invalid number");
        }

        const number = Number(value);

        if (!Number.isFinite(number)) {
            throw new Error("Invalid number");
        }

        return number;
    }

    function parseFactor() {
        skipSpaces();

        if (input[position] === "+") {
            position++;
            return parseFactor();
        }

        if (input[position] === "-") {
            position++;
            return -parseFactor();
        }

        return parseNumber();
    }

    function parseTerm() {
        let value = parseFactor();

        while (true) {
            skipSpaces();

            const operator = input[position];

            if (operator !== "*" && operator !== "/") {
                break;
            }

            position++;

            const nextValue = parseFactor();

            if (operator === "/") {
                if (nextValue === 0) {
                    throw new Error("Cannot divide by zero");
                }

                value /= nextValue;
            } else {
                value *= nextValue;
            }
        }

        return value;
    }

    function parseExpression() {
        let value = parseTerm();

        while (true) {
            skipSpaces();

            const operator = input[position];

            if (operator !== "+" && operator !== "-") {
                break;
            }

            position++;

            const nextValue = parseTerm();

            if (operator === "+") {
                value += nextValue;
            } else {
                value -= nextValue;
            }
        }

        return value;
    }

    const result = parseExpression();

    skipSpaces();

    if (position !== input.length) {
        throw new Error("Invalid expression");
    }

    if (!Number.isFinite(result)) {
        throw new Error("Result out of range");
    }

    return result;
}

function calculateResult() {
    if (!expression || expression === "-") {
        return;
    }

    // An expression must end with a number.
    if (/[+\-*/.]$/.test(expression)) {
        showError("Complete the expression first");
        return;
    }

    try {
        const answer = calculate(expression);

        expression = String(
            Number.parseFloat(answer.toPrecision(12))
        );

        resultDisplay.textContent = "= " + expression;
        justCalculated = true;
        updateDisplay();
    } catch (error) {
        showError(error.message || "Invalid expression");
    }
}

// One event listener handles all calculator buttons.
buttons.addEventListener("click", function (event) {
    const button = event.target.closest("button");

    if (!button) {
        return;
    }

    if (button.dataset.number !== undefined) {
        addNumber(button.dataset.number);
        return;
    }

    if (button.dataset.operator) {
        addOperator(button.dataset.operator);
        return;
    }

    switch (button.dataset.action) {
        case "clear":
            clearCalculator();
            break;

        case "backspace":
            backspace();
            break;

        case "decimal":
            addDecimal();
            break;

        case "equals":
            calculateResult();
            break;
    }
});

// Optional keyboard support.
document.addEventListener("keydown", function (event) {
    const key = event.key;

    if (/^[0-9]$/.test(key)) {
        addNumber(key);
    } else if (key === ".") {
        addDecimal();
    } else if (["+", "-", "*", "/"].includes(key)) {
        addOperator(key);
    } else if (key === "Enter" || key === "=") {
        event.preventDefault();
        calculateResult();
    } else if (key === "Backspace") {
        backspace();
    } else if (key === "Escape") {
        clearCalculator();
    }
});