const validDay = require('./validDay')
const validMonth = require('./validMonth')
const validYear = require('./validYear')
const validDayInMonth = require('./validDayInMonth')

function validDate(day, month, year) {
    return validDay(day) && validMonth(month) && validYear(year) && validDayInMonth(day, month, year)
}

module.exports = validDate;