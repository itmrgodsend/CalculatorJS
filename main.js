
var numbers = document.querySelectorAll('.number');
var operations = document.querySelectorAll('.operation');
var decimalBtn = document.getElementById('decimal');
var clearBtns = document.querySelectorAll('.clear_btn');
var resultBtn = document.getElementById('result');
var display = document.getElementById('display');
var memoryCurrentNumber = 0;
var memoryNewNumber = false;
var memoryPendingOperation = '';


for (var i = 0; i < numbers.length; i++) {
    var number = numbers[i];
    number.addEventListener('click', function (e) {
        numberPress(e.target.textContent);
    });
};

for (var i = 0; i < operations.length; i++) {
    var operationBtn = operations[i];
    operationBtn.addEventListener('click', function (e) {
        operation(e.target.textContent);
    });
};

for (var i = 0; i < clearBtns.length; i++) {
    var clearBtn = clearBtns[i];
    clearBtn.addEventListener('click', function (e) {
        clear(e.srcElement.id);

    });
};

decimalBtn.addEventListener('click', decimal);

resultBtn.addEventListener('click', result);

function numberPress (number){
    if (memoryNewNumber) {
        display.value = number;
        memoryNewNumber = false;
    } else {
        if (display.value === '0') {
            display.value = number;
        }else {
            display.value += number;
        };
    };
};

function operation(op) {
    var localOperationMemory = display.value;

    if (memoryNewNumber && memoryPendingOperation !== '=') {
        display.value = memoryCurrentNumber;
    } else {
        memoryNewNumber = true;
        if (memoryPendingOperation === '+') {
            memoryCurrentNumber += parseFloat(localOperationMemory);
        } else if (memoryPendingOperation === '-') {
            memoryCurrentNumber -= parseFloat(localOperationMemory);
        } else if (memoryPendingOperation === '*') {
            memoryCurrentNumber *= parseFloat(localOperationMemory);
        } else if (memoryPendingOperation === '/') {
            memoryCurrentNumber /= parseFloat(localOperationMemory);
        } else {
            memoryCurrentNumber = parseFloat(localOperationMemory);
        };

        display.value = memoryCurrentNumber;
        memoryPendingOperation = op
    };
};

function decimal(argument) {
    var localDecimalMemory = display.value;

    if (memoryNewNumber) {
        localDecimalMemory = '0.';
        memoryNewNumber = false;

    } else {
        if (localDecimalMemory.indexOf('.') === -1 ) {
            localDecimalMemory += '.';

        };
    };
    display.value = localDecimalMemory;
};

function clear(id) {
    if (id === 'ce') {
        display.value = '0';
        memoryNewNumber = true;
    }else if (id === 'c') {
        display.value = '0';
        memoryNewNumber = true;
        memoryCurrentNumber = 0;
        memoryPendingOperation = '';
    };
    console.log('Клик по ' + id +'!');
};

