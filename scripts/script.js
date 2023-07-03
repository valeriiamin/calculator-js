let firstOperand = '';
let secondOperand = '';
let operator = '';
let done = false;

const clear = document.querySelector('.clear');
const negative = document.querySelector('.negative');
const operators = document.querySelectorAll('.operator');
const numbers = document.querySelectorAll('.numbers');
const dot = document.querySelector('.dot');
const equal = document.querySelector('.equal');
const output = document.querySelector('#output');

clear.addEventListener('click', () => {
    firstOperand = '';
    secondOperand = '';
    operator = '';
    done = false;
    output.textContent = '0';
});

numbers.forEach((num) => {
    num.addEventListener('click', (e) => {
        if (secondOperand == '' && operator == '') {
            firstOperand = updateOperand(firstOperand, e.target);
        } else if (firstOperand !== '' && secondOperand !== '' && done) {
            secondOperand = e.target.textContent;
            done = false;
            output.textContent = firstOperand;
        } else {
            secondOperand = updateOperand(secondOperand, e.target);
        }
    });
});

operators.forEach((op) => {
    op.addEventListener('click', (e) => {
        const key = e.target.textContent;
        operator = key;
    });
});

equal.addEventListener('click', () => {
    if (secondOperand == '') secondOperand = firstOperand;

    switch (operator) {
        case '+':
            firstOperand = add(Number(firstOperand), Number(secondOperand));
            break;
        case '-':
            firstOperand = substract(firstOperand, secondOperand);
            break;
        case '*':
            firstOperand = multiply(firstOperand, secondOperand);
            break;
        case '/':
            if (secondOperand == '0') {
                output.textContent = 'ERROR';
                firstOperand = '';
                secondOperand = '';
                return;
            }
            firstOperand = divide(firstOperand, secondOperand);
            break;
        case '%':
            firstOperand = reminder(firstOperand, secondOperand);
            break;
    }
    done = true;
    firstOperand = firstOperand.toString();

    output.textContent = firstOperand;
    output.style.fontSize = firstOperand.length > 16 ? '40px' : '';
});

negative.addEventListener('click', () => {
    if (!done) {
        if (firstOperand.startsWith('-') && secondOperand == '') {
            firstOperand = firstOperand.slice(1);
        } else if (!firstOperand.startsWith('-') && secondOperand == '') {
            firstOperand = '-' + firstOperand;
        } else if (!secondOperand.startsWith('-')) {
            secondOperand = '-' + secondOperand;
        } else if (secondOperand.startsWith('-')) {
            secondOperand = secondOperand.slice(1);
        }

        output.textContent = secondOperand == '' ? firstOperand : secondOperand;
    }
});

dot.addEventListener('click', () => {
    if (!done) {
        output.textContent =
            secondOperand == ''
                ? (firstOperand = checkDot(firstOperand))
                : (secondOperand = checkDot(secondOperand));
    }
});

function updateOperand(operand, target) {
    if (operand.length <= 16) {
        if (operand.startsWith('0')) {
            if (operand.includes('.')) {
                operand += target.textContent;
                output.textContent = operand;
            } else {
                operand = operand.slice(0, 0);
                operand += target.textContent;
                output.textContent = operand;
            }
        } else {
            operand += target.textContent;
            output.textContent = operand;
        }
    }
    return operand;
}

function checkDot(operand) {
    if(!operand.includes('.')){
        if(operand.length < 1){
            operand += '0.';
            return operand;
        } else{
            operand += '.';
            return operand;
        }
    }
    return operand;
}

function add(a, b) {
    return a + b;
}

function substract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    return a / b;
}

function reminder(a, b) {
    return a % b;
}
