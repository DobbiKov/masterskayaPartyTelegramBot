const bot = require('../small_systems/connect_bot');
const dbHandle = require('../database/connection');
const config = require('config');
const money = config.get('money');
const card = config.get('card');

const return_command = bot.onText(/\/register/, (msg, match) => {
    var fromId = msg.from.id;

    var options = {
        reply_markup: JSON.stringify({
            inline_keyboard: [
                [{ text: "Наличными", callback_data: 'register_1' }],
                [{ text: "Картой", callback_data: 'register_2' }]
            ]
        })
    };

    bot.sendMessage(fromId, "Выберете способ оплаты:", options);
});

const return_callback = bot.on('callback_query', (msg) => {
    var answer = msg.data.split('_');

    var index = answer[0];
    var button = answer[1];

    if(index == "register"){
        var chat = msg.hasOwnProperty('chat') ? msg.chat.id : msg.from.id;

        if(button == "1"){
            bot.sendMessage(chat, `Отдайте ${money} гривен Егору и вы пройдете регистрацию.`);

            dbHandle.query
            (
                `SELECT * FROM accounts WHERE telegramid = ?`, 
                [chat], 
                (err, result, field) => 
                {
                    dbHandle.query
                    (
                        `INSERT INTO registers(partyid, type, name) VALUES (?,?,?)`, 
                        [result[0].id, "наличка", `${msg.from.first_name} ${msg.from.last_name}`], (err, result, field) => 
                        {
                            console.log("Добавил в реги.");
                        }
                    );
                }
            );
        }else{
            var options = {
                reply_markup: JSON.stringify({
                    inline_keyboard: [
                        [{ text: "Отправил", callback_data: 'registercard_1' }]
                    ]
                })
            };
            bot.sendMessage(chat, `Скиньте ${money} гривен на карту: ${card}. Как только отправите, нажмите кнопку: отправил.`, options);
        }
    }


    if(index == "registercard"){
        var chat = msg.hasOwnProperty('chat') ? msg.chat.id : msg.from.id;
        bot.sendMessage(chat, "Отлично! Ожидайте, пока мы проверим ваш платеж. Об успешности мы вам сообщим в ближайшее время.");

        dbHandle.query
        (
            `SELECT * FROM accounts WHERE telegramid = ?`,
            [chat], 
            (err, result, field) => 
            {
                dbHandle.query
                (
                    `INSERT INTO registers(partyid, type, name) VALUES (?,?,?)`, 
                    [result[0].id, "картой", `${msg.from.first_name} ${msg.from.last_name}`], 
                    (err, result, field) => 
                    {
                        if(err)
                            console.log("Добавил в реги.");
                        else
                            console.log("При добавлении регов произошла ошибка.");
                            console.log(err);
                    }
                );
            }
        );
    }
});

module.exports = { return_command, return_callback };