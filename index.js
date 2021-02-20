const bot = require('./connect_bot');
const dbHandle = require('./database/connection');

const register_command = require('./commands/register').return_command;
const register_callback = require('./commands/register').return_callback;

const mypartyid_command = require('./commands/mypartyid');

const allregs_command = require('./commands/allregs');

const reguser_command = require('./commands/reguser');

const allmembers_command = require('./commands/allmembers');


bot.on('message', (msg) => {
    const query = `SELECT * FROM accounts WHERE telegramid = ?`;
    const queryParams = [msg.from.id];

    dbHandle.query(query, queryParams, (err, result, field) => {
        if(result.length == 0){
            const _query = `INSERT INTO accounts(telegramid, first_name, last_name) VALUES (?, ?, ?)`
            const _queryParams = [msg.from.id, msg.from.first_name || "", msg.from.last_name || ""];

            dbHandle.query(_query, _queryParams, (err, result, field) => {
                if(!err)
                    console.log("Я добавил чела в базу");
                else
                    console.log("При добавлении чела в базу произошла проблемма.");
                    console.log(err);
            });
        }
    });
});
bot.on('polling_error', console.log);