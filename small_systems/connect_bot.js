const TelegramBot = require('node-telegram-bot-api');
const config = require('config');

const TOKEN = config.get('BOT_TOKEN');
const bot = new TelegramBot(TOKEN, {
    polling: true
});

module.exports = bot;