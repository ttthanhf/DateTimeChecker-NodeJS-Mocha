const validDate = require('../../web/module/validDate');
const assert = require('assert');

describe('validate Date Time Checker', () => {

    it('should return true for valid date', () => {
        assert.equal(validDate(29, 2, 2000), true);
    });

    it('should return false for feb not have 29 day in normal year', () => {
        assert.equal(validDate(29, 2, 2001), false);
    });

});

//How to use : npx mocha test/unit/unit.test.js