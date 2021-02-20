const bot = require('../small_systems/connect_bot');

const return_function = bot.on('message', (msg) => {

    dbHandle.query
    (
        `SELECT * FROM accounts WHERE telegramid = ?`, 
        [msg.from.id], 
        (err, result, field) => 
        {
            if(result.length == 0){
                dbHandle.query
                (
                    `INSERT INTO accounts(telegramid, first_name, last_name) VALUES (?, ?, ?)`, 
                    [msg.from.id, msg.from.first_name || "", msg.from.last_name || ""], 
                    (err, result, field) => 
                    {
                        if(!err)
                            console.log("Я добавил чела в базу");
                        else
                            console.log("При добавлении чела в базу произошла проблемма.");
                            console.log(err);
                });
            }
    });
});

// module.exports = return_function;