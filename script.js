function breakDown(arr) {
    let result = [];
    for (let i = 0; i < arr.length; i++) {
        result.push(arr[i]);
        if (i !== arr.length - 1) {
            result.push("<br>");
        }
    }
    return result;
}

function leapYear(year) {
    return ((year % 4 == 0) && (year % 100 != 0)) || (year % 400 == 0);
}

function validDay(day) {
    if (day == null || day == "") {
        return "Day empty";
    }
    if (isNaN(day)) {
        return "Day is not a number";
    }
    if (day <= 0 || day >= 32) {
        return "Day out of range";
    }
}

function validMonth(month) {
    if (month == null || month == "") {
        return "Month empty";
    }
    if (isNaN(month)) {
        return "Month is not a number";
    }
    if (month <= 0 || month >= 13) {
        return "Month out of range";
    }
}

function validYear(year) {
    if (year == null || year == "") {
        return "Year empty";
    }
    if (isNaN(year)) {
        return "Year is not a number";
    }
    if (year <= 0 || year >= 9999) {
        return "Year out of range";
    }
}

function validDayInMonth(day, month, year) {
    if ((month == 4 || month == 6 || month == 9 || month == 11) && day == 31) {
        return "Day not 31"
    }
    if (month == 2) {
        if (day > 29) {
            return "February not more than 29 days"
        }
        if (!leapYear(year) && day == 29) {
            return "February in Leap year not more than 28 days"
        }
    }
}

document.querySelector('form').addEventListener('submit', (e) => {
    e.preventDefault();
    let errorArray = []
    let day = document.querySelector('#day').value
    let month = document.querySelector('#month').value
    let year = document.querySelector('#year').value
    errorArray.push(validDay(day))
    errorArray.push(validMonth(month))
    errorArray.push(validYear(year))
    errorArray.push(validDayInMonth(day, month, year))
    errorArray = errorArray.filter(a => a)
    if (errorArray.length == 0) {
        document.querySelector('#Messagelabel').innerHTML = "Oke"
    }
    else {
        errorArray = breakDown(errorArray)
        errorArray = errorArray.toString().replaceAll(',', '')
        document.querySelector('#Messagelabel').innerHTML = errorArray
    }
})