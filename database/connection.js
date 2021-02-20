const mysql = require('mysql');
const config = require('config');
const dbConf = config.get('dbConnection');

const DBCONFIG = {
    host: dbConf.host,
    user: dbConf.user,
    database: dbConf.database,
    password: dbConf.password
};

const dbHandle = mysql.createConnection(DBCONFIG);

dbHandle.connect(err => {
    if(err)
        console.log(err);
    else
        console.log('Database has been connected.');
});

module.exports = dbHandle;