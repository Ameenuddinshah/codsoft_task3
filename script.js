const display = document.getElementById('display');
let currentInput = '';
let previousInput = '';
let operator = null;
let isCalculatorOn = false;  // To track ON/OFF state
let messageTimeout = null;    // To keep track of the message timer

// Function to update the display
function updateDisplay(value) {
    if (isCalculatorOn) {
        display.value = value;
    } else {
        display.value = '';  // Blank display when OFF
    }
}

// Function to display "ON" or "OFF" for 5 seconds
function displayMessage(message) {
    display.value = message;
    clearTimeout(messageTimeout);  // Clear any existing timer
    messageTimeout = setTimeout(() => {
        updateDisplay('');  // Clear the message after 5 seconds
    }, 5000);  // 5 seconds
}

// Function to handle ON/OFF operation
function toggleCalculator() {
    isCalculatorOn = !isCalculatorOn;
    clear();  // Clear the calculator inputs

    if (isCalculatorOn) {
        displayMessage('ON');  // Show "ON" when calculator is turned on
    } else {
        displayMessage('OFF');  // Show "OFF" when calculator is turned off
    }
}

// Function to handle number and dot button clicks
function appendNumber(number) {
    if (!isCalculatorOn) return;  // Do nothing if calculator is OFF
    if (number === '.' && currentInput.includes('.')) return;  // Prevent multiple dots
    currentInput += number;
    updateDisplay(currentInput);
}

// Function to choose an operation
function chooseOperator(op) {
    if (!isCalculatorOn) return;  // Do nothing if calculator is OFF
    if (currentInput === '') return;  // Don't set operator without a number
    if (previousInput !== '') {
        calculate();  // If there was a previous calculation, do it first
    }
    operator = op;
    previousInput = currentInput;
    currentInput = '';
}

// Function to perform the calculation
function calculate() {
    if (!isCalculatorOn) return;  // Do nothing if calculator is OFF
    let result;
    const prev = parseFloat(previousInput);
    const current = parseFloat(currentInput);
    if (isNaN(prev) || isNaN(current)) return;  // Return if either input is invalid

    switch (operator) {
        case '+':
            result = prev + current;
            break;
        case '-':
            result = prev - current;
            break;
        case '*':
            result = prev * current;
            break;
        case '/':
            if (current === 0) {
                alert("Can't divide by zero!");
                clear();
                return;
            }
            result = prev / current;
            break;
        default:
            return;
    }

    currentInput = result.toString();
    operator = null;
    previousInput = '';
    updateDisplay(currentInput);
}

// Function to clear the display
function clear() {
    if (!isCalculatorOn) return;  // Do nothing if calculator is OFF
    currentInput = '';
    previousInput = '';
    operator = null;
    updateDisplay('');
}

// Function to handle backspace
function backspace() {
    if (!isCalculatorOn) return;  // Do nothing if calculator is OFF
    currentInput = currentInput.slice(0, -1);
    updateDisplay(currentInput);
}

// Event listeners for button clicks
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', function () {
        const value = this.textContent;

        if (value === 'AC') {
            toggleCalculator();  // Toggle ON/OFF
        } else if (!isCalculatorOn) {
            return;  // Disable other buttons if the calculator is OFF
        } else if (!isNaN(value) || value === '.') {
            appendNumber(value);
        } else if (value === 'C') {
            clear();
        } else if (value === '←') {
            backspace();
        } else if (value === '=') {
            calculate();
        } else {
            chooseOperator(value);
        }
    });
});
