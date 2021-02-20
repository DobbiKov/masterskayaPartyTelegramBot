const bot = require('./small_systems/connect_bot');
const dbHandle = require('./database/connection');

require('./small_systems/commands');

require('./small_systems/saveusers');

bot.on('polling_error', console.log);