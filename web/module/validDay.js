const validateInput = require('./validInput')

const validDay = (day) => validateInput(day, 1, 31);

module.exports = validDay;

