const isLeapYear = (year) => ((year % 4 == 0) && (year % 100 != 0)) || (year % 400 == 0);

function validateInput(value, min, max) {
    if (!value) return false;
    if (isNaN(value)) return false;
    if (value < min || value > max) return false;
    return true;
}

const validDay = (day) => validateInput(day, 1, 31);
const validMonth = (month) => validateInput(month, 1, 12);
const validYear = (year) => validateInput(year, 1, 9999);

function validDayInMonth(day, month, year) {
    if ([4, 6, 9, 11].includes(month) && day == 31) return false;
    if (month == 2) {
        if (day > 29) false;
        if (!isLeapYear(year) && day == 29) return false;
    }
    return true;
}

function validDate(day, month, year) {
    return validDay(day) && validMonth(month) && validYear(year) && validDayInMonth(day, month, year)
}

console.log(validDate(29, 2, 2000))