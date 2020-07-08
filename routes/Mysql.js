const mysql = require("mysql2");
const fs = require("fs");
const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    database: "donate",
    password: "lkzliona230501"
});
connection.connect(function(err){
    if (err) {
        return console.error("Ошибка: " + err.message);
    }
    else{
        console.log("Подключение к серверу MySQL успешно установлено");
    }
});

let sss=[];
let ddd=[];
let streamer = fs.readFileSync("Книга1.csv", "utf8");

let arr=  streamer.split(/\r?\n/).filter(function(x){return x}).map(function(x){return x.split(";")});
arr.forEach(function (element){
    sss.push(element[1]);
});
console.log(sss);
let donater = fs.readFileSync("Книга2.txt", "utf8");
let help = donater.split(/\r?\n/).filter(function(x){return x}).map(function(x){return x.split(" ")});
help.forEach(function (element) {
    ddd.push(element[0]);
}