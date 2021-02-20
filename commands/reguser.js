const bot = require('../connect_bot');
const dbHandle = require('../database/connection');

const return_command = bot.onText(/\/reguser (.+)/, (msg, match) => {
    var del_id = match[1];
    var chat = msg.from.id;

    const query = `SELECT * FROM registers WHERE id = ?`;
    const queryParams = [del_id]
    dbHandle.query(query, queryParams, (err, result, field) => {
        if(result.length == 0)
            bot.sendMessage(chat, "Заявки с таким ID нет.");
        else{
            const _query = `INSERT INTO members(partyid, type, name) VALUES (?,?,?)`;
            const _queryParams = [del_id, result[0].type, result[0].name];
            dbHandle.query(_query, _queryParams, (err, result, field) => {
                if(err){
                    console.log(err);
                    bot.sendMessage(msg.from.id, "Произошла ошибка.")
                }else{
                    const __query = `DELETE FROM registers WHERE id = ?`;
                    const __queryParams = [del_id]
                    dbHandle.query(__query, __queryParams, (err, result, field) => {
                        if(err){
                            console.log(err);
                            bot.sendMessage(msg.from.id, "Произошла ошибка.")
                        }else{
                            bot.sendMessage(msg.from.id, "Вы зарегестрировали человека на тусовку.");
                        }
                    });
                }
            });
        }
    });
});

module.exports = return_command;