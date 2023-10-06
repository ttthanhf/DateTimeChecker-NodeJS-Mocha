const breakDown = (arr) => arr.join("<br>");
const isLeapYear = (year) => ((year % 4 == 0) && (year % 100 != 0)) || (year % 400 == 0);

function validateInput(value, min, max, name) {
    if (!value) return `${name} empty`;
    if (isNaN(value)) return `${name} is not a number`;
    if (value < min || value > max) return `${name} out of range`;
    return null;
}

const validDay = (day) => validateInput(day, 1, 31, 'Day');
const validMonth = (month) => validateInput(month, 1, 12, 'Month');
const validYear = (year) => validateInput(year, 1, 9999, 'Year');

function validDayInMonth(day, month, year) {
    if ([4, 6, 9, 11].includes(month) && day == 31) return "Day not 31";
    if (month == 2) {
        if (day > 29) return "February not more than 29 days";
        if (!isLeapYear(year) && day == 29) return "February in Leap year not more than 28 days";
    }
    return null;
}

document.querySelector('form').addEventListener('submit', (e) => {
    e.preventDefault();

    let day = document.querySelector('#day').value;
    let month = document.querySelector('#month').value;
    let year = document.querySelector('#year').value;

    let errorArray = [
        validDay(day),
        validMonth(month),
        validYear(year),
        validDayInMonth(day, month, year)
    ].filter(a => a);

    let errorMessage = errorArray.length === 0 ? "Oke" : breakDown(errorArray);

    document.querySelector('#Messagelabel').innerHTML = errorMessage;
});
