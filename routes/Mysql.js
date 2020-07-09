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

let donater = fs.readFileSync("Книга2.txt", "utf8");
let help = donater.split(/\r?\n/).filter(function(x){return x}).map(function(x){return x.split(" ")});
help.forEach(function (element) {
    ddd.push(element[0]);
});

let a = [];
let n=0;
while ( n <5) {
    for (let j = 0; j < 25; j++) {
        for (let k = 0; k < 50; k++) {
            a.push(ddd[k], Math.floor(Math.random() * 1000), 'RUB', sss[j]);
            const sql = `INSERT donates(donater, amount, currency, streamer) VALUES ?`;
            connection.query(sql, [a],function (err, results) {
                if (err) console.log(err);
                console.log(results);
                    a=[];
            });
        }
    }


for (let j = 25; j < 50; j++) {
    for (let k = 50; k < 100; k++) {
        a.push(ddd[k], Math.floor(Math.random() * 1000), 'RUB', sss[j]);
        const sql = `INSERT donates(donater, amount, currency, streamer) VALUES ?`;
        connection.query(sql, [a],function (err, results) {
            if (err) console.log(err);
            console.log(results);
            a=[];
        });
    }
}


for (let j = 50; j < 75; j++) {
    for (let k = 100; k < 150; k++) {
        a.push(ddd[k], Math.floor(Math.random() * 1000), 'RUB', sss[j]);
        const sql = `INSERT donates(donater, amount, currency, streamer) VALUES ?`;
        connection.query(sql, [a],function (err, results) {
            if (err) console.log(err);
            console.log(results);
            a=[];
        });
    }
}


for (let j = 75; j < 100; j++) {
    for (let k = 150; k < 200; k++) {
        a.push(ddd[k], Math.floor(Math.random() * 1000), 'RUB', sss[j]);
        const sql = `INSERT donates(donater, amount, currency, streamer) VALUES ?`;
        connection.query(sql, [a],function (err, results) {
            if (err) console.log(err);
            console.log(results);
            a=[];
        });
    }
}n++;
}














let subarray = []; //массив в который будет выведен результат.
for (let i = 0; i <Math.ceil(a.length/4); i++){
    subarray[i] = a.slice((i*4), (i*4) + 4);
}
//console.log(subarray);


//const sql = `INSERT donates(donater, amount, currency, streamer) VALUES ?`;



connection.end();