function operate(a, b, op) {
    let result;
    switch (op) {
        case "+": result = a + b; break;
        case "-": result = a - b; break;
        case "*": result = a * b; break;
        case "/": result = a / b; break;    // Div by zero avoided separately
        default: return null;
    }
    return +result.toFixed(fractionDigitsValue);  // '+' converts result back to number
}

function initPageElems() {
    Array.from(document.getElementsByClassName("button-number")).
    forEach(function(element) {element.addEventListener("click",
        () => putDigit(element.textContent));});

    Array.from(document.getElementsByClassName("button-operator")).
    forEach(function(element) {element.addEventListener("click",
        () => putOperator(element.textContent));});

    document.getElementById("clear-button").
    addEventListener("click", resetCalc);
    document.getElementById("delete-button").
    addEventListener("click", deleteDigit);
    document.getElementById("sign-change-button").
    addEventListener("click", changeSign);
    document.getElementById("point-button").
    addEventListener("click", putPoint);
    document.getElementById("equals-button").
    addEventListener("click", equals);

    document.addEventListener("keydown", parseKey);

    resetCalcValues();
    updateCurDisplay(currentNumStr);
}

function parseKey(e) {
    if (e.key >= 0 && e.key <= 9) {
        putDigit(e.key);
    }
    else if (e.key === "+" ||e.key === "-" ||e.key === "*" ||e.key === "/")
        putOperator(e.key);
    else switch (e.key) {
            case "Escape": resetCalc(); break;
            case "Backspace": deleteDigit(); break;
            case "+/-": changeSign(); break;
            case ".": putPoint(); break;
            case "=": equals(); break;
            case "Enter": equals(); break;
        }
}

function deleteDigit() {
    currentNumStr = currentNumStr.slice(0, -1);
    if (currentNumStr.length === 0) currentNumStr = "0";
    updateCurDisplay(currentNumStr);
}

function changeSign() {
    currentNumStr = (Number(currentNumStr) * -1).toString();
    updateCurDisplay(currentNumStr);
}

function putDigit(digit) {
    if (currentNumStr === "0")
        currentNumStr = digit;
    else
        currentNumStr += digit; // concatenate to currentNumStr string
    updateCurDisplay(currentNumStr);
}

function putPoint() {
    // Only allow one decimal point to exist!
    if (!currentNumStr.includes(".")){
        currentNumStr += ".";
        updateCurDisplay(currentNumStr);
    }
}

function putOperator(op) {
    equals();   // Calc what was previously there first, if possible
    currentOperator = op;
}

function equals() {
    if (memoryStr === null) {
        // Loading current number to memory as first term
        memoryStr = currentNumStr;
        currentNumStr = "0";
        updateCurDisplay(currentNumStr);
    } else if (currentOperator !== null) {
        if (currentNumStr !== "0" || currentOperator !== "/") {
            // Calculating with second term
            memoryStr = operate(Number(memoryStr), Number(currentNumStr), currentOperator).toString();
            currentNumStr = "0";
            updateCurDisplay(memoryStr);
        } else {
            updateCurDisplay("division by 0");
            resetCalcValues();
        }
    }
}

// Does not apply changes to display by itself!
function resetCalcValues() {
    memoryStr = null;
    currentOperator = null;
    currentNumStr = "0";
}

function resetCalc() {
    resetCalcValues();
    updateCurDisplay(currentNumStr);
}

function updateCurDisplay(content) {
    curDisplayDiv.textContent = content;
}

const fractionDigitsValue = 6;
const curDisplayDiv = document.getElementById("calc-display-current");

let memoryStr;
let currentOperator;
let currentNumStr;

initPageElems();
