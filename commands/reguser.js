const bot = require('../small_systems/connect_bot');
const dbHandle = require('../database/connection');

const return_command = bot.onText(/\/reguser (.+)/, (msg, match) => {
    var del_id = match[1];
    var chat = msg.from.id;

    dbHandle.query
    (
        `SELECT * FROM registers WHERE id = ?`, 
        [del_id], 
        (err, result, field) => 
        {
            if(result.length == 0)
                bot.sendMessage(chat, "Заявки с таким ID нет.");
            else
            {
                dbHandle.query
                (
                    `INSERT INTO members(partyid, type, name) VALUES (?,?,?)`, 
                    [del_id, result[0].type, result[0].name], 
                    (err, result, field) => 
                    {
                        if(err){
                            console.log(err);
                            bot.sendMessage(msg.from.id, "Произошла ошибка.")
                        }else{
                            dbHandle.query
                            (
                                `DELETE FROM registers WHERE id = ?`, 
                                [del_id], 
                                (err, result, field) => 
                                {
                                    if(err){
                                        console.log(err);
                                        bot.sendMessage(msg.from.id, "Произошла ошибка.")
                                    }else{
                                        bot.sendMessage(msg.from.id, "Вы зарегестрировали человека на тусовку.");
                                    }
                                }
                            );
                        }
                    }
                );
            }
        }
    );
});

module.exports = return_command;