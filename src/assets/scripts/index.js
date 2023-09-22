function displayTime() {
    var dateTime = new Date();
    var hrs = dateTime.getHours();
    var min = dateTime.getMinutes();
    var month = dateTime.toLocaleString('en-US', { month: 'long' });
    var day = dateTime.getDate();
    var year = dateTime.getFullYear();

    document.getElementById('hours').innerHTML = hrs;
    document.getElementById('minut').innerHTML = min;
    document.getElementById('monthly').innerHTML = month;
    document.getElementById('day').innerHTML = day;
    document.getElementById('year').innerHTML = year;
}

setInterval(displayTime, 1000); 







function processPin() {
    var enteredPin = document.getElementById('pin').value;
    var correctPin = '2587';

    if (enteredPin === correctPin) {
    

        window.location.href = '/global';
    } else {
        alert('Incorrect PIN. Access denied.');
    }

    document.getElementById('pin').value = '';
}

document.getElementById('pin').addEventListener('keypress', function (event) {
    var allowedKeys = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
    var key = event.key;

    if (allowedKeys.includes(key)) {
        event.preventDefault();
        document.getElementById('pin').value += key;
    }
});

document.getElementById('pin-submit').addEventListener('click', function () {
    processPin();
});

function appendDigit(digit) {
    var pinInput = document.getElementById('pin');
    if (pinInput.value.length < 4) {
        pinInput.value += digit;
    }
}
