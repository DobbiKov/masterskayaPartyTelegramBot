const bot = require('./connect_bot');
const dbHandle = require('./database/connection');

const register_command = require('./commands/register').return_command;
const register_callback = require('./commands/register').return_callback;


bot.on('message', (msg) => {
    const query = `SELECT * FROM accounts WHERE telegramid = ?`;
    const queryParams = [msg.from.id];

    dbHandle.query(query, queryParams, (err, result, field) => {
        if(result.length == 0){
            const _query = `INSERT INTO accounts(telegramid) VALUES (?)`
            const _queryParams = [msg.from.id];

            dbHandle.query(_query, _queryParams, (err, result, field) => {
                if(!err)
                    console.log("Я добавил чела в базу");
                else
                    console.log("При добавлении чела в базу произошла проблемма.");
            });
        }
    });
});