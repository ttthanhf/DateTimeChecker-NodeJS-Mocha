function validateInput(value, min, max) {
    if (!value) return false;
    if (isNaN(value)) return false;
    if (value < min || value > max) return false;
    return true;
}

module.exports = validateInput;