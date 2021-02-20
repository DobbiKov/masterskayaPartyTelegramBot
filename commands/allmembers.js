const bot = require('../connect_bot');
const dbHandle = require('../database/connection');

const return_command = bot.onText(/\/allmembers/, (msg, match) => {
    const query = `SELECT * FROM members`;
    const queryParams = []
    dbHandle.query(query, queryParams, (err, result, field) => {
        if(result.length == 0)
            bot.sendMessage(msg.from.id, "Нет участников тусовки.");
        else{
            bot.sendMessage(msg.from.id, "Список участников тусовки:");
            result.forEach(element => {
                bot.sendMessage(msg.from.id, `Id: ${element.id}. Тип: ${element.type}. Имя: ${element.name}`);
            });
        }
    });
});

module.exports = return_command;