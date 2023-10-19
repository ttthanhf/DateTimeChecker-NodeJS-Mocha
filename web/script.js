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
const validYear = (year) => validateInput(year, 1, 3000, 'Year');

function validDayInMonth(day, month, year) {
    if ([4, 6, 9, 11].includes(parseInt(month)) && day == 31) return "April, June, September, and November do not have 31 days";
    if (month == 2) {
        if (day > 29) return "February cannot have more than 29 days";
        if (!isLeapYear(year) && day == 29) return "February in non-leap year cannot have 29 days";
    }
    return null;
}

document.querySelector('form').addEventListener('submit', (e) => {
    e.preventDefault();

    let day = document.querySelector('#day').value;
    let month = document.querySelector('#month').value;
    let year = document.querySelector('#year').value;

    let validDayMsg = validDay(day);
    let validMonthMsg = validMonth(month);
    let validYearMsg = validYear(year);
    let validDayInMonthMsg = validDayInMonth(day, month, year);

    let errorArray = [
        validDayMsg,
        validMonthMsg,
        validYearMsg,
        validDayInMonthMsg
    ].filter(a => a);

    document.querySelector('#DayLabelError').innerHTML = validDayMsg != null ? validDayMsg : '<br>'
    document.querySelector('#MonthLabelError').innerHTML = validMonthMsg != null ? validMonthMsg : '<br>'
    document.querySelector('#YearLabelError').innerHTML = validYearMsg != null ? validYearMsg : '<br>'

    let msgAll = errorArray.length == 0 ? "" : breakDown(errorArray);
    let status = errorArray.length == 0;

    document.querySelector('#DayInMonthLabelError').innerHTML = validDayInMonthMsg;
    document.querySelector('#statusLabel').innerHTML = status;
});
