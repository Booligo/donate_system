
const mysql = require("mysql2");
const {config} = require("../config");
const connection = mysql.createConnection(config.db_config);
connection.connect(function(err){
    if (err) {
        return console.error("Ошибка: " + err.message);
    }
    else{
        console.log("Подключение к серверу MySQL спешно установлено");
    }
});
module.exports = connection;

