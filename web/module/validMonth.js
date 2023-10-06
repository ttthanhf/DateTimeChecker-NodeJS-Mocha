const validateInput = require('./validInput')

const validMonth = (month) => validateInput(month, 1, 12);

module.exports = validMonth;

