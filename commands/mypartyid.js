const bot = require('../connect_bot');
const dbHandle = require('../database/connection');

const return_command = bot.onText(/\/mypartyid/, (msg, match) => {
    const query = `SELECT * FROM accounts WHERE telegramid = ?`;
    const queryParams = [msg.from.id];

    dbHandle.query(query, queryParams, (err, result, field) => {
        if(result.length == 0){
            
        }else{
            console.log(result);
            bot.sendMessage(msg.from.id, `Ваш party id: ${result[0].id}.`);
        }
    });
});

module.exports = return_command;