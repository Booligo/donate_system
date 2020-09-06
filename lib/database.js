
const mysql = require("mysql2");
const config = require("../config").configuration;
const connection = mysql.createConnection(config.db_config);
connection.connect(function(err){
    if (err) {
        return console.error("Ошибка: " + err.message);
    }
    else{
        console.log("Подключение к серверу MySQL у  спешно установлено");
    }
});
module.exports = connection;

