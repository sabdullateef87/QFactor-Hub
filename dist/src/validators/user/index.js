"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isCreateUserDtoValidated = void 0;
const isCreateUserDtoValidated = (user) => {
    const { email, password } = user;
    const validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (!email.match(validRegex)) {
        return false;
    }
    if (password.length < 8) {
        return false;
    }
    return true;
};
exports.isCreateUserDtoValidated = isCreateUserDtoValidated;
