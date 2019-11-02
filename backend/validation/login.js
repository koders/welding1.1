module.exports = function validateLoginInput(data) {
    const errors = {};

    if (!data.username) {
        errors.username = "Username is required";
    }

    if (!data.password) {
        errors.password = "Password is required";
    }

    return {
        errors,
        isValid: Object.keys(errors).length === 0,
    };
};
