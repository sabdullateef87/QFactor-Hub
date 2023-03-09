var cron = require('node-cron');



export const sayHelloCron = () => {
    cron.schedule('* * * * *', () => {
        console.log('running a task every minute');
    });
}