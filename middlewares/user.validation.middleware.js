const { user } = require('../models/user');

// Validate names
const isValidName = (username) => {
    const regex = /^[a-zA-Z\-]+$/;
    return !!username && regex.test(username);
}

const isValidEmail = (email) => {
    const regex = /^[a-z0-9._]+\@gmail\.com$/;
    return !!email && regex.test(email.toLowerCase());
}

const isValidPhone = (phone) => {
    const regex = /^(\+380)\d{9}$/;
    return !!phone && regex.test(phone);
}

const isValidPwd = (pwd) => {
    const regex = /^[0-9a-zA-Z!@#$%^&*]{3,}$/;
    return !!pwd && regex.test(pwd);
}

// Compare two lists
const compareLists = (a, b) => a.filter(v => !b.includes(v));

// Validatior for user entity during creation
const createUserValid = (req, res, next) => {
    if (req.method !== 'POST') {
        return next();
    }

    const {
        firstName,
        lastName,
        email,
        phoneNumber,
        password,
    } = req.body;

    const requestFields = Object.keys(req.body);
    const modelFields = Object.keys(user);

    const fieldDifference = compareLists(requestFields, modelFields);

    const validations = [
        !fieldDifference.length,
        !requestFields.includes('id'),
        isValidName(firstName),
        isValidName(lastName),
        isValidEmail(email),
        isValidPhone(phoneNumber),
        isValidPwd(password),
    ];
    
    if (validations.some(item => item === false)) {
        const err = new Error('User entity to create isn\'t valid');
        err.type = 'validation';
        res.err = err;
    }

    console.log('createUserValid')
    next();
}

const updateUserValid = (req, res, next) => {
    if (req.method !== 'PUT') {
        return next();
    }
    // TODO: Implement validatior for user entity during update

    next();
}

exports.createUserValid = createUserValid;
exports.updateUserValid = updateUserValid;