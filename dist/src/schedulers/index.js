"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sayHelloCron = void 0;
var cron = require('node-cron');
const sayHelloCron = () => {
    cron.schedule('* * * * *', () => {
        console.log('running a task every minute');
    });
};
exports.sayHelloCron = sayHelloCron;
