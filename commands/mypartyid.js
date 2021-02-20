const bot = require('../small_systems/connect_bot');
const dbHandle = require('../database/connection');

const return_command = bot.onText(/\/mypartyid/, (msg, match) => {
    dbHandle.query
    (
        `SELECT * FROM accounts WHERE telegramid = ?`,
        [msg.from.id], 
        (err, result, field) => 
        {
            if(result.length == 0){
                
            }else{
                console.log(result);
                bot.sendMessage(msg.from.id, `Ваш party id: ${result[0].id}.`);
            }
        }
    );
});

module.exports = return_command;