const isLeapYear = require('./isLeapYear')

function validDayInMonth(day, month, year) {
    if ([4, 6, 9, 11].includes(month) && day == 31) return false;
    if (month == 2) {
        if (day > 29) false;
        if (!isLeapYear(year) && day == 29) return false;
    }
    return true;
}

module.exports = validDayInMonth;