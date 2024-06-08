let display = document.getElementById('display');
let currentOperand = '';
let previousOperand = '';
let operation = null;
let shouldResetDisplay = false;

function appendNumber(number) {
    if (shouldResetDisplay) {
        currentOperand = '';
        shouldResetDisplay = false;
    }
    if (currentOperand.includes('.') && number === '.') return;
    currentOperand = currentOperand.toString() + number.toString();
    updateDisplay();
}

function setOperator(operator) {
    if (currentOperand === '' && operator !== '-') return;
    if (previousOperand !== '') {
        calculate();
    }
    operation = operator;
    previousOperand = currentOperand;
    currentOperand = '';
    updateDisplay(true);
}

function calculate() {
    let computation;
    const prev = parseFloat(previousOperand);
    const current = parseFloat(currentOperand);
    if (isNaN(prev) || isNaN(current)) return;
    switch (operation) {
        case '+':
            computation = prev + current;
            break;
        case '-':
            computation = prev - current;
            break;
        case '*':
            computation = prev * current;
            break;
        case '/':
            computation = prev / current;
            break;
        default:
            return;
    }
    currentOperand = computation;
    operation = null;
    previousOperand = '';
    updateDisplay();
    shouldResetDisplay = true;
}

function updateDisplay(showOperator = false) {
    if (showOperator && operation !== null) {
        display.innerText = `${previousOperand} ${operation} ${currentOperand}`;
    } else if (previousOperand !== '' && operation !== null) {
        display.innerText = `${previousOperand} ${operation} ${currentOperand}`;
    } else {
        display.innerText = currentOperand;
    }
}

function clearDisplay() {
    currentOperand = '';
    previousOperand = '';
    operation = null;
    display.innerText = '0';
}

document.addEventListener('keydown', function(event) {
    if ((event.key >= 0 && event.key <= 9) || event.key === '.') {
        appendNumber(event.key);
    }
    if (event.key === '+' || event.key === '-' || event.key === '*' || event.key === '/') {
        setOperator(event.key);
    }
    if (event.key === '=' || event.key === 'Enter') {
        calculate();
    }
    if (event.key === 'Escape') {
        clearDisplay();
    }
});
