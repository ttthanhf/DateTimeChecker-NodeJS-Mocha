const validateInput = require('./validInput')

const validYear = (year) => validateInput(year, 1, 9999);

module.exports = validYear;

