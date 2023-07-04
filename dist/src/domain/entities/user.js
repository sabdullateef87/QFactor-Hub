"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class User {
    constructor(email, password, role, permissions, isActive, isVerified) {
        this.email = email;
        this.password = password;
        this.role = role;
        this.permissions = permissions;
        this.isActive = isActive;
        this.isVerified = isVerified;
    }
    getEmail() {
        return this.email;
    }
    getPassword() {
        return this.password;
    }
}
exports.default = User;
