const Bot = require('./src/Client');

const bot = new Bot();
bot.login();



process.on('uncaughtException', err => console.error(err.stack));
process.on('unhandledRejection', err => console.error(err.stack));